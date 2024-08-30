import Loading from "@/components/loader";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const ImageFallback = ({ onClick, sourceurl }) => {
  const isLoading = useSelector((state) => state?.profile?.isLoading);
  console.log("isLoading", isLoading);
  return (
    <div className="md:col-span-4 flex flex-col gap-4">
      <div className="w-[230px] h-[150px] overflow-hidden">
        <Image
          src={sourceurl}
          loading="lazy"
          width={230}
          height={150}
          alt="kyc proof image"
        />
      </div>
      <button
        className=" uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-deca bg-slate-800 w-28 dark:text-gray-200 text-white font-bold whitespace-nowrap dark:bg-transparent dark:hover:bg-slate-700 hover:bg-black hover:text-white"
        type="button"
        onClick={onClick}
      >
        {isLoading ? <Loading width="w-5" height="h-5" /> : "submit"}
      </button>
    </div>
  );
};

export default ImageFallback;
