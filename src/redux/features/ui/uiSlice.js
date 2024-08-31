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
  changeShowpwd: false,
  newShowpwd: false,
  newConfirmpwd: false,
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
} = uiSlice.actions;

export default uiSlice;
