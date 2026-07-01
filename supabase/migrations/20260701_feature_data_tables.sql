create extension if not exists pgcrypto;

create table if not exists public.ai_moodboards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  keywords text not null,
  room_type text not null,
  style_title text not null,
  palette jsonb not null default '[]'::jsonb,
  materials jsonb not null default '[]'::jsonb,
  furniture_notes text,
  lighting_notes text,
  image_prompts jsonb not null default '[]'::jsonb,
  image_urls jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.customer_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  project_title text not null,
  project_type text,
  location text,
  current_stage text,
  progress_percent integer default 0 check (progress_percent between 0 and 100),
  status text default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.customer_projects(id) on delete cascade,
  stage_key text not null,
  stage_label text not null,
  status text not null check (status in ('pending','active','completed','delayed')),
  note text,
  planned_date date,
  completed_date date,
  sort_order integer default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.quote_estimates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text,
  phone text,
  area_sqft numeric not null check (area_sqft > 0),
  service_type text not null,
  project_type text not null,
  finish_level text not null,
  estimated_min numeric not null,
  estimated_max numeric not null,
  currency text default 'AED',
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_ai_moodboards_user_created on public.ai_moodboards(user_id, created_at desc);
create index if not exists idx_customer_projects_user on public.customer_projects(user_id);
create index if not exists idx_customer_projects_phone on public.customer_projects(customer_phone);
create index if not exists idx_project_milestones_project_sort on public.project_milestones(project_id, sort_order);
create index if not exists idx_quote_estimates_user_created on public.quote_estimates(user_id, created_at desc);

alter table public.ai_moodboards enable row level security;
alter table public.customer_projects enable row level security;
alter table public.project_milestones enable row level security;
alter table public.quote_estimates enable row level security;

create policy "ai_moodboards own read" on public.ai_moodboards for select to authenticated using (user_id = auth.uid());
create policy "ai_moodboards own insert" on public.ai_moodboards for insert to authenticated with check (user_id = auth.uid() or user_id is null);
create policy "ai_moodboards public insert" on public.ai_moodboards for insert to anon with check (user_id is null);

create policy "customer_projects own read" on public.customer_projects for select to authenticated using (user_id = auth.uid());
create policy "customer_projects anon safe lookup" on public.customer_projects for select to anon using (false);

create policy "project_milestones own read" on public.project_milestones for select to authenticated using (
  exists (select 1 from public.customer_projects p where p.id = project_id and p.user_id = auth.uid())
);

create policy "quote_estimates public insert" on public.quote_estimates for insert to anon with check (user_id is null);
create policy "quote_estimates own read" on public.quote_estimates for select to authenticated using (user_id = auth.uid());
create policy "quote_estimates own insert" on public.quote_estimates for insert to authenticated with check (user_id = auth.uid() or user_id is null);
