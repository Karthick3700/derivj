import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserProfile,
  submitUserProfile,
  updateAddress,
  updateBank,
  updateKYC,
  uploadProfileImage,
  handlePending,
  handleFulfilled,
  handleRejected,
} from "./accountBuilder";

const initialState = {
  isLoading: false,
  imageId: null,
  imagePath: null,
  profileImage: null,
  profileData: null,
  error: null,
  isDisabled: false,
  kyc: null,
  address: null,
  bank: null,
  documentType: null,
  updatedStep: null,
  isKycVerified: false,
  isAddressVerified: false,
  isBankVerified: false,
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
      .addCase(uploadProfileImage.pending, handlePending)
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        handleFulfilled(state, action, "profileImage");
        state.imagePath = action.payload?.imagePath;
        state.imageId = action.payload?._id;
      })
      .addCase(uploadProfileImage.rejected, handleRejected)

      .addCase(submitUserProfile.pending, handlePending)
      .addCase(submitUserProfile.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(submitUserProfile.rejected, handleRejected)

      .addCase(fetchUserProfile.pending, handlePending)
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        handleFulfilled(state, action, "profileData");
        state.imagePath = action.payload?.imageId?.imagePath || null;
        state.imageId = action.payload?.imageId?._id || null;
        state.documentType = action.payload?.nomineeId?.documentType || null;
        state.updatedStep = action.payload?.steps || null;
        state.kyc = action.payload?.kycId || null;
        state.address = action.payload?.addressId || null;
        state.bank = action.payload?.bankId || null;
        state.isDisabled = true;
        state.isKycVerified = action.payload?.isKycVerified || false;
        state.isAddressVerified = action.payload?.isAddressVerified || false;
        state.isBankVerified = action.payload?.isBankVerified || false;
      })
      .addCase(fetchUserProfile.rejected, handleRejected)

      .addCase(updateKYC.pending, handlePending)
      .addCase(updateKYC.fulfilled, (state, action) => {
        handleFulfilled(state, action, "kycData");
      })
      .addCase(updateKYC.rejected, handleRejected)

      .addCase(updateAddress.pending, handlePending)
      .addCase(updateAddress.fulfilled, (state, action) => {
        handleFulfilled(state, action, "addressData");
      })
      .addCase(updateAddress.rejected, handleRejected)

      .addCase(updateBank.pending, handlePending)
      .addCase(updateBank.fulfilled, (state, action) => {
        handleFulfilled(state, action, "bankData");
      })
      .addCase(updateBank.rejected, handleRejected);
  },
});

export const { uploadImageData, uploadUserProfile, clearError } =
  accountSlice.actions;

export default accountSlice.reducer;
