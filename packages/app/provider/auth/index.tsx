import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./cache";

//const clerk_publishable_key = "clerk.blabla.lcl.dev"; //ENTER YOUR ENV HERE

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={clerk_publishable_key} tokenCache={tokenCache}>
      {children}
    </ClerkProvider>
  );
}
