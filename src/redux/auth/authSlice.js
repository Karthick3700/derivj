import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CONST, localStorage, utils } from "@/utils";
import { service } from "@/services";
import { USER_PROFILE } from "@/services/api-url.service";

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.get(USER_PROFILE);
      console.log("fetchuserresponse::", response);
      if (response.statusCode === CONST.status.SUCCESS) {
        utils.handleSuccess(response?.message);
        return response.doc;
      } else {
        utils.handleError(response?.message);
      }
    } catch (err) {
      return rejectWithValue(err?.message || err);
    }
  }
);

const initialState = {
  isMounted: null,
  isLoading: false,
  isLoggedIn: false,
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
  name: "auth",
  initialState,
  reducers: {
    setMount: (state, action) => {
      state.isMounted = action.payload;
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
      state.step = payload.step || null;

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = action.payload;
        
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
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
} = authSlice.actions;

export default authSlice.reducer;
