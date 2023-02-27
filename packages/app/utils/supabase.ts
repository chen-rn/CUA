import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "./polyfill"; //note, this is a fix for supabase

/* WARNING: your supabase public creds! */
//export const supabaseUrl = "https://blablabla your supabase.supabase.co";
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
//export const supabaseAnonKey = "YOUR SUPABSE ANON KEY";
export const supabaseAnonKey = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
