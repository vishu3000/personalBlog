import { SessionProvider } from "next-auth/react";
import "../../public/globals.css";
import React from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <React.StrictMode>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </React.StrictMode>
  );
}
