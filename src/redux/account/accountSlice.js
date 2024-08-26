import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserProfile,
  submitUserProfile,
  uploadProfileImage,
} from "./accountBuilder";

const initialState = {
  isLoading: false,
  imageId: null,
  imagePath: null,
  profileImage: null,
  profileData: null,
  error: null,
  isDisabled: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    uploadImageData: (state, action) => {
      state.profileImage = action.payload;
      state.imagePath = state.profileImage?.imagePath;
      state.imageId = state.profileImage?._id;
    },
    uploadUserProfile: (state, action) => {
      state.profileData = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.profileImage = action.payload;
        state.imagePath = action.payload?.imagePath;
        state.imageId = action.payload?._id;
        state.isLoading = false;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(submitUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(submitUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileData = action.payload;
        state.isDisabled = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { uploadImageData, uploadUserProfile, clearError } =
  accountSlice.actions;

export default accountSlice.reducer;
