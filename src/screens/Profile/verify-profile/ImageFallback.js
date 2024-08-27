import Image from "next/image";
import React from "react";

const ImageFallback = ({ onClick, sourceurl }) => {
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
        className="w-max uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-deca bg-footer-gradient bg-cover bg-center dark:text-gray-200 text-black font-bold whitespace-nowrap dark:bg-none hover:bg-none hover:bg-black hover:text-white"
        type="button"
        onClick={onClick}
      >
        Submit
      </button>
    </div>
  );
};

export default ImageFallback;
