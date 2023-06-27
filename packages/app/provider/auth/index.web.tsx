import { ClerkProvider } from "@clerk/nextjs";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  //@ts-ignore
  return <ClerkProvider>{children}</ClerkProvider>;
}
