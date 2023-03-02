import { ClerkProvider } from '@clerk/nextjs'

export function AuthProvider({ children, pageProps }: { children: React.ReactNode, pageProps?: any }) {
  return <ClerkProvider {...pageProps}>{children}</ClerkProvider>
}
