import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/loader";
import { yupResolver } from "@hookform/resolvers/yup";
import { changepwdSchema } from "@/utils/validator";
import {
  showConfirmnewpwd,
  showNewpwd,
  showOldpwd,
} from "@/redux/features/ui/uiSlice";
import { CONST, utils } from "@/utils";
import { service } from "@/services";
import { CHANGE_PASSWORD } from "@/services/api-url.service";
import { logout } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/router";

const ChangePassword = () => {
  const { changeShowpwd, newShowpwd, newConfirmpwd } = useSelector(
    (state) => state.local
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading } = useSelector((state) => state.profile);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all", resolver: yupResolver(changepwdSchema) });

  // const handleSubmitpwd = useCallback(
  //   async (payload) => {
  //     const response = await service.post(CHANGE_PASSWORD, payload);
  //     console.log("response::", response);
  //     if (response.status) {
  //       utils.showSuccessMsg(response?.message);
  //       dispatch(logout());
  //       router.push(CONST.Routes.LOGIN);
  //     } else {
  //       utils.showErrorMsg(response.message);
  //     }
  //   },
  //   [dispatch, router]
  // );
  const handleSubmitpwd = useCallback(
    (values) => {
      console.log("values::", values);
      reset();
    },
    [reset]
  );

  const handleShowpwd = useCallback(() => {
    dispatch(showOldpwd());
  }, [dispatch]);

  const handleShowNewpwd = useCallback(() => {
    dispatch(showNewpwd());
  }, [dispatch]);

  const handleShowConfirmnewpwd = useCallback(() => {
    dispatch(showConfirmnewpwd());
  }, [dispatch]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitpwd)}
      className="flex flex-col  gap-8 mx-auto w-full"
    >
      <div className="flex  ">
        <h1 className="text-xl font-bold">Change Password</h1>
      </div>

      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-8">
          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <label
              htmlFor="oldpwd"
              className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700 dark:text-gray-400"
            >
              Old Password<span className="text-red-700">*</span>
            </label>
            <input
              id="oldpwd"
              name="oldPassword"
              placeholder="Enter old password"
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
              type={changeShowpwd ? "text" : "password"}
              {...register("oldPassword")}
            />
            <span
              className="absolute top-10 right-4 cursor-pointer"
              onClick={handleShowpwd}
            >
              {changeShowpwd
                ? utils.eyeIcon(20, 20, "text-gray-800 dark:text-white")
                : utils.eyeslashIcon(20, 20, "text-gray-800 dark:text-white")}
            </span>
            {errors?.oldPassword && (
              <p className="text-red-600 dark:text-red-500 mt-2">
                {errors?.oldPassword?.message}
              </p>
            )}
          </div>
          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <label
              htmlFor="newpwd"
              className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700 dark:text-gray-400"
            >
              New Password<span className="text-red-700">*</span>
            </label>
            <input
              id="newpwd"
              name="newPassword"
              placeholder="Enter new password"
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
              type={newShowpwd ? "text" : "password"}
              {...register("newPassword")}
            />
            <span
              className="absolute top-10 right-4 cursor-pointer"
              onClick={handleShowNewpwd}
            >
              {newShowpwd
                ? utils.eyeIcon(20, 20, "text-gray-800 dark:text-white")
                : utils.eyeslashIcon(20, 20, "text-gray-800 dark:text-white")}
            </span>
            {errors?.newPassword && (
              <p className="text-red-600 dark:text-red-500 mt-2">
                {errors?.newPassword?.message}
              </p>
            )}
          </div>
          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <label
              htmlFor="renewpwd"
              className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700 dark:text-gray-400"
            >
              Confirm New Password<span className="text-red-700">*</span>
            </label>
            <input
              id="renewpwd"
              name="confirmNewPassword"
              placeholder="Confirm new password"
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
              type={newConfirmpwd ? "text" : "password"}
              {...register("confirmNewPassword")}
            />
            <span
              className="absolute top-10 right-4 cursor-pointer"
              onClick={handleShowConfirmnewpwd}
            >
              {newConfirmpwd
                ? utils.eyeIcon(20, 20, "text-gray-800 dark:text-white")
                : utils.eyeslashIcon(20, 20, "text-gray-800 dark:text-white")}
            </span>
            {errors?.confirmNewPassword && (
              <p className="text-red-600 dark:text-red-500 mt-2">
                {errors?.confirmNewPassword?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-12 pt-8 w-full">
          <button
            className="uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-deca bg-slate-800 w-28 dark:text-gray-200 text-white font-bold whitespace-nowrap dark:bg-transparent dark:hover:bg-slate-700 hover:bg-black hover:text-white"
            type="submit"
          >
            {isLoading ? <Loading width="w-5" height="h-5" /> : "submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
