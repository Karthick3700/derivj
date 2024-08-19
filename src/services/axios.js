import { localStorage } from "@/utils";
import axios from "axios";

const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    timeout: 15000,
  },
});

baseApi.interceptors.request.use((config) => {
  const bearerToken = localStorage.getAuthToken();
  if (bearerToken) {
    config.headers.Authorization = bearerToken ? bearerToken : "";
    config.headers["x-access-token"] = bearerToken ? bearerToken : "";
  }
  return config;
});

export default baseApi;
