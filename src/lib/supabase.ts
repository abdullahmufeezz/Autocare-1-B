import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
};

export type Vehicle = {
  id: string;
  user_id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  created_at: string;
};

export type Booking = {
  id: string;
  vehicle_id: string;
  user_id: string;
  service_type: string;
  description: string;
  booking_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  admin_notes: string;
  created_at: string;
  updated_at: string;
};
