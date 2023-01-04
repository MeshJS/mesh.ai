import "../styles/globals.css";
import "../styles/highlight/stackoverflow-dark.css";

import { useState } from "react";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { MeshProvider } from "@meshsdk/react";
import LayoutSearch from "@components/layout/search";
import { UserProvider } from "@contexts/user";

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <UserProvider>
        <MeshProvider>
          <LayoutSearch>
            <Component {...pageProps} />
          </LayoutSearch>
        </MeshProvider>
      </UserProvider>
    </SessionContextProvider>
  );
}
