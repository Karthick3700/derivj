import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserProfile,
  submitUserProfile,
  updateAddress,
  updateBank,
  updateKYC,
  uploadImage,
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
  paidPlan: null,
  activePlan: null,
};

const accountSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setPaidPlan: (state, action) => {
      state.paidPlan = action?.payload;
    },
    setActivePlan: (state, action) => {
      state.activePlan = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, handlePending)
      .addCase(uploadImage.fulfilled, (state, action) => {
        handleFulfilled(state, action, "profileImage");
        state.imagePath = action.payload?.imagePath;
        state.imageId = action.payload?._id;
      })
      .addCase(uploadImage.rejected, handleRejected)

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

export const { setPaidPlan,setActivePlan } = accountSlice.actions;

export default accountSlice;
