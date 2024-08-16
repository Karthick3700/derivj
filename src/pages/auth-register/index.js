import Register from "@/components/register";
import Head from "next/head";
import React, { Fragment } from "react";

const RegisterPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Signup | derivJ</title>
      </Head>
      <Register />
    </Fragment>
  );
};

export default RegisterPage;
