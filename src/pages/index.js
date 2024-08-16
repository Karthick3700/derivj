import Head from "next/head";
import { Fragment, lazy, Suspense } from "react";
import Loading from "@/components/loading";

const HomePage = lazy(() => import("@/screens/Home"));

export default function Home() {
  return (
    <Fragment>
      <main>
        <Suspense fallback={<Loading />}>
          <HomePage />
        </Suspense>
      </main>
    </Fragment>
  );
}
