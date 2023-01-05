import config from '../tamagui.config'
import { NavigationProvider } from './navigation' //mobile only
import { TamaguiProvider, TamaguiProviderProps } from '@my/ui'
import { AuthProvider } from './auth'
import { TRPCProvider } from './trpc' //mobile only

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <AuthProvider>
      <TamaguiProvider config={config} disableInjectCSS defaultTheme="light" {...rest}>
        <NavigationProvider>
          <TRPCProvider>{children}</TRPCProvider>
        </NavigationProvider>
      </TamaguiProvider>
    </AuthProvider>
  )
}
