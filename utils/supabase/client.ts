import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

export const supabase = createClient(supabaseUrl, publicAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
});

export type User = {
  id: string;
  email: string;
  user_metadata: {
    name?: string;
    avatar_url?: string;
  };
};

export type UserSettings = {
  user_id: string;
  theme_index: number;
  created_at: string;
  updated_at: string;
};

export type Tool = {
  id: string;
  user_id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
  category: string | null;
  is_favorite: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type ActivityStats = {
  user_id: string;
  total_clicks: number;
  clicks_this_week: number;
  clicks_last_week: number;
  last_reset_date: string;
  updated_at: string;
};
