import GlobalLoading from "@/components/loading";
import { setMount } from "@/redux/features/auth/authSlice";
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
    <div className="container grid items-center justify-center h-[80vh]">
      <GlobalLoading />
    </div>
  );
};

export default PreLogin;
