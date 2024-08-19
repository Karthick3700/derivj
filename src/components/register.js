import React, { useCallback, useState } from "react";
import { services } from "@/services";
import { CONST, utils, validator } from "@/utils";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SIGN_UP } from "@/services/api-url.service";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./spinner";
import { showConfirmpwd, showPassword } from "@/redux/localstore/localSlice";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const showpassword = useSelector((state) => state.local?.showPassword);
  const showConfirmpassword = useSelector(
    (state) => state.local?.showConfirmpwd
  );

  const [loading, setLoading] = useState(false);

  const handleShowPassword = useCallback(() => {
    dispatch(showPassword());
  }, [dispatch]);

  const handleShowConfirmPwd = useCallback(() => {
    dispatch(showConfirmpwd());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validator.registerSchema),
  });

  const onSubmitSignup = async (data) => {
    setLoading(true);
    const { name, email, password } = data;
    const payload = { name, email, password };
    try {
      const resp = await services.post(SIGN_UP, payload);
      console.log("resp::", resp);
      if (resp?.statusCode === CONST.RESP_CODE.SUCCESS_CODE) {
        utils.showSuccessMsg(resp?.message);
        router.push(CONST.Routes.LOGIN);
      } else {
        utils.showErrorMsg(resp?.message);
      }
      setLoading(false);
      reset();
    } catch (error) {
      console.log("Error::", error);
      utils.showErrorMsg(error?.message);
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto my-12 h-full">
      <div className="max-w-[500px] mx-auto">
        <div className=" dark:bg-[#1A1D23] flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
          <p className="w-full text-2xl font-semibold text-center leading-snug font-sans dark:text-[#e6edf3]">
            Register for an derivJ
          </p>
          <form
            onSubmit={handleSubmit(onSubmitSignup)}
            className="w-full mt-6 relative space-y-8"
          >
            <div className="relative">
              <p className="bg-white dark:bg-[#1a1d23] pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600 dark:text-gray-200 absolute">
                Username
              </p>
              <input
                {...register("name")}
                placeholder="John"
                type="text"
                className="border font-medium placeholder:text-sm placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white dark:bg-transparent border-gray-300 rounded-md dark:focus:border-blue-400 dark:text-white"
              />
              {errors.name && (
                <p className="text-red-500 dark:text-red-300 mt-2 text-xs font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="relative">
              <p className="bg-white dark:bg-[#1a1d23] pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600 dark:text-gray-200 absolute">
                Email
              </p>
              <input
                {...register("email")}
                placeholder="123@ex.com"
                type="text"
                className="border font-medium placeholder-gray-400 focus:outline-none placeholder:text-sm focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white dark:bg-transparent border-gray-300 rounded-md dark:focus:border-blue-400 dark:text-white"
              />
              {errors.email && (
                <p className="text-red-500 font-medium dark:text-red-300 mt-2 text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <p className="bg-white dark:bg-[#1a1d23]  pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 z-10 font-medium text-gray-600 dark:text-gray-200 absolute top-2">
                Password
              </p>
              <div className="relative inline-flex w-full ">
                <input
                  {...register("password")}
                  placeholder="Password"
                  type={showpassword ? "text" : "password"}
                  className="border font-medium placeholder-gray-400 dark:bg-transparent dark:focus:border-blue-400 dark:placeholder:text-white focus:outline-none placeholder:text-sm focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md dark:text-white"
                />
                <span
                  className="absolute top-7 right-4 cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {showpassword
                    ? utils.eyeIcon(20, 20, "text-gray-800 dark:text-white")
                    : utils.eyeslashIcon(
                        20,
                        20,
                        "text-gray-800 dark:text-white"
                      )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 dark:text-red-300 mt-2 text-xs font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative">
              <p className="bg-white dark:bg-[#1a1d23] dark:text-gray-200 pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600 absolute top-2 z-10">
                Confirm Password
              </p>
              <div className="relative inline-flex w-full">
                <input
                  {...register("confirmpassword")}
                  placeholder="Re-enter password"
                  type={showConfirmpassword ? "text" : "password"}
                  className="border font-medium placeholder-gray-400 focus:outline-none placeholder:text-sm focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white dark:bg-transparent dark:focus:border-blue-400 dark:text-white border-gray-300 rounded-md"
                />
                <span
                  className="absolute top-7 right-4 cursor-pointer"
                  onClick={handleShowConfirmPwd}
                >
                  {showConfirmpassword
                    ? utils.eyeIcon(20, 20, "text-gray-800 dark:text-white")
                    : utils.eyeslashIcon(
                        20,
                        20,
                        "text-gray-800 dark:text-white"
                      )}
                </span>
              </div>
              {errors.confirmpassword && (
                <p className="text-red-500 dark:text-red-300 mt-2 text-xs font-medium">
                  {errors.confirmpassword.message}
                </p>
              )}
            </div>
            <div className="relative">
              <button
                type="submit"
                className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-slate-800 uppercase tracking-widest rounded-lg transition duration-200 hover:bg-black ease"
              >
                {loading ? <Spinner color={"white"} /> : "Create account"}
              </button>
            </div>
            <div className="relative inline-flex gap-2 items-center justify-center mx-auto w-full">
              <p className="dark:text-white font-medium">
                Already have an account?{" "}
              </p>
              <Link
                href={CONST.Routes.LOGIN}
                className="text-blue-400 hover:text-blue-600 uppercase tracking-widest"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
