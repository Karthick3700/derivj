import Login from "@/components/login";
import Head from "next/head";
import React, { Fragment } from "react";


const LoginPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Login | derivJ</title>
      </Head>
      <Login/>
    </Fragment>
  );
};

export default LoginPage;
