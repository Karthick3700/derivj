import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPlans } from "@/redux/features/ui/uiSlice";
import { utils } from "@/utils";

const Modal = ({ showModal, onClose, plan }) => {
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

        <form className="flex flex-col gap-8 ">
          <div className="col-span-2 flex flex-col gap-1 relative">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="proof-id"
              required
            >
              Transanction Receipt
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="proof-id"
              type="file"
              required
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1 relative">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="transanction-id"
            >
              Transanction ID
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="transanction-id"
              placeholder="Enter transanction ID"
              type="text"
            />
          </div>
          <button
            className="w-max mt-2 mx-auto uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-deca bg-slate-800  dark:text-gray-200 text-white font-bold whitespace-nowrap dark:bg-transparent dark:hover:bg-slate-700 hover:bg-black hover:text-white"
            type="submit"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const plans = useSelector((state) => state?.local?.plans);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // useEffect(() => {
  //   const initiate = () => {
  //     dispatch(loadPlans());
  //   };
  //   initiate();
  // }, [dispatch]);
  const handleBuyClick = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };
  return (
    <Fragment>
      <div className="flex">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-col w-full justify-center py-8 gap-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 w-full px-6">
          <div className="flex flex-col items-center gap-4 justify-center bg-white dark:bg-gray-800 rounded-xl p-6 w-full h-auto shadow-lg transition-transform duration-400 hover:scale-105 border dark:border-white border-transparent">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 font-deca">
              Active Plans
            </h2>
            <p className="text-3xl font-bold text-gradient inline-flex items-center gap-2">
              0
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 justify-center bg-white dark:bg-gray-800 rounded-xl p-6 w-full h-auto shadow-lg transition-transform duration-400 hover:scale-105 border dark:border-white border-transparent">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 font-deca">
              Pending
            </h2>
            <p className="text-3xl font-bold text-gradient inline-flex items-center gap-2">
              <span>$</span>0
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 justify-center bg-white dark:bg-gray-800 rounded-xl p-6 w-full h-auto shadow-lg transition-transform duration-400 hover:scale-105 border dark:border-white border-transparent">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 font-deca">
              Processing
            </h2>
            <p className="text-3xl font-bold text-gradient inline-flex items-center gap-2">
              <span>$</span>0
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 justify-center bg-white dark:bg-gray-800 rounded-xl p-6 w-full h-auto shadow-lg transition-transform duration-400 hover:scale-105 border dark:border-white border-transparent">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 font-deca">
              Transfered
            </h2>
            <p className="text-3xl font-bold text-gradient inline-flex items-center gap-2">
              <span>$</span>0
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex border-b-2 py-4 border-gray-300">
            <h3 className="text-lg font-bold text-gray-500 dark:text-gray-300">
              Plans
            </h3>
          </div>
          {plans ? (
            <div className="container mx-auto px-4 py-16">
              <h4 className="text-base font-bold mb-8 text-center">
                Choose Your Trading Plan
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans?.map((data, index) => (
                  <div
                    key={index}
                    className="md:w-9/12 md:mx-auto bg-white dark:bg-gray-800 rounded-lg p-6 md:p-16 shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.075)] dark:shadow-lg transition-transform duration-500 hover:scale-105 border dark:border-white border-slate-400 flex flex-col gap-4 md:gap-8 relative overflow-hidden"
                  >
                    <h2 className="md:text-2xl text-lg font-bold mb-4 text-gray-900 dark:text-gray-200 font-deca uppercase">
                      {data?.name}
                    </h2>
                    <div className="flex items-center mb-4">
                      <span className="text-2xl md:text-5xl font-bold text-gray-900 dark:text-gray-200">
                        ${data?.price}
                      </span>
                      <span className="text-lg md:text-3xl font-bold text-gray-900 dark:text-gray-200">
                        /
                      </span>
                      <span className="text-lg md:text-2xl text-gray-700 ml-2 dark:text-gray-400">
                        ₹{data?.inrPrice}
                      </span>
                    </div>
                    <ul className="list-none text-base md:text-xl flex flex-col gap-2 md:gap-3 text-gray-700 dark:text-gray-400">
                      <li>Duration : {data?.validity} Month</li>
                      <li>Daily Returns {data?.return}%</li>
                    </ul>
                    <button
                      className="w-max mt-2 mx-auto uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-deca bg-slate-800  dark:text-gray-200 text-white font-bold whitespace-nowrap dark:bg-transparent dark:hover:bg-slate-700 hover:bg-black hover:text-white"
                      type="submit"
                      onClick={() => handleBuyClick(data)}
                    >
                      buy plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-40">
              <span className="text-slate-700">No active plans</span>
            </div>
          )}
        </div>
      </div>
      <Modal showModal={showModal} onClose={closeModal} plan={selectedPlan} />
    </Fragment>
  );
};

export default Dashboard;
