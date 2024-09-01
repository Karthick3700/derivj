import { fetchUserProfile } from "@/redux/features/account/accountBuilder";
import { setMount, updateStep } from "@/redux/features/auth/authSlice";
import { setIsProfileFetched } from "@/redux/features/ui/uiSlice";
import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const PostLogin = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, isNew, isMounted } = useSelector((state) => state?.user);
  const isProfileFetched = useSelector(
    (state) => state?.local?.isProfileFetched
  );
  const updatedStep = useSelector((state) => state?.profile?.updatedStep);
  const step = useSelector((state) => state?.user?.step);

  const hasFetchedProfileRef = useRef(isProfileFetched);

  useEffect(() => {
    const initialize = async () => {
      if (!isMounted) {
        dispatch(setMount(true));
      }

      if (isLoggedIn && (step < updatedStep || step === null)) {
        dispatch(updateStep(updatedStep));
      }
    };

    initialize();
  }, [isMounted, isLoggedIn, dispatch, step, updatedStep]);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn && !hasFetchedProfileRef.current) {
        await dispatch(fetchUserProfile());
        dispatch(setIsProfileFetched(true));
        hasFetchedProfileRef.current = true;
      }
    };

    fetchData();
  }, [isLoggedIn, dispatch, isProfileFetched]);

  return <Fragment>{children}</Fragment>;
};

export default PostLogin;
