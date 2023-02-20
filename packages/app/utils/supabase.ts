import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "./polyfill"; //note, this is a fix for supabase

/* WARNING: your supabase public creds! */
export const supabaseUrl = "https://glhgxeyapcicvdvlajkq.supabase.co";
export const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsaGd4ZXlhcGNpY3ZkdmxhamtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU1NjE2ODgsImV4cCI6MTk5MTEzNzY4OH0.RTIt1Asc289PuazGRjqdPTISNy9kvxU4nDdFmWD1tDM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
