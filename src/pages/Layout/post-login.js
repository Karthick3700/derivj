import {
  fetchUserProfile,
  loadCommonData,
  setMount,
} from "@/redux/auth/authSlice";
import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const PostLogin = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, isNew, isMounted } = useSelector((state) => state?.user);

  useEffect(() => {
    const initialize = async () => {
      if (!isMounted) {
        dispatch(setMount(true));
      }

      if (isMounted && isLoggedIn && isNew) {
        dispatch(fetchUserProfile());
      }
    };

    initialize();
  }, [isMounted, isLoggedIn, isNew, dispatch]);

  return <Fragment>{children}</Fragment>;
};

export default PostLogin;
