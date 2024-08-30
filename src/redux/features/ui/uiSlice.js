import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupShowpwd: false,
  signupConfirmpwd: false,
  loginShowpwd: false,
  isMenuOpen: false,
  isLoading: false,
  error: null,
  plans: null,
  isDarkMode: false,
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
} = uiSlice.actions;

export default uiSlice;
