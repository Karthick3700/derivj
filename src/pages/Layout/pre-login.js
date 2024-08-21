import { setMount } from "@/redux/auth/authSlice";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PreLogin = ({ children }) => {
  const dispatch = useDispatch();
  const isMounted = useSelector((state) => state?.user?.isMounted);

  useEffect(() => {
    dispatch(setMount(true));
  }, [dispatch]);

  return isMounted ? (
    <Fragment>{children}</Fragment>
  ) : (
    "Pre-login container loading"
  );
};

export default PreLogin;
