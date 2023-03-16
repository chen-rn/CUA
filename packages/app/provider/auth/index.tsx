import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./cache";

const frontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (typeof frontendApi === "undefined")
    throw new Error(
      "Clerk API key not found. Please add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file."
    );

  return (
    <ClerkProvider frontendApi={frontendApi} tokenCache={tokenCache}>
      {children}
    </ClerkProvider>
  );
}
