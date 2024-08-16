import React from "react";

const listReasons = [
  {
    title: "Secure storage",
    description:
      "Safeguard your digital assets with our state-of-the-art secure storage solution. Fortified by advanced encryption, your crypto holdings are shielded in a fortress of cutting-edge technology.",
  },
  {
    title: "Industry best practices",
    description:
      "Elevate your crypto journey with industry best practices. Our platform adheres to the highest standards, ensuring transparency, security, and compliance. Experience crypto at its finest.",
  },
  {
    title: "Protected by insurance",
    description:
      "Your assets, our priority. Rest easy knowing your investments are protected by insurance. We provide an additional layer of security, ensuring your peace of mind in the volatile crypto landscape.",
  },
];

const Reasons = () => {
  return (
    <section className="container mx-auto mt-6 md:mt-20">
      <div className="flex justify-center items-center">
        <h2 className="text-3xl lg:text-6xl font-extrabold dark:text-[#F7D2C4] text-center">
          Why you should choose Crypto
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:place-items-center justify-center  gap-8 mt-16">
        {listReasons.map((reason, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-start h-full p-8 md:px-14 md:py-12 bg-white dark:bg-gradient-to-r dark:from-[#2C2F33] dark:to-[#24272B] shadow-md rounded-xl"
          >
            <div className="flex flex-col  gap-4 justify-center items-center">
              <h4 className="text-2xl font-bold text-[#6B3106] dark:text-[#F7D2C4]">
                {reason.title}
              </h4>

              <p className="text-lg text-slate-800 dark:text-[#C7C5B8]">
                {reason.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reasons;