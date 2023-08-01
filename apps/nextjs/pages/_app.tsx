import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';
import 'raf/polyfill';

import { Provider } from 'app/provider';
import { trpc } from 'app/utils/trpc.web';
import Head from 'next/head';
import React, { useMemo } from 'react';

import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';

import type { SolitoAppProps } from "solito";
function MyApp({ Component, pageProps }: SolitoAppProps) {

  const contents = useMemo(() => {
    // @ts-ignore
    return <Component {...pageProps} />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageProps])

  return (
    <>
      <Head>
        <title>Universal Example</title>
        <meta name="description" content="Tamagui, Solito, Expo & Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
      {contents}
      </ThemeProvider>
    </>
  );
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme();

  return (
    <NextThemeProvider defaultTheme='light' onChangeTheme={setTheme}>
      <Provider disableRootThemeClass defaultTheme={theme}>
        {children}
      </Provider>
    </NextThemeProvider>
  );
}

export default trpc.withTRPC(MyApp);
