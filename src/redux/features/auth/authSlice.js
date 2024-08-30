import { createSlice } from "@reduxjs/toolkit";
import { localStorage } from "@/utils";

const initialState = {
  isLoggedIn: false,
  isMounted: null,
  isLoading: false,
  user: null,
  token: localStorage.getAuthToken() || null,
  isNew: false,
  step: null,
  commonData: {},
  error: null,
  userRoles: [],
  userProfile: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMount: (state, action) => {
      state.isMounted = action.payload;
    },
    updateStep: (state, action) => {
      state.step = action.payload;
    },

    loading: (state, action) => {
      state.isLoading = action?.payload;
    },
    login: (state, action) => {
      const payload = action.payload;
      state.isLoggedIn = true;
      state.user = payload;
      state.isNew = payload.isNew || false;
      state.token = payload.accessToken || null;
      state.step = payload.step;

      localStorage.setAuthUser(state.user);
      localStorage.setAuthToken(state.token);
      localStorage.setAuthUserIsNew(state.isNew);
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.isNew = false;
      state.step = null;
      localStorage.removeAuthUser();
    },

    loadCommonData: (state, action) => {
      state.commonData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateUserRoles: (state, action) => {
      state.userRoles = action.payload;
    },

    refreshToken: (state, action) => {
      state.token = action.payload;
      localStorage.setAuthToken(state.token);
    },
  },
});

export const {
  setMount,
  login,
  logout,
  loadCommonData,
  loading,
  setError,
  updateUserRoles,
  refreshToken,
  updateStep,
} = authSlice.actions;

export default authSlice;
