import { Datepicker, Label, Select } from "flowbite-react";
import Image from "next/image";
import React from "react";
import defaultui from "../../../public/default-ui.png";

const UserProfile = () => {
  return (
    <div className="grid gap-12    mx-auto">
      <div className="flex">
        <h1 className="text-xl font-bold">Please fill your data first</h1>
      </div>

      <div className="flex flex-col ">
        <div className="flex pb-4 border-b-2 border-gray-200">
          <h2 className="text-base font-deca font-medium dark:text-gray-100 w-full">
            Basic Details
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 py-8 h-full w-full items-center">
          <div className="w-full h-full col-span-1">
            <div className="w-36 h-36 border-2 rounded-full  flex items-center justify-center ">
              <Image
                src={defaultui}
                className="w-full h-full"
                alt="User profile image"
                loading="lazy"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload file
            </label>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            />
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
            <Datepicker id="userdob" className="custom-datepicker" />
          </div>

          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <p className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 ">
              Mobile No <span className="text-red-700">*</span>
            </p>
            <input
              placeholder="Enter mobile number"
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              type="number"
            />
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
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2 w-full md:w-6/12">
            <label
              htmlFor="nomineedob"
              className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
            >
              Date of birth <span className="text-red-700">*</span>
            </label>
            <Datepicker id="nomineedob" className="custom-datepicker" />
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
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              type="email"
            />
          </div>
          <div className="flex w-full md:w-6/12 flex-col">
            <div className="mb-2 inline-flex gap-1">
              <Label htmlFor="realtionship" value="Select your country" />
              <span className="text-red-700">*</span>
            </div>
            <Select id="relationship" required className="custom-select">
              <option value="" disabled selected>
                Select Relationship
              </option>
              <option>Father</option>
              <option>Mother</option>
              <option>Brother</option>
              <option>Son</option>
              <option>Daughter</option>
            </Select>
          </div>
        </div>
        <div className="flex gap-12 pt-8 w-full md:flex-nowrap flex-wrap">
          <div className="flex w-full md:w-6/12 flex-col">
            <div className="mb-2 inline-flex gap-1">
              <Label htmlFor="documenttype" value="Document Type" />
              <span className="text-red-700">*</span>
            </div>
            <Select id="documenttype" required className="custom-select">
              <option value="" disabled selected>
                Select Document
              </option>
              <option>Aadhar Card</option>
              <option>Pan Card</option>
            </Select>
          </div>
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
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              type="email"
            />
          </div>
        </div>
        <div className="flex gap-12 pt-8 w-full">
          <button className=" uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-deca bg-footer-gradient bg-cover bg-center dark:text-gray-200 text-black font-bold whitespace-nowrap dark:bg-none">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
