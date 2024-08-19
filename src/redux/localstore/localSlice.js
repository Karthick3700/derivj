const { localStorage } = require("@/utils");
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isDarkMode: false,
  isNavOpen: false,
  showPassword: false,
  showConfirmpwd: false,
  loginShowpwd: false,
};

const localReducer = createSlice({
  name: "localstate",
  initialState,
  reducers: {
    darkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setTheme(state.isDarkMode ? "dark" : "light");

      const theme = state.isDarkMode;

      if (theme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    menuHandler: (state) => {
      state.isNavOpen = !state.isNavOpen;
    },
    showPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    showConfirmpwd: (state) => {
      state.showConfirmpwd = !state.showConfirmpwd;
    },
    loginShowPwd: (state) => {
      state.loginShowpwd = !state.loginShowpwd;
    },
  },
});

export const {
  darkMode,
  menuHandler,
  showPassword,
  showConfirmpwd,
  loginShowPwd,
} = localReducer.actions;

export default localReducer.reducer;
