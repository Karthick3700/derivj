import { service } from "@/services";
import {
  PROFILE,
  UPDATE_ADDRESS,
  UPDATE_BANK,
  UPDATE_KYC,
  UPLOAD_IMAGE,
  USER_PROFILE,
} from "@/services/api-url.service";
import { CONST, utils } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

export const handleFulfilled = (state, action, key) => {
  state[key] = action.payload;
  state.isLoading = false;
  state.error = null;
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleThunk = async (serviceMethod, payload, rejectWithValue) => {
  try {
    const response = await serviceMethod(payload);
    if (response?.statusCode === CONST.status.SUCCESS) {
      if (response?.doc && Object.keys(response.doc).length > 0) {
        return response.doc;
      } else {
        return utils.showSuccessMsg(response?.message);
      }
    } else {
      return rejectWithValue(response?.message);
    }
  } catch (error) {
    return rejectWithValue(error.message || error);
  }
};

export const submitUserProfile = createAsyncThunk(
  "account/submitUserProfile",
  (payload, { rejectWithValue }) =>
    handleThunk(service.post.bind(service, PROFILE), payload, rejectWithValue)
);

export const uploadProfileImage = createAsyncThunk(
  "account/uploadProfileImage",
  async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("image", file);
    return handleThunk(
      service.imageUpload.bind(service, UPLOAD_IMAGE),
      formData,
      rejectWithValue
    );
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  (_, { rejectWithValue }) =>
    handleThunk(service.get.bind(service, USER_PROFILE), null, rejectWithValue)
);

export const updateKYC = createAsyncThunk(
  "auth/updatedKYC",
  (payload, { rejectWithValue }) =>
    handleThunk(service.put.bind(service, UPDATE_KYC), payload, rejectWithValue)
);

export const updateAddress = createAsyncThunk(
  "auth/updateAddress",
  (payload, { rejectWithValue }) =>
    handleThunk(
      service.put.bind(service, UPDATE_ADDRESS),
      payload,
      rejectWithValue
    )
);

export const updateBank = createAsyncThunk(
  "auth/updateBank",
  (payload, { rejectWithValue }) =>
    handleThunk(
      service.put.bind(service, UPDATE_BANK),
      payload,
      rejectWithValue
    )
);
