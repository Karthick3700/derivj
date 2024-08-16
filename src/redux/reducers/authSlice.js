import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  isLoggedIn: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    mode: (state) => (state.isDarkMode = !state.isDarkMode),
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
