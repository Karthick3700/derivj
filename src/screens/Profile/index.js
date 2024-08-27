"use client";
import React, { Fragment, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CONST, utils } from "@/utils";
import UserProfile from "./verify-profile/profile";
import KYCIDetails from "./verify-profile/KYCIDetails";
import AddressDetails from "./verify-profile/AddressDetails";
import BankDetails from "./verify-profile/BankDetails";
import { useRouter } from "next/router";
import { logout } from "@/redux/auth/authSlice";
import Dashboard from "./dashboard";

const profileTabLinks = [
  { name: "Dashboard", key: "dashboard", icon: utils.DashboardIcon(20, 20) },
  { name: "Profile", key: "profile", icon: utils.ProfileIcon(20, 20) },
  { name: "KYC", key: "verify-kyc", icon: utils.KYCIcon(20, 20) },
  { name: "Address", key: "address", icon: utils.AddressIcon(20, 20) },
  { name: "Bank", key: "bank", icon: utils.BankIcon(20, 20) },
  {
    name: "Subscription",
    key: "subscription",
    icon: utils.SubscribeIcon(20, 20),
  },
  { name: "Deposit", key: "deposit", icon: utils.DepositIcon(20, 20) },
  { name: "Withdraw", key: "withdraw", icon: utils.WithdrawIcon(20, 20) },
  {
    name: "Change Password",
    key: "change-password",
    icon: utils.ChangePwdIcon(20, 20),
  },
];

const ProfileScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state?.account?.profile);
  const step = useSelector((state) => state?.user?.step);
  const { key } = router.query;

  useEffect(() => {
    if (!key) {
      router.replace("/profile?key=profile");
    }
  }, [key, router]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    utils.showSuccessMsg(CONST.MSG.LOGOUT_SUCCESS);
    router.push(CONST.Routes.LOGIN);
  }, [dispatch, router]);

  const handleTabClick = useCallback(
    (key) => {
      if (
        (key === "profile" && step === 0) ||
        (key === "verify-kyc" && step < CONST.VERIFY_KYC_STEPS.KYC_DETAILS) ||
        (key === "address" && step < CONST.VERIFY_KYC_STEPS.ADDRESS_DETAILS) ||
        (key === "bank" && step < CONST.VERIFY_KYC_STEPS.BANK_DETAILS)
      ) {
        utils.showErrorMsg(
          "Please complete the previous steps before proceeding."
        );
        return;
      }
      router.push(`/profile?key=${key}`);
    },
    [step, router]
  );

  const renderTabContent = () => {
    switch (key) {
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <UserProfile />;
      case "verify-kyc":
        return <KYCIDetails />;
      case "address":
        return <AddressDetails />;
      case "bank":
        return <BankDetails />;
      case "subscription":
        return "Coming soon...";
      case "deposit":
        return "Coming soon...";
      case "withdraw":
        return "Coming soon...";
      case "change-password":
        return "Coming soon...";
      default:
        return <Dashboard />;
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto py-12">
        <div className="flex gap-2 md:gap-6">
          <div>
            <ul className="w-max md:w-44 flex flex-col backdrop-blur-md bg-opacity-[75%] text-sm py-3 font-medium bg-gray-50 rounded-sm dark:bg-gray-800">
              {profileTabLinks.map((tablink) => (
                <li key={tablink.key} className="w-full py-2">
                  <button
                    onClick={() => handleTabClick(tablink.key)}
                    className={`inline-flex items-center justify-center md:justify-start p-2 w-full gap-2 text-normal ${
                      key === tablink.key
                        ? "bg-footer-gradient bg-center font-bold bg-cover dark:bg-none dark:border-y-2 dark:border-white dark:text-amber-400"
                        : "dark:text-gray-100 font-light"
                    }`}
                  >
                    {tablink.icon}
                    <span className="hidden md:block">{tablink.name}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="inline-flex gap-2 items-center justify-center md:justify-start bg-transparent px-2 py-3 font-bold bg-gradient-to-l from-red-500 to-black bg-clip-text text-transparent dark:bg-none dark:text-gray-100"
                >
                  {utils.logoutsvg(24, 24)}
                  <span className="hidden md:block">Log out</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileScreen;
