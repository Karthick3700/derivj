import { fetchUserProfile } from "@/redux/features/account/accountBuilder";
import { setMount, updateStep } from "@/redux/features/auth/authSlice";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PostLogin = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, isNew, isMounted } = useSelector((state) => state?.user);
  const updatedStep = useSelector((state) => state?.profile?.updatedStep);
  const step = useSelector((state) => state?.user?.step);

  useEffect(() => {
    const initialize = async () => {
      if (!isMounted) {
        dispatch(setMount(true));
      }

      if (isMounted && isLoggedIn && isNew !== null) {
        await dispatch(fetchUserProfile());
      }

      if (isLoggedIn && (step < updatedStep || step === null)) {
        dispatch(updateStep(updatedStep));
      }
    };

    initialize();
  }, [isMounted, isLoggedIn, isNew, dispatch, step, updatedStep]);

  return <Fragment>{children}</Fragment>;
};

export default PostLogin;
