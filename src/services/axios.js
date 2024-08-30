import { logout } from "@/redux/features/auth/authSlice";
import store from "@/redux/store";
import { CONST, localStorage } from "@/utils";
import axios from "axios";

export const imageApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_IMAGE_URL,
});

export const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

imageApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getAuthToken();
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

imageApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === CONST.status.UNAUTHORIZED) {
      store.dispatch(logout());
      localStorage.removeAuthToken();
      window.location.href = CONST.Routes.LOGIN;
    }
    return Promise.reject(error);
  }
);

baseApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getAuthToken();
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === CONST.status.UNAUTHORIZED) {
      store.dispatch(logout());
      localStorage.removeAuthToken();
      window.location.href = CONST.Routes.LOGIN;
    }
    return Promise.reject(error);
  }
);
