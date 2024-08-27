import React from "react";

const BankDetails = () => {
  return (
    <form className="flex flex-col  gap-10 mx-auto w-full">
      <div className="flex ">
        <h1 className="text-xl font-bold">Bank Details</h1>
      </div>

      <div className="flex flex-col w-full gap-8">
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <label
              htmlFor="bank-name"
              className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
            >
              Bank Name<span className="text-red-700">*</span>
            </label>
            <input
              id="bank-name"
              name="bank-name"
              placeholder="Enter Bank Name"
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              type="text"
            />
          </div>
          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <label
              htmlFor="beneficiary-name"
              className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
            >
              Beneficiary Name<span className="text-red-700">*</span>
            </label>
            <input
              id="beneficiary-name"
              name="beneficiary-name"
              placeholder="Enter Benificiary Name"
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              type="text"
            />
          </div>
        </div>
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <label
              htmlFor="accountno"
              className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
            >
              Account Number<span className="text-red-700">*</span>
            </label>
            <input
              id="accountno"
              name="accountno"
              placeholder="Enter Account No"
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              type="string"
            />
          </div>
          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <label
              htmlFor="ifsc"
              className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
            >
              IFSC Code<span className="text-red-700">*</span>
            </label>
            <input
              id="ifsc"
              name="ifsc"
              placeholder="Enter IFSC Code"
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              type="text"
            />
          </div>
        </div>
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="relative w-full md:w-6/12 flex flex-col gap-2">
            <label
              htmlFor="upiid"
              className="bg-transparent rounded-b-sm  pt-2 pr-2 pb-1 pl-2 -mt-3 mr-0 mb-0 ml-2 font-semibold text-slate-700   dark:text-gray-400 "
            >
              UPI ID<span className="text-red-700">*</span>
            </label>
            <input
              id="upiid"
              name="upiid"
              placeholder="Enter UPI ID"
              className="appearance-none block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm  rounded-lg"
              type="string"
            />
          </div>
        </div>
        <div className="flex gap-12 pt-8 w-full">
          <button
            className=" uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-deca bg-footer-gradient bg-cover bg-center dark:text-gray-200 text-black font-bold whitespace-nowrap dark:bg-none hover:bg-none hover:bg-black hover:text-white"
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default BankDetails;
