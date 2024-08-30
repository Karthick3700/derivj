import "flowbite/dist/flowbite.css";
import "@/styles/globals.css";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
import { useRouter } from "next/router";
import ErrorBoundary from "@/components/ErrorBoundary";
import { localStorage } from "@/utils";
import GlobalLoading from "@/components/loading";
import { Provider } from "react-redux";
import store from "@/redux/store";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const theme = localStorage.getTheme();
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    let timer;
    const MINIMUM_LOADING_TIME = 1500;

    const handleStart = () => {
      setIsLoading(true);
      timer = setTimeout(() => {
        setIsLoading(false);
      }, MINIMUM_LOADING_TIME);
    };

    const handleComplete = () => {
      clearTimeout(timer);
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      clearTimeout(timer);
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <Fragment>
      <Head>
        <title>Home | derivJ</title>
        <meta property="og:title" content="derivJ" key="title" />
        <meta name="viewport" content="initial-scale=1.0, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>

      <ErrorBoundary>
        <Layout>
          {isLoading ? (
            <div className="flex justify-center items-center w-full min-h-screen">
              <GlobalLoading />
            </div>
          ) : (
            <Component {...pageProps} />
          )}
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
