import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabaseUrl = SUPABASE_URL ?? (import.meta.env.MODE === "test" ? "http://localhost:54321" : undefined);
const supabaseKey = SUPABASE_PUBLISHABLE_KEY ?? (import.meta.env.MODE === "test" ? "public-anon-key" : undefined);

if (!supabaseUrl) {
  throw new Error("VITE_SUPABASE_URL is missing. Please configure it in your environment.");
}

if (!supabaseKey) {
  throw new Error(
    "VITE_SUPABASE_PUBLISHABLE_KEY is missing. Ensure the public anon key is set before running the app.",
  );
}

// Initialize the Supabase client.
// After any database schema changes, remember to regenerate types by running:
// npx supabase gen types typescript --schema public > src/integrations/supabase/types.ts
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});