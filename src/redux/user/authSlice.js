import { localStorage } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isSignUp: false,
  user: null,
  token: null,
  isNew: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action?.payload;
      state.token = state.user?.token;
      localStorage.setAuthToken(state.token ? state.token : "");
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});
export const { start, success, login, logout, darkmode } = authSlice.actions;

export default authSlice.reducer;
