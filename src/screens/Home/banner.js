import Image from "next/image";
import React from "react";
import bannerimage from "@/styles/assets/images/home/banner-img.jpg";

const Banner = () => {
  return (
    <div className="container relative mx-auto mb-12 dark:bg-black w-full  overflow-hidden   sm:rounded-[24px] dark:rounded-none md:mt-10  py-8 md:py-0">
      <div className="absolute top-0 left-0 opacity-70 dark:bg-none h-full w-full bg-cover bg-center bg-banner-gradient bg-white/10 backdrop-blur-lg shadow-lg border border-white/30"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 py-8 px-6 lg:py-12 lg:px-6 place-items-center relative h-full gap-12 md:gap-6">
        <div className="grid place-items-center p-6">
          <div className="flex justify-center items-center w-full h-auto relative overflow-hidden rounded-lg bg-[#f7f8fc]">
            <Image loading="lazy" alt="trading ui" src={bannerimage} />
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:gap-12 items-start justify-center h-full z-10 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-semibold font-deca text-black leading-tight dark:text-[#e6edf3]">
            Grow Your Wealth with Daily Returns
          </h1>
          <p className="text-base lg:text-lg font-sans font-semibold text-black dark:text-[#8d96a0]">
            Invest today and watch your savings grow with guaranteed daily
            returns. Simple, transparent, and rewarding.
          </p>
          <div className="flex p-4 lg:p-6 glassmorphism w-full lg:w-10/12 min-h-[36px]">
            <div className="flex w-full lg:w-9/12 mx-auto">
              <span className="text-xl lg:text-3xl font-bold text-center dark:text-[#e6e6e6]">
                Trading for Anyone. Anywhere. Anytime.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
