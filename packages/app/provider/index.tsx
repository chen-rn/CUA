import config from '../tamagui.config'
import { TamaguiProvider, TamaguiProviderProps } from '@my/ui'
import { AuthProvider } from './auth'
import { TRPCProvider } from './trpc' //mobile only

export function Provider({ children, pageProps, ...rest }: Omit<TamaguiProviderProps, 'config'> & { pageProps?: any }) {
  return (
    <AuthProvider pageProps={pageProps}>
      <TamaguiProvider config={config} disableInjectCSS defaultTheme="light" {...rest}>
          <TRPCProvider>{children}</TRPCProvider>
      </TamaguiProvider>
    </AuthProvider>
  )
}
