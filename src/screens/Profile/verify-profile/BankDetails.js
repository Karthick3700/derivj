import React, { Fragment, useCallback, useEffect, useState } from "react";
import ImageFallback from "./ImageFallback";
import { CONST, utils } from "@/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankSchema } from "@/utils/validator";
import {
  fetchUserProfile,
  updateBank,
  uploadImage,
} from "@/redux/features/account/accountBuilder";
import { useDispatch, useSelector } from "react-redux";
import Processing from "@/components/process";
import Success from "@/components/success";
import Loading from "@/components/loader";
import Failure from "@/components/failure";

const BankDetails = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state?.profile?.profileData);
  const isLoading = useSelector((state) => state?.profile?.isLoading);
  const bankStatus = authUser?.bankId?.bankStatus;
  // const [image, setImage] = useState(null);
  // const [preview, setPreview] = useState(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "all", resolver: yupResolver(bankSchema) });

  // useEffect(() => {
  //   if (image) {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setPreview(reader.result);
  //     };
  //     reader.readAsDataURL(image);
  //   } else {
  //     setPreview(null);
  //   }
  // }, [image]);

  // const handleImageChange = useCallback(async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (file.size > utils.fileSize()) {
  //       utils.showErrorMsg("File size exceeds the allowed limit.");
  //       return;
  //     }

  //     if (!utils.imageFilevalidation(file)) {
  //       utils.showErrorMsg("Invalid file type, please upload a valid image.");
  //       return;
  //     }
  //     file && setImage(file);
  //   }
  // }, []);

  // const handleUploadImage = useCallback(async () => {
  //   try {
  //     const response = await dispatch(uploadImage(image));
  //     setValue("proofId", response?.payload?._id);
  //     setImage(null);
  //     setPreview(null);
  //   } catch (error) {
  //     console.log("Error in uploading image::", error);
  //   }
  // }, [dispatch, image, setValue]);

  const handleUpdateBankSubmit = useCallback(
    async (data) => {
      const { name, holder, accountNumber, ifscCode, upiId } = data;
      const payload = { name, holder, accountNumber, ifscCode, upiId };
      try {
        await dispatch(updateBank(payload));
        dispatch(fetchUserProfile());
        reset();
      } catch (error) {
        console.log("error::", error);
      }
    },
    [dispatch, reset]
  );

  return (
    <Fragment>
      {!authUser?.isBankVerified && !bankStatus && (
        <Fragment>
          <form
            onSubmit={handleSubmit(handleUpdateBankSubmit)}
            className="flex flex-col  gap-10 mx-auto w-full"
          >
            <div className="flex ">
              <h1 className="text-xl font-bold">Bank Details</h1>
            </div>
            {/* <div className="flex flex-col gap-6 ">
              <div className="w-full md:w-6/12 ">
                <label
                  className="block mb-4 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input_front"
                >
                  Upload Bank Passbook
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input_bank"
                  name="file_input_bank"
                  type="file"
                  onChange={handleImageChange}
                />
                {errors?.proofId && (
                  <p className="text-red-600 dark:text-red-400 mt-2">
                    {errors?.proofId?.message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-6/12">
                {preview && (
                  <ImageFallback
                    sourceurl={preview}
                    onClick={handleUploadImage}
                  />
                )}
              </div>
            </div> */}
            <div className="flex flex-col w-full gap-8">
              <div className="flex gap-8 flex-col md:flex-row">
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="bank-name"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    Bank Name<span className="text-red-700">*</span>
                  </label>
                  <input
                    id="bank-name"
                    name="bank-name"
                    placeholder="Enter Bank Name"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="text"
                    {...register("name")}
                  />
                  {errors?.name && (
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      {errors?.name?.message}
                    </p>
                  )}
                </div>
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="beneficiary-name"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    Beneficiary Name<span className="text-red-700">*</span>
                  </label>
                  <input
                    id="beneficiary-name"
                    name="beneficiary-name"
                    placeholder="Enter Benificiary Name"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="text"
                    {...register("holder")}
                  />
                  {errors?.holder && (
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      {errors?.holder?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-8 flex-col md:flex-row">
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="accountno"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    Account Number<span className="text-red-700">*</span>
                  </label>
                  <input
                    id="accountno"
                    name="accountno"
                    placeholder="Enter Account No"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="string"
                    {...register("accountNumber")}
                  />
                  {errors?.accountNumber && (
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      {errors?.accountNumber?.message}
                    </p>
                  )}
                </div>
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="reaccountno"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    Re-Enter Account Number
                    <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="reaccountno"
                    name="reaccountno"
                    placeholder="Enter Account No"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="string"
                    {...register("reaccountNumber")}
                  />
                  {errors?.reaccountNumber && (
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      {errors?.reaccountNumber?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-8 flex-col md:flex-row">
                {" "}
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="ifsc"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    IFSC Code<span className="text-red-700">*</span>
                  </label>
                  <input
                    id="ifsc"
                    name="ifsc"
                    placeholder="Enter IFSC Code"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="text"
                    {...register("ifscCode")}
                  />
                  {errors?.ifscCode && (
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      {errors?.ifscCode?.message}
                    </p>
                  )}
                </div>
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="upiid"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    UPI ID<span className="text-red-700">*</span>
                  </label>
                  <input
                    id="upiid"
                    name="upiid"
                    placeholder="Enter UPI ID"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="string"
                    {...register("upiId")}
                  />
                  {errors?.upiId && (
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      {errors?.upiId?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-12 pt-8 w-full">
                <button
                  className=" uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-deca bg-slate-800 w-28 dark:text-gray-200 text-white font-bold whitespace-nowrap dark:bg-transparent dark:hover:bg-slate-700 hover:bg-black hover:text-white"
                  type="submit"
                >
                  {isLoading ? <Loading width="w-5" height="h-5" /> : "submit"}
                </button>
              </div>
            </div>
          </form>
        </Fragment>
      )}
      {!authUser?.isBankVerified &&
        bankStatus === CONST.KYC_VERIFY.PROCESSING && <Processing tag="bank" />}
      {authUser?.isBankVerified && bankStatus === CONST.KYC_VERIFY.SUCCESS && (
        <Success tag="bank" />
      )}
      {!authUser?.isBankVerified && bankStatus === CONST.KYC_VERIFY.FAILURE && (
        <Failure tag="bank" />
      )}
    </Fragment>
  );
};

export default BankDetails;
