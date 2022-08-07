import type { AppProps } from "next/app";
import React from "react";
import "normalize.css";
import { Provider } from "react-redux";
import Head from "next/head";

import "styles/main.scss";
import store from "redux/index";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Snake</title>
      </Head>
      <React.StrictMode>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </React.StrictMode>
    </>
  );
}
