import { uploadImage } from "@/redux/features/account/accountBuilder";
import ImageFallback from "@/screens/Profile/verify-profile/ImageFallback";
import { service } from "@/services";
import { PAYMENT } from "@/services/api-url.service";
import { CONST, utils } from "@/utils";
import { transanctionSchema } from "@/utils/validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { QRCodeSVG } from "qrcode.react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Loading from "./loader";
import { setPaidPlan } from "@/redux/features/account/accountSlice";

const PlanModal = ({ showModal, onClose, plan }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ mode: "all", resolver: yupResolver(transanctionSchema) });

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

  const paymentURL = `upi://pay?pa=${plan?.upiId}&am=${plan?.inrPrice}&cu=INR`;

  const handleImageChange = useCallback(async (e) => {
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
      setImage(file);
    }
  }, []);

  const handleUploadImage = useCallback(async () => {
    try {
      const response = await dispatch(uploadImage(image));
      setValue("transactionProofId", response?.payload?._id);
      setPreview(null);
      setImage(null);
    } catch (error) {
      console.log("Error from image upload::", error);
    }
  }, [dispatch, image, setValue]);

  const handleTransanctionSubmit = useCallback(
    async (data) => {
      console.log("Form submitted with data:", data);

      setLoading(true);
      const { transactionId, transactionProofId } = data;
      const planId = plan?._id;

      const payload = {
        transactionId,
        transactionProofId,
        planId,
      };

      try {
        console.log("payload::", payload);
        const response = await service.post(PAYMENT, payload);

        if (response?.statusCode === CONST.status.SUCCESS) {
          dispatch(setPaidPlan(response?.doc));
          utils.showSuccessMsg(response?.message);
          reset();
          setLoading(false);
          onClose();
        } else {
          console.error("API Response Error:", response);
          utils.showErrorMsg(response?.message || "Something went wrong!");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error occurred during API call:", error);
        utils.showErrorMsg(error?.message || "An unexpected error occurred.");
      }
    },
    [, dispatch, plan, reset, onClose]
  );

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md relative">
        <button
          className="w-10 h-10 absolute right-[10px] top-6 rounded-full bg-slate-50 dark:bg-white flex items-center justify-center"
          onClick={onClose}
        >
          {utils.closeicon(20, 20)}
        </button>
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-200">
          Buy {plan?.name}
        </h2>
        <div className="mx-auto w-full flex items-center justify-center my-8">
          <QRCodeSVG size={180} value={paymentURL} />
        </div>
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(handleTransanctionSubmit)}
        >
          <div className="col-span-2 flex flex-col gap-1 relative">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="proof-id"
            >
              Transaction Receipt
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="proof-id"
              type="file"
              onChange={handleImageChange}
            />
            {errors?.transactionProofId && (
              <p className="text-red-600 dark:text-red-400 mt-2">
                {errors?.transactionProofId?.message}
              </p>
            )}
            {preview && (
              <ImageFallback sourceurl={preview} onClick={handleUploadImage} />
            )}
          </div>
          <div className="col-span-2 flex flex-col gap-1 relative">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="transanction-id"
            >
              Transaction ID
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="transanction-id"
              placeholder="Enter transaction ID"
              type="text"
              {...register("transactionId")}
            />
            {errors?.transactionId && (
              <p className="text-red-600 dark:text-red-400 mt-2">
                {errors?.transactionId?.message}
              </p>
            )}
          </div>
          <button
            className="w-max mt-2 mx-auto uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-deca bg-slate-800 dark:text-gray-200 text-white font-bold whitespace-nowrap dark:bg-transparent dark:hover:bg-slate-700 hover:bg-black hover:text-white"
            type="submit"
          >
            {loading ? <Loading width="w-6" height="h-6" /> : "submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlanModal;
