// src/lib/supabaseClient.ts
// Supabase Client with graceful fallback for local mock operations

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

// Safely export supabase client only if environmental parameters are configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  console.warn(
    "⚠️ AL HANA AL ZAHABYAH: Supabase credentials are not found in environment variables. Running in local mock mode."
  );
}
