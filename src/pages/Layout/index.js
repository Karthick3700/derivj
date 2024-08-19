import Footer from "@/components/Footer";
import HeaderAfterLogin from "@/components/HeaderAfterLogin";
import HeaderBeforeLogin from "@/components/HeaderBeforeLogin";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  const isLoggedin = useSelector((state) => state.user?.isLoggedIn);
  
  return (
    <Fragment>
      {/* <HeaderBeforeLogin /> */}
      {isLoggedin ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}
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
      <Footer />
    </Fragment>
  );
};

export default Layout;
