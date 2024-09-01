import { addressSchema } from "@/utils/validator";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import ImageFallback from "./ImageFallback";
import { CONST, utils } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateAddress,
  uploadImage,
} from "@/redux/features/account/accountBuilder";
import Processing from "@/components/process";
import Success from "@/components/success";
import Loading from "@/components/loader";
import Failure from "@/components/failure";
import { setIsAddressSubmitted } from "@/redux/features/ui/uiSlice";

const AddressDetails = () => {
  const isAddressSubmitted = useSelector(
    (state) => state?.local?.isAddressSubmitted
  );

  const authUser = useSelector((state) => state?.profile?.profileData);
  const addressStatus = authUser?.addressId?.addressStatus;
  const isLoading = useSelector((state) => state?.profile?.isLoading);
  const dispatch = useDispatch();
  // const [imgPreviewFront, setImgPreviewFront] = useState(null);
  // const [imgPreviewBack, setImgPreviewBack] = useState(null);
  // const [imageFront, setImageFront] = useState(null);
  // const [imageBack, setImageBack] = useState(null);

  useEffect(() => {
    if (isAddressSubmitted) {
      dispatch(fetchUserProfile());
    }

    return () => dispatch(setIsAddressSubmitted(false));
  }, [dispatch, isAddressSubmitted]);

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(addressSchema),
  });

  useEffect(() => {
    if (authUser && authUser?.addressId) {
      setValue("documentNo", authUser?.addressId?.documentNo);
      setValue("reEnterDocumentNo", authUser?.addressId?.documentNo);
      setValue("flotNo", authUser?.addressId?.flotNo);
      setValue("street", authUser?.addressId?.street);
      setValue("city", authUser?.addressId?.city);
      setValue("state", authUser?.addressId?.state);
      setValue("pincode", authUser?.addressId?.pincode);
    }
  }, [authUser, setValue]);

  // useEffect(() => {
  //   if (imageFront) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImgPreviewFront(reader.result);
  //     };
  //     reader.readAsDataURL(imageFront);
  //   } else {
  //     setImgPreviewFront(null);
  //   }

  //   if (imageBack) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImgPreviewBack(reader.result);
  //     };
  //     reader.readAsDataURL(imageBack);
  //   } else {
  //     setImgPreviewBack(null);
  //   }
  // }, [imageFront, imageBack]);

  // const handleFrontImageChange = useCallback(async (e) => {
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
  //     file ? setImageFront(file) : setImageFront(null);
  //   }
  // }, []);

  // const handleBackImageChange = useCallback(async (e) => {
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
  //     file ? setImageBack(file) : setImageBack(null);
  //   }
  // }, []);

  // const handleUploadFrontImage = useCallback(async () => {
  //   try {
  //     const response = await dispatch(uploadImage(imageFront));
  //     setValue("documentFrontId", response?.payload?._id);
  //     setImgPreviewFront(false);
  //     setImageFront(null);
  //   } catch (error) {
  //     console.log("Error::", error);
  //   }
  // }, [dispatch, imageFront, setValue]);

  // const handleUploadBackImage = useCallback(async () => {
  //   try {
  //     const response = await dispatch(uploadImage(imageBack));
  //     setValue("documentBackId", response?.payload?._id);
  //     setImgPreviewBack(false);
  //     setImageBack(null);
  //   } catch (error) {
  //     console.log("Error::", error);
  //   }
  // }, [dispatch, setValue, imageBack]);

  const handleAddressSubmit = useCallback(
    async (data) => {
      const { documentNo, flotNo, street, city, state, pincode } = data;
      const documentType = 10;
      const payload = {
        documentType,
        documentNo,
        flotNo,
        street,
        city,
        state,
        pincode: Number(pincode),
      };
      try {
        await dispatch(updateAddress(payload));
        dispatch(setIsAddressSubmitted(true));
        reset();
      } catch (error) {
        console.log("error::", error);
      }
    },
    [dispatch, reset]
  );

  return (
    <Fragment>
      {!authUser?.isAddressVerified && !addressStatus && (
        <Fragment>
          {" "}
          <form
            onSubmit={handleSubmit(handleAddressSubmit)}
            className="flex flex-col  gap-4 mx-auto w-full"
          >
            <div className="flex">
              <h1 className="text-xl font-bold">Address Details</h1>
            </div>

            <div className="flex flex-col w-full gap-10 my-6">
              {/* {authUser?.addressId ? (
                ""
              ) : (
                <div className="grid md:grid-cols-2 gap-6 ">
                  <div className="flex flex-col gap-6">
                    <div className="w-full ">
                      <label
                        className="block mb-4 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input_front"
                      >
                        Upload Front Image
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input_front"
                        name="file_input_front"
                        type="file"
                        onChange={handleFrontImageChange}
                      />
                      {errors?.documentFrontId && (
                        <p className="text-red-600 dark:text-red-400 mt-2">
                          {errors?.documentFrontId?.message}
                        </p>
                      )}
                    </div>
                    {imgPreviewFront && (
                      <ImageFallback
                        sourceurl={imgPreviewFront}
                        onClick={handleUploadFrontImage}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="w-full ">
                      <label
                        className="block mb-4 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input_back"
                      >
                        Upload Back Image
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input_back"
                        name="file_input_back"
                        type="file"
                        onChange={handleBackImageChange}
                      />
                      {errors?.documentBackId && (
                        <p className="text-red-600 dark:text-red-400 mt-2">
                          {errors?.documentBackId?.message}
                        </p>
                      )}
                    </div>
                    {imgPreviewBack && (
                      <ImageFallback
                        sourceurl={imgPreviewBack}
                        onClick={handleUploadBackImage}
                      />
                    )}
                  </div>
                </div>
              )} */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="documentno"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    Enter Aadhar No<span className="text-red-700">*</span>
                  </label>
                  <input
                    id="documentno"
                    name="documentno"
                    placeholder="Enter Document No"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="number"
                    {...register("documentNo")}
                  />
                  {errors?.documentNo && (
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      {errors?.documentNo?.message}
                    </p>
                  )}
                </div>
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="redocument-no"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    Re-Enter Aadhar No
                    <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="redocument-no"
                    name="redocument-no"
                    placeholder="Re-Enter Document No"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="string"
                    {...register("reEnterDocumentNo")}
                  />
                  {errors?.reEnterDocumentNo && (
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      {errors?.reEnterDocumentNo?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="flat"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    Flat No<span className="text-red-700">*</span>
                  </label>
                  <input
                    name="flat"
                    id="flat"
                    placeholder="Enter your flat No"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="string"
                    {...register("flotNo")}
                  />
                  {errors?.flotNo && (
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      {errors?.flotNo?.message}
                    </p>
                  )}
                </div>
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="street"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    Street<span className="text-red-700">*</span>
                  </label>
                  <input
                    name="street"
                    id="street"
                    placeholder="Enter your street"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="string"
                    {...register("street")}
                  />
                  {errors?.street && (
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      {errors?.street?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="city"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    City<span className="text-red-700">*</span>
                  </label>
                  <input
                    name="city"
                    id="city"
                    placeholder="Enter your city"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="string"
                    {...register("city")}
                  />
                  {errors?.city && (
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      {errors?.city?.message}
                    </p>
                  )}
                </div>
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="state"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    State<span className="text-red-700">*</span>
                  </label>
                  <input
                    name="state"
                    id="state"
                    placeholder="Enter your state"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="string"
                    {...register("state")}
                  />
                  {errors?.state && (
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      {errors?.state?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:pe-8">
                <div className="relative w-full md:w-6/12 flex flex-col gap-2">
                  <label
                    htmlFor="pincode"
                    className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
                  >
                    Pincode<span className="text-red-700">*</span>
                  </label>
                  <input
                    name="pincode"
                    id="pincode"
                    placeholder="Enter your Pincode"
                    className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                    type="number"
                    {...register("pincode")}
                  />
                  {errors?.pincode && (
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      {errors?.pincode?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-12 pt-2 w-full">
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
      {!authUser?.isAddressVerified &&
        addressStatus === CONST.KYC_VERIFY.PROCESSING && (
          <Processing tag="address" />
        )}
      {authUser?.isAddressVerified &&
        addressStatus === CONST.KYC_VERIFY.SUCCESS && <Success tag="address" />}
      {!authUser?.isAddressVerified &&
        addressStatus === CONST.KYC_VERIFY.FAILURE && <Failure tag="address" />}
    </Fragment>
  );
};

export default AddressDetails;
