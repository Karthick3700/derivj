import { logout } from "@/redux/auth/authSlice";
import { CONST, utils } from "@/utils";
import React, { Fragment, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Dashboard from "./dashboard";
import UserProfile from "./profile";
import { useRouter } from "next/router";
import ChangePassword from "./changePassword";

const profileTabLinks = [
  { name: "Dashboard", key: "dashboard", icon: utils.dashboard(20, 20) },
  { name: "Profile", key: "profile" },
  { name: "KYC", key: "verify-kyc" },
  { name: "Address", key: "address" },
  { name: "Bank", key: "bank" },
  { name: "Subscription", key: "subscription" },
  { name: "Deposit", key: "deposit" },
  { name: "Withdraw", key: "withdraw" },
  { name: "Change Password", key: "change-password" },
];

const tabContent = {
  dashboard: <Dashboard />,
  profile: <UserProfile />,
  "verify-kyc": "This is the KYC Verification tab content.",
  address: "This is the Address tab content.",
  bank: "This is the Bank Details tab content.",
  subscription: "This is the Subscription tab content.",
  deposit: "This is the Deposit tab content.",
  withdraw: "This is the Withdraw tab content.",
  "change-password": <ChangePassword />,
};

const ProfileScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(profileTabLinks[1].key);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    utils.handleSuccess(CONST.MSG.LOGOUT_SUCCESS);
    router.push(CONST.Routes.LOGIN);
  }, [dispatch]);

  const handleTabClick = useCallback((key) => {
    setActiveTab(key);
  }, []);

  return (
    <Fragment>
      <div className="container mx-auto py-12">
        <div className="md:flex">
          <ul className="flex-column backdrop-blur-md bg-opacity-[75%] text-sm py-4 font-medium bg-gray-50 rounded-sm  md:me-4 mb-4 md:mb-0 w-2/12  dark:bg-gray-800">
            {profileTabLinks.map((tablink) => (
              <li key={tablink.key} className="w-full">
                <button
                  onClick={() => handleTabClick(tablink.key)}
                  className={`inline-flex items-center px-4 py-3  w-full gap-2  text-normal ${
                    activeTab === tablink.key
                      ? "bg-footer-gradient bg-center font-bold bg-cover dark:text-black"
                      : "dark:text-gray-100 font-light"
                  }`}
                >
                  {tablink.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="inline-flex gap-2 bg-transparent px-4 py-3  font-bold bg-gradient-to-l from-red-500 to-black bg-clip-text text-transparent"
              >
                {utils.LogoutIcon(20, 20, "text-white")}
                <span>Log out</span>
              </button>
            </li>
          </ul>
          <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            {tabContent[activeTab]}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileScreen;
