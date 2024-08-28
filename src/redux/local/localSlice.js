import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  signupShowpwd: false,
  signupConfirmpwd: false,
  loginShowpwd: false,
  isMenuOpen: false,
  isKycSubmitted: false,
  isAddressSubmitted: false,
  isBankSubmitted: false,
  isProfileSubmitted: false,
};

const localSlice = createSlice({
  name: "local",
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
    setIsKycSubmitted: (state, action) => {
      state.isKycSubmitted = action.payload;
    },
    setIsAddressSubmitted: (state, action) => {
      state.isAddressSubmitted = action.payload;
    },
    setIsProfileSubmitted: (state, action) => {
      state.isProfileSubmitted = action.payload;
    },
    setIsBankSubmitted: (state, action) => {
      state.isBankSubmitted = actioin.payload;
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
  setIsProfileSubmitted,
  setIsKycSubmitted,
  setIsAddressSubmitted,
  setIsBankSubmitted,
} = localSlice.actions;

export default localSlice.reducer;
