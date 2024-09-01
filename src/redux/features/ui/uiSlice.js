import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  signupShowpwd: false,
  signupConfirmpwd: false,
  loginShowpwd: false,
  isMenuOpen: false,
  isLoading: false,
  error: null,
  plans: null,
  isDarkMode: false,
  changeShowpwd: false,
  newShowpwd: false,
  newConfirmpwd: false,
  isProfileSubmitted: false,
  isKycSubmitted: false,
  isAddressSubmitted: false,
  isBankSubmitted: false,
  isProfileFetched: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleLoginShowpwd: (state) => {
      state.loginShowpwd = !state.loginShowpwd;
    },
    toggleSignupShowpwd: (state) => {
      state.signupShowpwd = !state.signupShowpwd;
    },
    toggleSignupConfirmpwd: (state) => {
      state.signupConfirmpwd = !state.signupConfirmpwd;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    updatePlansList: (state, action) => {
      state.plans = action.payload;
    },
    showOldpwd: (state) => {
      state.changeShowpwd = !state.changeShowpwd;
    },
    showNewpwd: (state) => {
      state.newShowpwd = !state.newShowpwd;
    },
    showConfirmnewpwd: (state) => {
      state.newConfirmpwd = !state.newConfirmpwd;
    },
    setIsProfileSubmitted: (state, action) => {
      state.isProfileSubmitted = action.payload;
    },
    setIsKycSubmitted: (state, action) => {
      state.isKycSubmitted = action.payload;
    },
    setIsAddressSubmitted: (state, action) => {
      state.isAddressSubmitted = action.payload;
    },
    setIsBanksubmitted: (state, action) => {
      state.isBankSubmitted = action.payload;
    },
    setIsProfileFetched: (state, action) => {
      state.isProfileFetched = action.payload;
    },
  },
});

export const {
  toggleMode,
  toggleSignupShowpwd,
  toggleSignupConfirmpwd,
  toggleLoginShowpwd,
  toggleMenu,
  openMenu,
  closeMenu,
  updatePlansList,
  showOldpwd,
  showNewpwd,
  showConfirmnewpwd,
  setIsAddressSubmitted,
  setIsBanksubmitted,
  setIsKycSubmitted,
  setIsProfileSubmitted,
  setIsProfileFetched,
} = uiSlice.actions;

export default uiSlice;
