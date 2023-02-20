import config from "../tamagui.config";
import { TamaguiProvider, TamaguiProviderProps } from "@my/ui";
import { TRPCProvider } from "./trpc";
export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, "config">) {
  return (
    <TamaguiProvider config={config} disableInjectCSS defaultTheme="light" {...rest}>
      <TRPCProvider>{children}</TRPCProvider>
    </TamaguiProvider>
  );
}
