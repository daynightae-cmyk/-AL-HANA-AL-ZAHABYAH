import React from 'react';
import { CheckCircle2, Clock3, AlertTriangle, CircleDot } from 'lucide-react';
import { CustomerProject, ProjectMilestone, defaultMilestones } from '../services/projectService';

const statusIcon = (status: ProjectMilestone['status']) => {
  if (status === 'completed') return <CheckCircle2 className="h-5 w-5" />;
  if (status === 'active') return <CircleDot className="h-5 w-5" />;
  if (status === 'delayed') return <AlertTriangle className="h-5 w-5" />;
  return <Clock3 className="h-5 w-5" />;
};

const statusClass = (status: ProjectMilestone['status']) => {
  if (status === 'completed') return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
  if (status === 'active') return 'border-luxury-gold bg-luxury-gold/15 text-luxury-gold shadow-[0_0_22px_rgba(212,175,55,0.16)]';
  if (status === 'delayed') return 'border-red-500/40 bg-red-500/10 text-red-300';
  return 'border-white/10 bg-neutral-950 text-neutral-500';
};

export const ProjectTimeline: React.FC<{ project?: CustomerProject | null; language?: string }> = ({ project, language = 'en' }) => {
  const isAr = language === 'ar';
  const milestones = project?.milestones || defaultMilestones;
  const completed = milestones.filter(m => m.status === 'completed').length;
  const progress = project?.progress_percent ?? Math.round((completed / milestones.length) * 100);

  return (
    <section className="rounded-3xl border border-luxury-gold/20 bg-neutral-950/95 p-5 sm:p-7 shadow-2xl" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-luxury-gold">{isAr ? 'تتبع بصري للمشروع' : 'Visual Project Lifecycle'}</p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-white">{project?.project_title || (isAr ? 'لم يتم اختيار مشروع بعد' : 'No project selected')}</h2>
          {project && <p className="mt-1 text-sm text-neutral-400">{project.project_type} • {project.location}</p>}
        </div>
        <div className="min-w-[160px] rounded-2xl border border-white/10 bg-black p-4 text-center">
          <span className="text-xs text-neutral-400">{isAr ? 'نسبة الإنجاز' : 'Progress'}</span>
          <b className="block text-3xl text-luxury-gold">{progress}%</b>
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-black"><div className="h-full bg-luxury-gold transition-all" style={{ width: `${progress}%` }} /></div>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {milestones.map((m) => (
          <article key={m.stage_key} className={`rounded-2xl border p-5 ${statusClass(m.status)}`}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-sm font-black">{statusIcon(m.status)} {m.stage_label}</span>
              <span className="rounded-full border border-current/20 px-2 py-1 text-[10px] uppercase">{m.status}</span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-300">{m.note || (isAr ? 'لا توجد ملاحظة حالية.' : 'No note available.')}</p>
            {(m.planned_date || m.completed_date) && <p className="mt-3 text-xs text-neutral-500">{m.completed_date || m.planned_date}</p>}
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProjectTimeline;
