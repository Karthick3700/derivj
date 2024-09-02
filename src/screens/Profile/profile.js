import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "@/utils/validator";
import { utils } from "@/utils";
import {
  fetchUserProfile,
  submitUserProfile,
  uploadImage,
} from "@/redux/features/account/accountBuilder";
import Loading from "@/components/loader";
import DatePicker from "react-datepicker";
import { subYears } from "date-fns";
import { setIsProfileSubmitted } from "@/redux/features/ui/uiSlice";

const initialState = {
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
  const dispatch = useDispatch();
  const [selectedDocumentType, setSelectedDocumentType] = useState("");

  const { documentType, relationShip } = useSelector(
    (state) => state?.user?.commonData
  );
  const { isDisabled, profileData, isLoading } = useSelector(
    (state) => state?.profile
  );
  const isProfileSubmitted = useSelector(
    (state) => state?.local?.isProfileSubmitted
  );

  const dateOfBirthRef = useRef();
  const nomineeDateofbirthRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(profileSchema),
    defaultValues: initialState,
  });

  useEffect(() => {
    if (isProfileSubmitted) {
      dispatch(fetchUserProfile());
    }
    if (profileData) {
      setValue("phoneNumber", profileData?.phone);
      setValue("dateOfBirth", profileData?.dateOfBirth);
      setValue("nominee.name", profileData?.nomineeId?.name);
      setValue("nominee.email", profileData?.nomineeId?.email);
      setValue("nominee.relation", profileData?.nomineeId?.relation);
      setValue("nominee.dateOfBirth", profileData?.nomineeId?.dateOfBirth);
      setValue("nominee.documentType", profileData?.nomineeId?.documentType);
      setSelectedDocumentType(profileData?.nomineeId?.documentType);
      setValue("nominee.documentNo", profileData?.nomineeId?.documentNo);
    }

    return () => dispatch(setIsProfileSubmitted(false));
  }, [profileData, setValue, isProfileSubmitted, dispatch]);

  const handleDateOfBirthChange = useCallback(
    (date) => {
      if (date instanceof Date && !isNaN(date)) {
        const dob = utils.formatDate(date);
        setValue("dateOfBirth", dob);
      }
    },
    [setValue]
  );

  const handleNomineeDateOfBirthChange = useCallback(
    (date) => {
      if (date instanceof Date && !isNaN(date)) {
        const nomineeDob = utils.formatDate(date);
        setValue("nominee.dateOfBirth", nomineeDob);
      }
    },
    [setValue]
  );

  const handleDoctypeChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSelectedDocumentType(value);
      setValue("nominee.documentType", value);
      setValue("nominee.documentTypeVal", value);
    },
    [setValue]
  );
  const handleProfileSubmit = useCallback(
    async (data) => {
      const payload = {
        dateOfBirth: data.dateOfBirth,
        phoneNumber: data.phoneNumber,

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
        await dispatch(setIsProfileSubmitted(true));
        reset();
      } catch (err) {
        console.error("imageuploaderr::", err);
      }
    },
    [dispatch, reset]
  );

  return (
    <form
      onSubmit={handleSubmit(handleProfileSubmit)}
      className="flex flex-col  gap-12 mx-auto w-full"
    >
      <div className="flex  ">
        <h1 className="text-xl font-bold">Please fill your data first</h1>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex pb-4 border-b-2 border-gray-200">
          <h2 className="text-base font-deca font-medium dark:text-gray-100 w-full">
            Basic Details
          </h2>
        </div>

        <div className="flex gap-12 pt-8 w-full md:flex-nowrap flex-wrap">
          <div className="flex flex-col gap-2 w-full md:w-6/12">
            <label
              htmlFor="userdob"
              className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
            >
              Date of birth <span className="text-red-700">*</span>
            </label>
            <DatePicker
              ref={dateOfBirthRef}
              id="userdob"
              name="userdob"
              placeholderText="Select Date"
              showIcon
              showYearDropdown
              showMonthDropdown
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-xs  rounded-lg"
              onChange={(date) => handleDateOfBirthChange(date)}
              disabled={isDisabled ? true : false}
              dropdownMode="select"
              maxDate={subYears(new Date(), 18)}
              minDate={subYears(new Date(), 100)}
              closeOnScroll={true}
              value={watch("dateOfBirth")}
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

            <DatePicker
              ref={nomineeDateofbirthRef}
              id="nomineedob"
              name="nomineedob"
              placeholderText="Select Date"
              showIcon
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              maxDate={subYears(new Date(), 18)}
              minDate={subYears(new Date(), 100)}
              value={watch("nominee.dateOfBirth")}
              closeOnScroll={true}
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              onChange={(date) => handleNomineeDateOfBirthChange(date)}
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
              {relationShip?.map((data, index) => (
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
              value={selectedDocumentType}
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
                disabled={isDisabled ? true : false}
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
            className=" uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-deca bg-slate-800 w-28 dark:text-gray-200 text-white font-bold whitespace-nowrap dark:bg-transparent dark:hover:bg-slate-700 hover:bg-black hover:text-white disabled:cursor-not-allowed"
            type="submit"
            disabled={isDisabled ? true : false}
          >
            {isLoading ? <Loading width="w-5" height="h-5" /> : "submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserProfile;
