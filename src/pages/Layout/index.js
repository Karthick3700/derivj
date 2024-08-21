import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCommonData,
  login,
  setLoggedIn,
  setMount,
} from "@/redux/auth/authSlice";
import { useRouter } from "next/router";
import HeaderAfterLogin from "@/components/HeaderAfterLogin";
import HeaderBeforeLogin from "@/components/HeaderBeforeLogin";
import { ToastContainer, Bounce } from "react-toastify";
import Footer from "@/components/Footer";
import { CONST, localStorage } from "@/utils";
import { service } from "@/services";
import { MASTER } from "@/services/api-url.service";
import PreLogin from "./pre-login";
import PostLogin from "./post-login";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, isMounted } = useSelector((state) => state?.user);

  useEffect(() => {
    const initialize = async () => {
      if (!isMounted) {
        dispatch(setMount(true));
      }

      // Check session login
      const token = localStorage.getAuthToken();
      if (token) {
        localStorage.setAuthToken(token);
        const user = localStorage.getAuthUser();
        dispatch(login(user));
      }

      // Load common data
      try {
        const resp = await service.get(MASTER);
        if (resp?.statusCode === CONST.status.SUCCESS) {
          dispatch(loadCommonData(resp.doc));
        }
      } catch (err) {
        console.error("Error loading common data:", err);
      }
    };

    if (isMounted) {
      initialize();
    }
  }, [dispatch, isMounted]);

  return (
    <>
      {isLoggedIn ? (
        <Fragment>
          <HeaderAfterLogin />
          <PostLogin>{children}</PostLogin>
        </Fragment>
      ) : (
        <Fragment>
          <HeaderBeforeLogin />
          <PreLogin>{children}</PreLogin>
        </Fragment>
      )}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        toastClassName="font-sans text-sm font-semibold"
      />

      <Footer />
    </>
  );
};

export default Layout;
