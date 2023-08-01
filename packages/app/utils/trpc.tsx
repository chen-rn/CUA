/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
import Constants from "expo-constants";
import * as React from "react";

import { transformer } from "@my/api/transformer";
/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

import { supabase } from "./supabase";

import type { AppRouter } from "@my/api";
/**
 * A set of typesafe hooks for consuming your API.
 */
export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   */

  /**
   * If you're running in production, you'll need to set the productionApiUrl as an
   * extra field in your expo app.config.ts or app.json. This is because localhost
   * will not be available in production.
   */

  // if (!__DEV__) {
  //   const productionApiUrl = Constants.manifest?.extra?.productionApiUrl as string;
  //   if (!productionApiUrl) throw new Error("failed to get productionApiUrl, missing in extra section of app.config.ts");
  //   return productionApiUrl;
  // }

  // const localhost = Constants.manifest?.debuggerHost?.split(":")[0];
  // if (!localhost) throw new Error("failed to get localhost, configure it manually");
  // return `http://${localhost}:3000`;

  return "http://192.168.0.190:3000";
};

export const TRPCProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const getSupabaseToken = async () => {
    const { data, error } = await supabase.auth.getSession();
    return data?.session?.access_token;
  };
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      transformer,
      links: [
        httpBatchLink({
          async headers() {
            const authToken = await getSupabaseToken();
            return {
              Authorization: authToken,
            };
          },
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
