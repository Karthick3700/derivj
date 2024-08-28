import { utils } from "@/utils";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full relative p-8 lg:p-20 mt-20 bg-footer-gradient dark:bg-none dark:border-t-white dark:border-t-[1px]  bg-cover bg-center rounded-t-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-4">
        <div className="flex flex-col gap-4 w-full md:w-5/6 col-span-1 ">
          <div className="flex items-center gap-2 md:ps-4 w-max">
            {utils.Logo()}
            <div className="text-xl md:text-2xl font-semibold font-deca  italic text-black dark:text-white">
              derivJ
            </div>
          </div>
          <p className="text-sm text-black dark:text-gray-300">
            derivJ is the global crypto exchange where users can Trade Bitcoin
            and other cryptos in an authentic, reliable, and encrypted class of
            system.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 col-span-2 md:gap-4 gap-12">
          <div className="flex flex-col justify-start items-start gap-8">
            <h4 className="text-2xl font-bold text-black dark:text-white">
              Menu
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="text-lg font-semibold text-black dark:text-white">
                <Link href="#">Contact us</Link>
              </li>
              <li className="text-lg font-semibold text-black dark:text-white">
                <Link href="#">Terms of use</Link>
              </li>
              <li className="text-lg font-semibold text-black dark:text-white">
                <Link href="#">Privacy policy</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-start items-start gap-8">
            <h4 className="text-2xl inline-flex gap-4 font-bold text-black dark:text-white">
              <span className="italic">derivJ</span> News Letter
            </h4>
            <div className="flex flex-col gap-4">
              <p className="text-black dark:text-gray-300">
                Subscribe with derivJ to get the latest coin listings, market
                data updates, contest alerts, news, and more.
              </p>
              <div className="inline-flex gap-2">
                <input
                  placeholder="Enter your email"
                  type="text"
                  className="border-[1px] rounded-sm border-[#dee2e6] dark:border-gray-600 px-2 text-black dark:text-white bg-white dark:bg-gray-800"
                />
                <button className="px-4 py-2 border rounded-full text-normal font-semibold bg-black dark:bg-white dark:text-black text-white whitespace-nowrap">
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
