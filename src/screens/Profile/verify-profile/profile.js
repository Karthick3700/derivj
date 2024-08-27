import { Datepicker } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploader from "../image-uploader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "@/utils/validator";
import { utils } from "@/utils";

import { fileSize, imageFilevalidation } from "@/utils/utils";
import {
  submitUserProfile,
  uploadProfileImage,
} from "@/redux/account/accountBuilder";

const initialState = {
  imageId: "",
  dateOfBirth: "",
  phoneNumber: "",
  nominee: {
    name: "",
    dateOfBirth: "",
    email: "",
    relation: "",
    documentType: "",
    documentTypeVal: "",
    documentNo: "",
  },
};
const UserProfile = () => {
  const [selectedDocumentType, setSelectedDocumentType] = useState("");

  const relations = useSelector(
    (state) => state?.user?.commonData?.relationShip
  );

  const documentType = useSelector(
    (state) => state?.user?.commonData?.documentType
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(profileSchema),
    defaultValues: initialState,
  });

  const { isLoading, error, imageId, isDisabled } = useSelector(
    (state) => state?.profile
  );

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    if (!file) return;

    if (file.size > fileSize()) {
      utils.showErrorMsg("File size exceeds the allowed limit.");
      return;
    }

    const isValidFile = imageFilevalidation(file);

    if (!isValidFile) {
      utils.showErrorMsg("Invalid file type, please upload a valid image");
      return;
    }

    try {
      const response = await dispatch(uploadProfileImage(file));
      console.log("response", response?.payload?._id);
      setValue("imageId", response?.payload?._id);
    } catch (err) {
      console.error("imageuploaderr::", err);
      utils.showErrorMsg(err?.message);
    }
  };

  const handleProfileSubmit = async (data) => {
    const payload = {
      dateOfBirth: data.dateOfBirth,
      phoneNumber: data.phoneNumber,
      imageId: data.imageId,
      nominee: {
        name: data.nominee.name,
        email: data.nominee.email,
        relation: Number(data.nominee.relation),
        dateOfBirth: data.nominee.dateOfBirth,
        documentType: Number(data.nominee.documentType),
        documentNo: data.nominee.documentNo,
      },
    };

    try {
      await dispatch(submitUserProfile(payload));

      reset();
    } catch (err) {
      console.error("imageuploaderr::", err);
    }
  };

  const handleDateOfBirthChange = (date) => {
    console.log("userdob::", date);
    const formattedDate = date
      ? `${date.getDate()}/${date.toLocaleString("default", {
          month: "short",
        })}/${date.getFullYear()}`
      : "";

    setValue("dateOfBirth", formattedDate);
  };

  const handleNomineeDateOfBirthChange = (date) => {
    console.log("userdob::", date);
    const formattedDate = date
      ? `${date.getDate()}/${date.toLocaleString("default", {
          month: "short",
        })}/${date.getFullYear()}`
      : "";
    setValue("nominee.dateOfBirth", formattedDate);
  };

  const handleDoctypeChange = (e) => {
    const value = e.target.value;
    setSelectedDocumentType(value);
    setValue("nominee.documentType", value);
    setValue("nominee.documentTypeVal", value);
  };

  return (
    <form
      onSubmit={handleSubmit(handleProfileSubmit)}
      className="flex flex-col  gap-12 mx-auto w-full"
    >
      <div className="flex  ">
        <h1 className="text-xl font-bold">Please fill your data first</h1>
      </div>

      {isDisabled && (
        <div className="bg-slate-100 rounded-lg p-5 w-full">
          <span className="text-lime-600 dark:text-gray-600 text-lg font-deca font-bold">
            Your details are submitted move to the next step of KYC
          </span>
        </div>
      )}

      <div className="flex flex-col w-full">
        <div className="flex pb-4 border-b-2 border-gray-200">
          <h2 className="text-base font-deca font-medium dark:text-gray-100 w-full">
            Basic Details
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 space-y-6 py-8 h-full w-full items-center">
          <ImageUploader />
          <div className="col-span-2">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Profile Image
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              onChange={handleProfileImageChange}
              disabled={isDisabled ? true : false}
            />
            {errors?.imageId && (
              <p className="text-red-500 dark:text-red-400 mt-2 text-[12px]">
                {errors?.imageId?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-12 pt-8 w-full md:flex-nowrap flex-wrap">
          <div className="flex flex-col gap-2 w-full md:w-6/12">
            <label
              htmlFor="userdob"
              className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
            >
              Date of birth <span className="text-red-700">*</span>
            </label>
            <Datepicker
              id="userdob"
              placeholder="Select Date"
              format="dd MMM yyyy"
              onSelectedDateChanged={(e) => handleDateOfBirthChange(e)}
              disabled={isDisabled ? true : false}
            />
            {errors?.dateOfBirth && (
              <p className="text-red-500 dark:text-red-400 mt-2 text-[12px]">
                {errors?.dateOfBirth?.message}
              </p>
            )}
          </div>

          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <p className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 ">
              Mobile No <span className="text-red-700">*</span>
            </p>
            <input
              placeholder="Enter mobile number"
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              type="number"
              {...register("phoneNumber")}
              disabled={isDisabled ? true : false}
            />
            {errors?.phoneNumber && (
              <p className="text-red-500 dark:text-red-400 mt-2 text-[12px]">
                {errors?.phoneNumber?.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex pb-4 border-b-2 border-gray-200">
          <h2 className="text-base font-deca font-medium dark:text-gray-100 ">
            Enter nominee details
          </h2>
        </div>
        <div className="flex gap-12 pt-8 w-full md:flex-nowrap flex-wrap">
          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <p className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 ">
              Name <span className="text-red-700">*</span>
            </p>
            <input
              placeholder="Enter Nominee Name"
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              type="text"
              {...register("nominee.name")}
              disabled={isDisabled ? true : false}
            />
            {errors?.nominee?.name && (
              <p className="text-red-500 dark:text-red-400 mt-2 text-[12px]">
                {errors?.nominee?.name?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full md:w-6/12">
            <label
              htmlFor="nomineedob"
              className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
            >
              Date of birth <span className="text-red-700">*</span>
            </label>
            <Datepicker
              id="nomineedob"
              className="custom-datepicker"
              placeholder="Select Date"
              format="dd MMM yyyy"
              onSelectedDateChanged={(e) => handleNomineeDateOfBirthChange(e)}
              disabled={isDisabled ? true : false}
            />
            {errors?.nominee?.dateOfBirth && (
              <p className="text-red-500 dark:text-red-400 mt-2 text-[12px]">
                {errors?.nominee?.dateOfBirth?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-12 pt-8 w-full md:flex-nowrap flex-wrap">
          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <label
              htmlFor="email"
              className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
            >
              Email <span className="text-red-700">*</span>
            </label>
            <input
              id="email"
              placeholder="Enter Nominee Email"
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              type="email"
              {...register("nominee.email")}
              disabled={isDisabled ? true : false}
            />
            {errors?.nominee?.email && (
              <p className="text-red-500 dark:text-red-400 mt-2 text-[12px]">
                {errors?.nominee?.email?.message}
              </p>
            )}
          </div>
          <div className="flex w-full md:w-6/12 flex-col">
            <div className="mb-2 inline-flex gap-1">
              <label
                htmlFor="relationship"
                className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
              >
                Select Relationship <span className="text-red-700">*</span>
              </label>
            </div>
            <select
              name="relationship"
              id="relationship"
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              {...register("nominee.relation")}
              disabled={isDisabled ? true : false}
              defaultValue=""
            >
              <option value="" disabled>
                Select Relationship
              </option>
              {relations?.map((data, index) => (
                <option key={index} value={data.value}>
                  {data.label}
                </option>
              ))}
            </select>
            {errors?.nominee?.relation && (
              <p className="text-red-500 dark:text-red-400 mt-2 text-[12px]">
                {errors?.nominee?.relation?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-12 pt-8 w-full md:flex-nowrap flex-wrap">
          <div className="flex w-full md:w-6/12 flex-col">
            <div className="mb-2 inline-flex gap-1">
              <label
                htmlFor="documentType"
                className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
              >
                Select Document Type <span className="text-red-700">*</span>
              </label>
            </div>
            <select
              id="documenttype"
              defaultValue=""
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              onChange={handleDoctypeChange}
              disabled={isDisabled ? true : false}
            >
              <option value="" disabled>
                Select Document
              </option>
              {documentType?.map((data, index) => (
                <option key={index} value={data.value}>
                  {data.label}
                </option>
              ))}
            </select>
            {errors?.nominee?.documentType && (
              <p className="text-red-500 dark:text-red-400 mt-2 text-[12px]">
                {errors?.nominee?.documentType?.message}
              </p>
            )}
          </div>
          {selectedDocumentType && (
            <div className="relative w-full md:w-6/12 flex flex-col gap-2">
              <label
                htmlFor="document-number"
                className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
              >
                Document Number <span className="text-red-700">*</span>
              </label>
              <input
                id="document-number"
                placeholder="Enter Document Number"
                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
                type="string"
                {...register("nominee.documentNo")}
              />
              {errors?.nominee?.documentNo && (
                <p className="text-red-500 dark:text-red-400 mt-2 text-[12px]">
                  {errors?.nominee?.documentNo?.message}
                </p>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-12 pt-8 w-full">
          <button
            className=" uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-deca bg-footer-gradient bg-cover bg-center dark:text-gray-200 text-black font-bold whitespace-nowrap dark:bg-none hover:bg-none hover:bg-black hover:text-white"
            type="submit"
            disabled={isDisabled ? true : false}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserProfile;
