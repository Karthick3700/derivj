import React from "react";

const Success = ({tag}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-green-100 dark:bg-green-800 rounded-md shadow-md">
      <svg
        className="h-24 w-24 text-green-600 dark:text-green-300 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z"
        />
      </svg>
      <span className="text-lg font-semibold text-green-700 dark:text-green-300 text-center">
        Your {tag} details have been successfully verified!
      </span>
    </div>
  );
};

export default Success;
