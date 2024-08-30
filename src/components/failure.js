import React from "react";

const Failure = ({ tag }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-red-100 dark:bg-red-800 rounded-md shadow-md">
      <svg
        className="h-24 w-24 text-red-600 dark:text-red-300 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <span className="text-lg font-semibold text-red-700 dark:text-red-300 text-center">
        Your {tag} details could not be verified. Please try again.
      </span>
    </div>
  );
};

export default Failure;
