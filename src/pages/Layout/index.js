import Footer from "@/components/Footer";
import HeaderBeforeLogin from "@/components/HeaderBeforeLogin";
import React, { Fragment } from "react";
import { Bounce, ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <HeaderBeforeLogin />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        toastClassName="font-sans text-sm font-semibold"
      />
      {children}
      <Footer/>
    </Fragment>
  );
};

export default Layout;
