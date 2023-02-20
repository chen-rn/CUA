/* import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./cache";

//this should be the same as your next js frontend key
const CLERK_PUBLISHABLE_KEY = "pk_test_ablablablablabla"; //enter your clerk key here!

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      frontendApi={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      {children}
    </ClerkProvider>
  );
}
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://glhgxeyapcicvdvlajkq.supabase.co";
const supabaseAnonKey = "https://glhgxeyapcicvdvlajkq.supabase.co";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
