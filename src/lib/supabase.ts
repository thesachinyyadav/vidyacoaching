import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          role: 'admin' | 'viewer';
          email: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          role?: 'admin' | 'viewer';
          email?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          role?: 'admin' | 'viewer';
          email?: string | null;
          created_at?: string;
        };
      };
      fees: {
        Row: {
          id: string;
          grade: string;
          board: string;
          monthly_fee: number;
          admission_fee: number;
          security_deposit: number;
          exam_fee: number | null;
          lab_fee: number | null;
          library_fee: number | null;
          sports_fee: number | null;
          misc_fee: number | null;
          total_fee: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          grade: string;
          board: string;
          monthly_fee: number;
          admission_fee?: number;
          security_deposit?: number;
          exam_fee?: number | null;
          lab_fee?: number | null;
          library_fee?: number | null;
          sports_fee?: number | null;
          misc_fee?: number | null;
          total_fee: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          grade?: string;
          board?: string;
          monthly_fee?: number;
          admission_fee?: number;
          security_deposit?: number;
          exam_fee?: number | null;
          lab_fee?: number | null;
          library_fee?: number | null;
          sports_fee?: number | null;
          misc_fee?: number | null;
          total_fee?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
