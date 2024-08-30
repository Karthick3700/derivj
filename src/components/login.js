"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { CONST, utils, validator } from "@/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOG_IN } from "@/services/api-url.service";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginShowpwd } from "@/redux/features/ui/uiSlice";
import { loading, login } from "@/redux/features/auth/authSlice";
import Loading from "./loader";
import { service } from "@/services";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.user?.isLoading);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validator.loginSchema),
  });

  const showPassword = useSelector((state) => state.local?.loginShowpwd);

  const handleShowPassword = useCallback(() => {
    dispatch(toggleLoginShowpwd());
  }, [dispatch]);

  const handleLoginSubmit = async (data) => {
    dispatch(loading(true));
    const { email, password } = data;
    const payload = { email, password };
    try {
      const resp = await service.post(LOG_IN, payload);

      if (resp?.statusCode === CONST.status.SUCCESS) {
        utils.showSuccessMsg(CONST.MSG.LOGIN_SUCCESS);
        dispatch(login(resp?.doc));

        router.push(CONST.Routes.PROFILE);
      } else {
        utils.showErrorMsg(resp.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      dispatch(loading(false));
      reset();
    }
  };

  return (
    <section className="container mx-auto my-12 h-full">
      <div className="max-w-[500px] mx-auto">
        <div
          className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
        relative z-10 dark:bg-gray-800 dark:shadow-md"
        >
          <p className="w-full text-2xl font-semibold text-center leading-snug font-sans  dark:text-white">
            Sign up for an derivJ
          </p>
          <form
            onSubmit={handleSubmit(handleLoginSubmit)}
            className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8 dark:text-gray-200"
          >
            <div className="relative">
              <p className="bg-white  pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute dark:text-gray-400 dark:bg-gray-800">
                Email
              </p>
              <input
                {...register("email")}
                placeholder="123@ex.com"
                type="text"
                className="border placeholder-gray-400 focus:outline-none placeholder:text-sm
              focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
              border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
              {errors.email && (
                <p className="text-red-500 mt-2 text-xs dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 z-10 font-medium text-gray-600 absolute top-2 dark:text-gray-400 dark:bg-gray-800">
                Password
              </p>
              <div className="relative inline-flex w-full">
                <input
                  {...register("password")}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="border placeholder-gray-400 focus:outline-none placeholder:text-sm focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
                <span
                  className="absolute top-7 right-4 cursor-pointer dark:text-gray-200"
                  onClick={handleShowPassword}
                >
                  {showPassword
                    ? utils.eyeIcon(20, 20, "text-gray-600 dark:text-gray-400")
                    : utils.eyeslashIcon(
                        20,
                        20,
                        "text-gray-600 dark:text-gray-400"
                      )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 mt-2 text-xs dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <button
                type="submit"
                className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-slate-800 uppercase tracking-widest
              rounded-lg transition duration-200 hover:bg-black ease dark:bg-gray-900 dark:hover:bg-black"
              >
                {isLoading ? <Loading width="w-8" height="h-8" /> : "log in"}
              </button>
            </div>
            <div className="relative inline-flex gap-2 items-center justify-center mx-auto w-full dark:text-gray-200">
              <p>Don't have an account? </p>
              <Link
                href={CONST.Routes.SIGN_UP}
                className="text-blue-400 hover:text-blue-600 dark:text-blue-600 dark:hover:text-blue-800"
              >
                Sign up here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
