import "@/styles/globals.css";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
import { useRouter } from "next/router";
import Loading from "@/components/loading";
import { Provider } from "react-redux";
import store from "@/redux/store";


export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
      <Provider store={store}>
        <Layout>
          {isLoading ? (
            <div className="flex justify-center items-center w-full min-h-screen">
              <Loading />
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </Provider>
    </Fragment>
  );
}
