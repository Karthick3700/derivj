import React, { Fragment, useCallback, useEffect, useState } from "react";
import ImageFallback from "./ImageFallback";
import { useDispatch, useSelector } from "react-redux";
import { CONST, utils } from "@/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { KYCSchema } from "@/utils/validator";
import {
  fetchUserProfile,
  updateKYC,
  uploadImage,
} from "@/redux/features/account/accountBuilder";
import Processing from "@/components/process";
import Success from "@/components/success";
import Loading from "@/components/loader";
import Failure from "@/components/failure";
import { setIsKycSubmitted } from "@/redux/features/ui/uiSlice";

const KYCIDetails = () => {
  // const [image, setImage] = useState(null);
  // const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const isKycSubmitted = useSelector((state) => state?.local?.isKycSubmitted);

  const authUser = useSelector((state) => state?.profile?.profileData);
  const kycStatus = authUser?.kycId?.kycStatus;
  const isLoading = useSelector((state) => state?.profile?.isLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "all",
    resolver: yupResolver(KYCSchema),
  });

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

  // const handleuploadImage = useCallback(async () => {
  //   try {
  //     const response = await dispatch(uploadImage(image));
  //     setValue("documentId", response?.payload?._id);
  //     setImage(null);
  //     setPreview(null);
  //   } catch (error) {
  //     console.log("Error in uploading kyc::", error);
  //   }
  // }, [dispatch, image, setValue]);

  useEffect(() => {
    if (isKycSubmitted) {
      dispatch(fetchUserProfile());
    }

    return () => dispatch(setIsKycSubmitted(false));
  }, [dispatch, isKycSubmitted]);

  const handleKYCSubmit = useCallback(
    async (data) => {
      const { documentNo } = data;
      const documentType = 20;
      const payload = {
        documentType,
        documentNo,
      };
      try {
        await dispatch(updateKYC(payload));
        dispatch(setIsKycSubmitted(true));
        reset();
      } catch (error) {
        console.log("error::", error);
      }
    },
    [dispatch, reset]
  );

  return (
    <Fragment>
      {!authUser?.isKycVerified && !kycStatus && (
        <Fragment>
          <form
            onSubmit={handleSubmit(handleKYCSubmit)}
            className="flex flex-col  gap-8 mx-auto w-full"
          >
            <div className="flex  ">
              <h1 className="text-xl font-bold">KYC Details</h1>
            </div>

            <div className="flex flex-col w-full gap-6">
              {/* <div className="grid grid-cols-1 md:grid-cols-6 gap-x-12 gap-y-6 py-8 h-full w-full items-center">
                <div className="md:col-span-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                  >
                    Upload Image
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    name="file_input"
                    type="file"
                    onChange={(e) => handleImageChange(e)}
                  />
                  {errors?.documentId && (
                    <p className="text-red-600 dark:text-red-500 mt-2">
                      {errors?.documentId?.message}
                    </p>
                  )}
                </div>
                {preview && (
                  <ImageFallback
                    sourceurl={preview}
                    onClick={handleuploadImage}
                  />
                )}
              </div> */}
              <div className="flex flex-col gap-8">
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="documentno"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    Enter PAN No<span className="text-red-700">*</span>
                  </label>
                  <input
                    id="documentno"
                    name="documentno"
                    placeholder="Enter Document No"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="text"
                    {...register("documentNo")}
                  />
                  {errors?.documentNo && (
                    <p className="text-red-600 dark:text-red-500 mt-2">
                      {errors?.documentNo?.message}
                    </p>
                  )}
                </div>
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="redocument-no"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    Re-Enter PAN No
                    <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="redocument-no"
                    name="redocument-no"
                    placeholder="Re-Enter Document No"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="text"
                    {...register("reDocumentNo")}
                  />
                  {errors?.reDocumentNo && (
                    <p className="text-red-600 dark:text-red-500 mt-2">
                      {errors?.reDocumentNo?.message}
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

      {!authUser?.isKycVerified &&
        CONST.KYC_VERIFY.PROCESSING === kycStatus && <Processing tag="KYC" />}
      {authUser?.isKycVerified && kycStatus === CONST.KYC_VERIFY.SUCCESS && (
        <Success tag="KYC" />
      )}
      {!authUser?.isKycVerified && kycStatus === CONST.KYC_VERIFY.FAILURE && (
        <Failure tag="KYC" />
      )}
    </Fragment>
  );
};

export default KYCIDetails;
