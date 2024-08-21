import React, { Fragment } from "react";

const Dashboard = () => {
  return (
    <Fragment>
      <div className="flex">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-col w-full justify-center py-8 gap-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 w-full px-6">
          <div className="flex flex-col items-center gap-4 justify-center bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/40 dark:border-gray-200/60 rounded-xl p-6 w-full h-auto shadow-xl transition transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 font-deca">
              Active Plans
            </h2>
            <p className="text-3xl font-bold text-gradient inline-flex items-center gap-2">
              0
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 justify-center bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/40 dark:border-gray-200/60 rounded-xl p-6 w-full h-auto shadow-xl transition transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 font-deca">
              Pending
            </h2>
            <p className="text-3xl font-bold text-gradient inline-flex items-center gap-2">
              <span>$</span>0
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 justify-center bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/40 dark:border-gray-200/60 rounded-xl p-6 w-full h-auto shadow-xl transition transform hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 font-deca">
              Processing
            </h2>
            <p className="text-3xl font-bold text-gradient inline-flex items-center gap-2">
              <span>$</span>0
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 justify-center bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/40 dark:border-gray-200/60 rounded-xl p-6 w-full h-auto shadow-xl transition transform hover:scale-105">
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
          <div className="flex items-center justify-center w-full h-40">
            <span className="text-slate-700">No active plans</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
