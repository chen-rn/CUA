import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from './cache'

const clerk_frontend_api = 'clerk.blablablabla.lcl.dev'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider frontendApi={clerk_frontend_api} tokenCache={tokenCache}>
      {children}
    </ClerkProvider>
  )
}
