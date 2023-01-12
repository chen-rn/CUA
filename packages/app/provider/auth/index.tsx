import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./cache";

//const clerk_frontend_api = "clerk.blabla.lcl.dev"; //ENTER YOUR ENV HERE

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider frontendApi={clerk_frontend_api} tokenCache={tokenCache}>
      {children}
    </ClerkProvider>
  );
}
