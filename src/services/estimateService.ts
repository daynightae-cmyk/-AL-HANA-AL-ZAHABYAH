import { supabase, isSupabaseConfigured } from '../lib/supabase';

export type EstimateInput = {
  customer_name?: string;
  phone?: string;
  area_sqft: number;
  service_type: string;
  project_type: string;
  finish_level: string;
  notes?: string;
};

export type EstimateResult = EstimateInput & {
  estimated_min: number;
  estimated_max: number;
  currency: 'AED';
};

const serviceRates: Record<string, number> = {
  'Interior Design': 32,
  Decoration: 55,
  Painting: 12,
  Renovation: 95,
  'Full Villa Design': 125,
  'Majlis Design': 85,
  'Fit-out / Execution': 140,
};

const finishMultiplier: Record<string, number> = {
  Standard: 1,
  Premium: 1.35,
  Luxury: 1.75,
  Royal: 2.35,
};

export const calculateEstimate = (input: EstimateInput): EstimateResult => {
  const area = Number(input.area_sqft);
  if (!Number.isFinite(area) || area <= 0) throw new Error('Invalid area');
  const rate = serviceRates[input.service_type] || 55;
  const multiplier = finishMultiplier[input.finish_level] || 1.25;
  const base = area * rate * multiplier;
  return {
    ...input,
    area_sqft: area,
    estimated_min: Math.round(base * 0.82),
    estimated_max: Math.round(base * 1.22),
    currency: 'AED',
  };
};

export const saveQuoteEstimate = async (estimate: EstimateResult) => {
  if (!isSupabaseConfigured || !supabase) return { data: null, error: null };
  return supabase.from('quote_estimates').insert(estimate).select().single();
};
