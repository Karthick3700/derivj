import React from "react";

const Growth = () => {
  return (
    <section className="bg-amber-50 dark:bg-[#1A1D23] p-10">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 place-items-start  gap-12 md:place-items-center ">
          <div className="flex justify-center items-center">
            <h2 className="text-3xl font-bold text-[#6B3106] dark:text-[#F7D2C4]">
              Fastest Growing Network
            </h2>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-white dark:bg-gradient-to-r dark:from-[#2C2F33] dark:to-[#24272B]">
            <span className="text-4xl font-deca font-bold text-[#6B3106] dark:text-[#F7D2C4]">
              $ 657
            </span>
            <span className="text-lg font-bold text-slate-800 dark:text-[#C7C5B8]">
              Quarterly volume traded
            </span>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-white dark:bg-gradient-to-r dark:from-[#2C2F33] dark:to-[#24272B]">
            <span className="text-4xl font-deca font-bold text-[#6B3106] dark:text-[#F7D2C4]">
              $ 100+
            </span>
            <span className="text-lg font-bold text-slate-800 dark:text-[#C7C5B8]">
              Countries supported
            </span>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-white dark:bg-gradient-to-r dark:from-[#2C2F33] dark:to-[#24272B]">
            <span className="text-4xl font-deca font-bold text-[#6B3106] dark:text-[#F7D2C4]">
              $ 56M+
            </span>
            <span className="text-lg font-bold text-slate-800 dark:text-[#C7C5B8]">
              Verified users
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Growth;
