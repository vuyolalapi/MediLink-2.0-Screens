import { createClient } from "@supabase/supabase-js";

// Supabase project URL
const supabaseUrl = "https://henazysngwmeclvmdvhg.supabase.co";

// Public anon/publishable key (frontend safe)
const supabaseAnonKey = "sb_publishable_y-9OrxLAqhlPsp3v3ogm2A_PqZN6vwS";

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);