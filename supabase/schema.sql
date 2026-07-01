-- supabase/schema.sql
-- AL HANA AL ZAHABYAH - Database Schema
-- Created for المهندس وائل مدبولي
-- Prepared by Sadek Elgazar

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. profiles table (User roles and profiles)
create table if not exists public.profiles (
  id uuid primary key,
  full_name text not null,
  phone text,
  email text unique not null,
  role text not null check (role in ('customer', 'admin', 'designer', 'supervisor', 'accountant')),
  avatar_url text,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2. services table
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  name_ar text not null,
  name_en text not null,
  slug text unique not null,
  description_ar text not null,
  description_en text not null,
  icon text not null,
  image_url text,
  is_active boolean default true not null,
  sort_order int default 0 not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 3. service_packages table
create table if not exists public.service_packages (
  id uuid primary key default uuid_generate_v4(),
  service_id uuid references public.services(id) on delete cascade not null,
  package_name_ar text not null,
  package_name_en text not null,
  description_ar text,
  description_en text,
  starting_price numeric not null,
  estimated_days int,
  features jsonb not null default '[]'::jsonb,
  is_active boolean default true not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 4. quote_requests table
create table if not exists public.quote_requests (
  id uuid primary key default uuid_generate_v4(),
  request_number text unique not null,
  customer_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  phone text not null,
  whatsapp text,
  email text not null,
  emirate text not null,
  area text not null,
  property_type text not null,
  service_type text not null,
  project_size text not null,
  budget_range text not null,
  preferred_contact_method text not null,
  preferred_visit_date date,
  project_description text,
  status text not null default 'new' check (status in ('new', 'contacted', 'site_visit_scheduled', 'quote_sent', 'approved', 'declined')),
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 5. quote_request_files table
create table if not exists public.quote_request_files (
  id uuid primary key default uuid_generate_v4(),
  quote_request_id uuid references public.quote_requests(id) on delete cascade not null,
  file_url text not null,
  file_name text not null,
  file_type text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 6. appointments table
create table if not exists public.appointments (
  id uuid primary key default uuid_generate_v4(),
  quote_request_id uuid references public.quote_requests(id) on delete set null,
  project_id uuid, -- will reference projects if created
  customer_id uuid references public.profiles(id) on delete cascade,
  assigned_staff uuid references public.profiles(id) on delete set null,
  appointment_date date not null,
  appointment_time time not null,
  location text not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  notes text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 7. projects table
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  project_number text unique not null,
  quote_request_id uuid references public.quote_requests(id) on delete set null,
  customer_id uuid references public.profiles(id) on delete set null,
  title_ar text not null,
  title_en text not null,
  service_type text not null,
  emirate text not null,
  area text not null,
  project_status text not null default 'planning' check (project_status in ('planning', 'approved', 'active_design', 'materials_delivery', 'execution', 'finishing', 'final_review', 'completed')),
  start_date date,
  expected_end_date date,
  actual_end_date date,
  total_amount numeric not null default 0,
  paid_amount numeric not null default 0,
  remaining_amount numeric not null default 0,
  assigned_designer uuid references public.profiles(id) on delete set null,
  assigned_supervisor uuid references public.profiles(id) on delete set null,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 8. project_updates table
create table if not exists public.project_updates (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete cascade not null,
  status text not null,
  progress_percentage int not null check (progress_percentage >= 0 and progress_percentage <= 100),
  note_ar text not null,
  note_en text not null,
  image_url text,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 9. project_gallery table (Before/After & Portfolio)
create table if not exists public.project_gallery (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete set null,
  title_ar text not null,
  title_en text not null,
  service_type text not null,
  emirate text not null,
  property_type text,
  before_image_url text,
  after_image_url text,
  main_image_url text not null,
  description_ar text,
  description_en text,
  is_featured boolean default false not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 10. invoices table
create table if not exists public.invoices (
  id uuid primary key default uuid_generate_v4(),
  invoice_number text unique not null,
  project_id uuid references public.projects(id) on delete cascade not null,
  customer_id uuid references public.profiles(id) on delete set null,
  amount numeric not null,
  vat_amount numeric not null,
  total_amount numeric not null,
  status text not null default 'unpaid' check (status in ('unpaid', 'paid', 'partially_paid', 'overdue', 'cancelled')),
  pdf_url text,
  due_date date not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 11. payments table
create table if not exists public.payments (
  id uuid primary key default uuid_generate_v4(),
  invoice_id uuid references public.invoices(id) on delete cascade not null,
  project_id uuid references public.projects(id) on delete cascade not null,
  customer_id uuid references public.profiles(id) on delete set null,
  amount numeric not null,
  payment_method text not null check (payment_method in ('cash', 'bank_transfer', 'cheque', 'credit_card', 'online')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'completed', 'failed', 'refunded')),
  transaction_ref text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 12. testimonials table
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  customer_name text not null,
  rating int not null check (rating >= 1 and rating <= 5),
  comment_ar text not null,
  comment_en text not null,
  project_id uuid references public.projects(id) on delete set null,
  image_url text,
  is_active boolean default true not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 13. notifications table
create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title_ar text not null,
  title_en text not null,
  message_ar text not null,
  message_en text not null,
  type text not null default 'info',
  is_read boolean default false not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 14. contact_messages table
create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  phone text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 15. site_settings table
create table if not exists public.site_settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb not null,
  description text,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 16. blog_posts table
create table if not exists public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title_ar text not null,
  title_en text not null,
  slug text unique not null,
  excerpt_ar text not null,
  excerpt_en text not null,
  content_ar text not null,
  content_en text not null,
  cover_image_url text not null,
  is_published boolean default true not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 17. faq_items table
create table if not exists public.faq_items (
  id uuid primary key default uuid_generate_v4(),
  question_ar text not null,
  question_en text not null,
  answer_ar text not null,
  answer_en text not null,
  category text not null,
  sort_order int default 0 not null,
  is_active boolean default true not null
);

-- Row Level Security (RLS) configuration
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.service_packages enable row level security;
alter table public.quote_requests enable row level security;
alter table public.quote_request_files enable row level security;
alter table public.appointments enable row level security;
alter table public.projects enable row level security;
alter table public.project_updates enable row level security;
alter table public.project_gallery enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.testimonials enable row level security;
alter table public.notifications enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;
alter table public.blog_posts enable row level security;
alter table public.faq_items enable row level security;

-- Setup simple public read policies for general website content
create policy "Allow public read-only access to active services" on public.services
  for select using (is_active = true);

create policy "Allow public read-only access to active packages" on public.service_packages
  for select using (is_active = true);

create policy "Allow public read-only access to gallery" on public.project_gallery
  for select using (true);

create policy "Allow public read-only access to active testimonials" on public.testimonials
  for select using (is_active = true);

create policy "Allow public read-only access to active faq" on public.faq_items
  for select using (is_active = true);

create policy "Allow public read-only access to published blog posts" on public.blog_posts
  for select using (is_published = true);

-- Profiles policies
create policy "Allow users to view their own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Allow users to update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- Quote requests policies
create policy "Allow public to insert quote requests" on public.quote_requests
  for insert with check (true);

create policy "Allow customers to view their own quote requests" on public.quote_requests
  for select using (auth.uid() = customer_id);

-- Appointments policies
create policy "Allow customers to view their own appointments" on public.appointments
  for select using (auth.uid() = customer_id);

-- Projects policies
create policy "Allow customers to view their own projects" on public.projects
  for select using (auth.uid() = customer_id);

-- Project updates policies
create policy "Allow customers to view updates for their projects" on public.project_updates
  for select using (
    exists (
      select 1 from public.projects
      where projects.id = project_updates.project_id
      and projects.customer_id = auth.uid()
    )
  );

-- Invoices & Payments policies
create policy "Allow customers to view their own invoices" on public.invoices
  for select using (auth.uid() = customer_id);

create policy "Allow customers to view their own payments" on public.payments
  for select using (auth.uid() = customer_id);

-- Notifications policies
create policy "Allow users to view their own notifications" on public.notifications
  for select using (auth.uid() = user_id);

-- Contact messages policies
create policy "Allow public to submit contact messages" on public.contact_messages
  for insert with check (true);
