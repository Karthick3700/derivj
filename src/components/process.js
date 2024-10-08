import React from "react";

const Processing = ({ tag }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
      <svg
        className="animate-spin h-24 w-24 text-gray-600 dark:text-gray-300 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center">
        Your {tag} verification is processing...
      </span>
    </div>
  );
};

export default Processing;
