import React, { useEffect, useState } from "react";
import ImageFallback from "./ImageFallback";
import { useDispatch, useSelector } from "react-redux";
import { service } from "@/services";
import { UPLOAD_IMAGE } from "@/services/api-url.service";
import { CONST, utils } from "@/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { KYCSchema } from "@/utils/validator";
import { updateKYC } from "@/redux/account/accountBuilder";

const KYCIDetails = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "all",
    resolver: yupResolver(KYCSchema),
  });
  console.log("kycvalues::", watch());

  const handleuploadImage = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await service.imageUpload(UPLOAD_IMAGE, formData);
      if (response?.statusCode === CONST.status.SUCCESS) {
        utils.showSuccessMsg(response?.message);
        setValue("documentId", response?.doc?._id);
        setPreview(false);
        console.log("reponseupload::", response);
      } else {
        console.log(response?.message);
      }
    } catch (error) {
      console.log("Error::", error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > utils.fileSize()) {
        utils.showErrorMsg("File size exceeds the allowed limit.");
        return;
      }

      if (!utils.imageFilevalidation(file)) {
        utils.showErrorMsg("Invalid file type, please upload a valid image.");
        return;
      }
      file ? setImage(file) : setImage(null);
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const documentType = useSelector((state) => state?.profile?.documentType);
  console.log("documentType::", documentType);

  const handleKYCSubmit = async (data) => {
    console.log("data::", data);
    const { documentId, documentNo } = data;
    const payload = {
      documentId,
      documentType,
      documentNo,
    };
    try {
      await dispatch(updateKYC(payload));
      reset();
    } catch (error) {
      console.log("error::", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleKYCSubmit)}
      className="flex flex-col  gap-4 mx-auto w-full"
    >
      <div className="flex  ">
        <h1 className="text-xl font-bold">KYC Details</h1>
      </div>

      <div className="flex flex-col w-full gap-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-x-12 gap-y-6 py-8 h-full w-full items-center">
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
            <ImageFallback sourceurl={preview} onClick={handleuploadImage} />
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <label
              htmlFor="documentno"
              className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
            >
              Document No<span className="text-red-700">*</span>
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
              Re-Enter Document No<span className="text-red-700">*</span>
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
            className=" uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-deca bg-footer-gradient bg-cover bg-center dark:text-gray-200 text-black font-bold whitespace-nowrap dark:bg-none hover:bg-none hover:bg-black hover:text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default KYCIDetails;
