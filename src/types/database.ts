// src/types/database.ts
// TypeScript interfaces matching the database schema for Al Hana Al Zahabyah

export interface Profile {
  id: string;
  full_name: string;
  phone?: string;
  email: string;
  role: 'customer' | 'admin' | 'designer' | 'supervisor' | 'accountant';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  description_ar: string;
  description_en: string;
  icon: string;
  image_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface ServicePackage {
  id: string;
  service_id: string;
  package_name_ar: string;
  package_name_en: string;
  description_ar?: string;
  description_en?: string;
  starting_price: number;
  estimated_days?: number;
  features: string[]; // parsed from JSONB
  is_active: boolean;
  created_at: string;
}

export interface QuoteRequest {
  id: string;
  request_number: string;
  customer_id?: string;
  full_name: string;
  phone: string;
  whatsapp?: string;
  email: string;
  emirate: string;
  area: string;
  property_type: string;
  service_type: string;
  project_size: string;
  budget_range: string;
  preferred_contact_method: string;
  preferred_visit_date?: string;
  project_description?: string;
  status: 'new' | 'contacted' | 'site_visit_scheduled' | 'quote_sent' | 'approved' | 'declined';
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface QuoteRequestFile {
  id: string;
  quote_request_id: string;
  file_url: string;
  file_name: string;
  file_type?: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  quote_request_id?: string;
  project_id?: string;
  customer_id?: string;
  assigned_staff?: string;
  appointment_date: string;
  appointment_time: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  created_at: string;
}

export interface Project {
  id: string;
  project_number: string;
  quote_request_id?: string;
  customer_id?: string;
  title_ar: string;
  title_en: string;
  service_type: string;
  emirate: string;
  area: string;
  project_status: 'planning' | 'approved' | 'active_design' | 'materials_delivery' | 'execution' | 'finishing' | 'final_review' | 'completed';
  start_date?: string;
  expected_end_date?: string;
  actual_end_date?: string;
  total_amount: number;
  paid_amount: number;
  remaining_amount: number;
  assigned_designer?: string;
  assigned_supervisor?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectUpdate {
  id: string;
  project_id: string;
  status: string;
  progress_percentage: number;
  note_ar: string;
  note_en: string;
  image_url?: string;
  updated_by?: string;
  created_at: string;
}

export interface ProjectGallery {
  id: string;
  project_id?: string;
  title_ar: string;
  title_en: string;
  service_type: string;
  emirate: string;
  property_type?: string;
  before_image_url?: string;
  after_image_url?: string;
  main_image_url: string;
  description_ar?: string;
  description_en?: string;
  is_featured: boolean;
  created_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  project_id: string;
  customer_id?: string;
  amount: number;
  vat_amount: number;
  total_amount: number;
  status: 'unpaid' | 'paid' | 'partially_paid' | 'overdue' | 'cancelled';
  pdf_url?: string;
  due_date: string;
  created_at: string;
}

export interface Payment {
  id: string;
  invoice_id: string;
  project_id: string;
  customer_id?: string;
  amount: number;
  payment_method: 'cash' | 'bank_transfer' | 'cheque' | 'credit_card' | 'online';
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_ref?: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  rating: number;
  comment_ar: string;
  comment_en: string;
  project_id?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title_ar: string;
  title_en: string;
  message_ar: string;
  message_en: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}

export interface BlogPost {
  id: string;
  title_ar: string;
  title_en: string;
  slug: string;
  excerpt_ar: string;
  excerpt_en: string;
  content_ar: string;
  content_en: string;
  cover_image_url: string;
  is_published: boolean;
  created_at: string;
}

export interface FAQItem {
  id: string;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  category: string;
  sort_order: number;
  is_active: boolean;
}
