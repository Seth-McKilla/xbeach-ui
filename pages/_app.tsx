import { useState } from "react";

import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "../styles/globals.css";
import type { NextPage } from "next";
import type { AppProps as NextAppProps } from "next/app";

type AppProps<P = any> = NextAppProps & {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

const App: NextPage = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <PlausibleProvider domain="xbeach-ui.vercel.app">
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PlausibleProvider>
  );
};

export default App;
