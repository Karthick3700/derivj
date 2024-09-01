import "flowbite/dist/flowbite.css";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/globals.css";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import { localStorage } from "@/utils";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Layout from "./layout/layout";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const theme = localStorage.getTheme();
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Home | derivJ</title>
        <meta property="og:title" content="derivJ" key="title" />
        <meta name="viewport" content="initial-scale=1.0, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>

      <ErrorBoundary>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ErrorBoundary>
    </Fragment>
  );
}

export default function App(appProps) {
  return (
    <Provider store={store}>
      <MyApp {...appProps} />
    </Provider>
  );
}
