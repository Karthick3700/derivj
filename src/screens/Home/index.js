import React, { Fragment, useCallback } from "react";
import Banner from "./banner";
import Growth from "./growth";
import Reasons from "./reasons";

const LandingPage = () => {
  return (
    <Fragment>
      <ErrorProne />
      <Banner />
      <Growth />
      <Reasons />
    </Fragment>
  );
};

function ErrorProne() {
  throw new Error("I am crashed");
  return <div>It will not render due to the above error</div>;
}

export default LandingPage;
