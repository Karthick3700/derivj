import React, { Fragment, useState } from "react";
import Link from "next/link";
import { CONST, utils } from "@/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { services } from "@/services";
import { LOG_IN } from "@/services/api-url.service";
import { useRouter } from "next/router";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(CONST.MSG.INVALID_EMAIL)
    .label(CONST.MSG.REQ_EMAIL)
    .required(),
  password: Yup.string()
    .label(CONST.MSG.REQ_PWD)
    .required()
    .matches(CONST.MSG.PASSWORD_REGEX_EXP, CONST.MSG.PASSWORD_REGEX_MSG),
});

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(validationSchema) });

  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = async (data) => {
    const { email, password } = data;
    const payload = { email, password };
    try {
      const resp = await services.post(LOG_IN, payload);
      
      if (resp?.statusCode === 200) {
        utils.handleSuccess(resp?.message);
        router.push(CONST.Routes.MAIN);
      } else {
        utils.handleError(resp?.message);
      }
      reset();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
                log in
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
