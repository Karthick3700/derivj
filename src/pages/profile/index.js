import ProfileScreen from "@/screens/Profile";
import Head from "next/head";
import React, { Fragment } from "react";

const ProfilePage = () => {
  return (
    <Fragment>
      <Head>
        <title>Profile | derivJ</title>
      </Head>
      <ProfileScreen />
    </Fragment>
  );
};

export default ProfilePage;
