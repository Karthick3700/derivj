import React, { Fragment, useCallback, useEffect } from "react";
import { CONST, localStorage, utils } from "@/utils";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, toggleMode } from "@/redux/local/localSlice";
import { useRouter } from "next/router";
import { logout } from "@/redux/auth/authSlice";

const HeaderAfterLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const dark = useSelector((state) => state.local?.isDarkMode);
  const menuOpen = useSelector((state) => state.local?.isMenuOpen);

  const handleMenuClick = useCallback(() => {
    dispatch(toggleMenu());
  }, [dispatch]);

  const darkModeHandler = useCallback(() => {
    const newTheme = !dark;
    dispatch(toggleMode());
    localStorage.setTheme(newTheme ? "dark" : "light");
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dispatch, dark]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    router.push(CONST.Routes.LOGIN);
    utils.handleSuccess(CONST.MSG.LOGOUT_SUCCESS);
  }, [dispatch, router, utils]);

  

  return (
    <Fragment>
      <header className="bg-white dark:bg-black bg-opacity-[75%] border-b dark:border-black transform backdrop-blur-md text-black dark:text-white z-50 sticky top-[0px] w-full h-[80px] px-6 md:px-10 flex items-center justify-between">
        <Link href={CONST.Routes.MAIN} className="flex items-center gap-2">
          <div>Logo</div>
          <div className="text-2xl font-semibold font-deca ml-2 italic text-black dark:text-white">
            derivJ
          </div>
        </Link>
        <div className="inline-flex gap-8 items-center justify-center">
          <button
            className="md:hidden dark:bg-transparent"
            onClick={darkModeHandler}
          >
            {utils.theme(40, 40)}
          </button>
          <button className="md:hidden" onClick={handleLogout}>
            {utils.LogoutIcon(36, 36, "text-black dark:text-white")}
          </button>
          {menuOpen ? (
            <Fragment>
              <button
                className="md:hidden dark:bg-transparent"
                onClick={handleMenuClick}
              >
                {utils.closeicon(32, 32)}
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <button className="md:hidden" onClick={handleMenuClick}>
                {utils.menubtn(32, 32)}
              </button>
            </Fragment>
          )}
        </div>

        <div className="hidden md:flex justify-between w-full max-w-[700px]">
          <ul className=" flex-col md:flex-row gap-4 flex">
            <li>
              <Link
                href=""
                className="relative flex items-center gap-2 cursor-pointer rounded dark:hover:bg-secondary-dark hover:bg-gray-100 p-4 dark:hover:text-black transition-all text-lg font-semibold"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="relative flex items-center gap-2 cursor-pointer rounded dark:hover:bg-secondary-dark hover:bg-gray-100 dark:hover:text-black p-4 transition-all text-lg font-semibold"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href={CONST.Routes.PROFILE}
                className="relative flex items-center gap-2 cursor-pointer rounded dark:hover:bg-secondary-dark hover:bg-gray-100 dark:hover:text-black p-4 transition-all text-lg font-semibold"
              >
                Profile
              </Link>
            </li>
          </ul>
          <div className="flex gap-4">
            <button onClick={darkModeHandler}>{utils.theme(32, 32)}</button>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handleLogout}
                className=" uppercase px-6 py-3 border rounded-full text-sm tracking-widest font-semibold bg-black dark:bg-white dark:text-black text-white whitespace-nowrap"
              >
                log out
              </button>
            </div>
          </div>
        </div>
      </header>
      {menuOpen && (
        <Fragment>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 ease-in-out"></div>
          <div
            className={`fixed top-[80px] left-0 w-full z-20 bg-white dark:bg-black transform transition-transform duration-300 ease-in-out ${
              menuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="flex flex-col gap-8 items-center justify-center min-h-[90dvh] ">
              <Link
                href=""
                className="text-lg font-semibold text-black dark:text-white mb-4"
                onClick={handleMenuClick}
              >
                About
              </Link>
              <Link
                href=""
                className="text-lg font-semibold text-black dark:text-white mb-4"
                onClick={handleMenuClick}
              >
                Contact
              </Link>
              <Link
                href={CONST.Routes.PROFILE}
                className="relative flex items-center gap-2 cursor-pointer rounded dark:hover:bg-secondary-dark hover:bg-gray-100 dark:hover:text-black p-4 transition-all text-lg font-semibold"
              >
                Profile
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default HeaderAfterLogin;
