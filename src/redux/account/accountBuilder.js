import { service } from "@/services";
import {
  PROFILE,
  UPLOAD_IMAGE,
  USER_PROFILE,
} from "@/services/api-url.service";
import { CONST, utils } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const submitUserProfile = createAsyncThunk(
  "account/submitUserProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await service.post(PROFILE, payload);

      return response?.payload;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  "account/uploadProfileImage",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await service.imageUpload(UPLOAD_IMAGE, formData);

      if (response?.statusCode === CONST.status.SUCCESS) {
        utils.showSuccessMsg(response?.message);
        return response?.doc;
      } else {
        utils.showErrorMsg(response?.message);
        return rejectWithValue(response?.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.get(USER_PROFILE);

      return response?.doc;
    } catch (err) {
      return rejectWithValue(err?.message || err);
    }
  }
);
