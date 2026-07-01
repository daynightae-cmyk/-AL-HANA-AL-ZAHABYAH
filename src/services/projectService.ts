import { supabase, isSupabaseConfigured } from '../lib/supabase';

export type MilestoneStatus = 'pending' | 'active' | 'completed' | 'delayed';

export type ProjectMilestone = {
  id?: string;
  stage_key: string;
  stage_label: string;
  status: MilestoneStatus;
  note?: string | null;
  planned_date?: string | null;
  completed_date?: string | null;
  sort_order: number;
};

export type CustomerProject = {
  id: string;
  customer_name: string;
  customer_phone: string;
  project_title: string;
  project_type: string;
  location: string;
  current_stage: string;
  progress_percent: number;
  status: string;
  created_at?: string;
  milestones?: ProjectMilestone[];
};

export const defaultMilestones: ProjectMilestone[] = [
  { stage_key: 'planning', stage_label: 'Planning', status: 'active', note: 'Project requirements and site information are being reviewed.', sort_order: 1 },
  { stage_key: 'design', stage_label: 'Design', status: 'pending', note: 'Design direction and material moodboard.', sort_order: 2 },
  { stage_key: 'approval', stage_label: 'Approval', status: 'pending', note: 'Client approval for scope and quotation.', sort_order: 3 },
  { stage_key: 'execution', stage_label: 'Execution', status: 'pending', note: 'Site works and implementation.', sort_order: 4 },
  { stage_key: 'finishing', stage_label: 'Finishing', status: 'pending', note: 'Final finishes, lighting, and detailing.', sort_order: 5 },
  { stage_key: 'handover', stage_label: 'Final Handover', status: 'pending', note: 'Inspection, cleaning, and final handover.', sort_order: 6 },
];

const withProgress = (project: CustomerProject): CustomerProject => {
  const milestones = project.milestones || defaultMilestones;
  const completed = milestones.filter(m => m.status === 'completed').length;
  const progress = Math.round((completed / milestones.length) * 100);
  return { ...project, milestones, progress_percent: project.progress_percent || progress };
};

export const lookupProject = async (query: string): Promise<CustomerProject | null> => {
  const term = query.trim();
  if (!term) return null;
  if (!isSupabaseConfigured || !supabase) return null;

  const { data: project, error } = await supabase
    .from('customer_projects')
    .select('*')
    .or(`id.eq.${term},customer_phone.eq.${term}`)
    .limit(1)
    .maybeSingle();

  if (error || !project) return null;
  const { data: milestones } = await supabase
    .from('project_milestones')
    .select('*')
    .eq('project_id', project.id)
    .order('sort_order', { ascending: true });

  return withProgress({ ...(project as CustomerProject), milestones: (milestones as ProjectMilestone[]) || defaultMilestones });
};
