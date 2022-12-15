import type { AppProps } from "next/app";
import { globalStyles, GlobalStyles } from "styles/global";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
