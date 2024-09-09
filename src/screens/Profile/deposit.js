import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Deposit = () => {
  const dispatch = useDispatch();
  const { withdraw, isLoading } = useSelector((state) => state?.profile);
  return (
    <div className="flex flex-col gap-6 p-4 w-full h-full">
      <div className="flex items-start">
        <h1 className="text-xl font-bold">Your Deposits</h1>
      </div>
    </div>
  );
};

export default Deposit;
