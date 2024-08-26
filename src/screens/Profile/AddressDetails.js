import React from "react";

const AddressDetails = () => {
  return (
    <form className="flex flex-col  gap-4 mx-auto w-full">
      <div className="flex  ">
        <h1 className="text-xl font-bold">Address Details</h1>
      </div>

      <div className="flex flex-col w-full gap-6">
        <div className="grid grid-cols-1 md:grid-cols-6 space-y-6 py-8 h-full w-full items-center">
          <div className="col-span-2">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload Image
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <p className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 ">
              Document No<span className="text-red-700">*</span>
            </p>
            <input
              placeholder="Enter Document No"
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              type="number"
            />
          </div>
          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <p className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 ">
              Re-Enter Document No<span className="text-red-700">*</span>
            </p>
            <input
              placeholder="Re-Enter Document No"
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              type="number"
            />
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

export default AddressDetails;
