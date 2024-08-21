import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  signupShowpwd: false,
  signupConfirmpwd: false,
  loginShowpwd: false,
  isMenuOpen: false,
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
} = localSlice.actions;

export default localSlice.reducer;
