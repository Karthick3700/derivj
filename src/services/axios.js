import axios from "axios";
import { localStorage } from "@/utils";

const getAxiosInstance = () => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    function (config) {
      const token = localStorage.getAuthToken();
      config.headers.Authorization = token ? token : "";
      return config;
    },
    (error) => {
      console.log("instanceerror::", error);
      return Promise.reject(error);
    }
  );
  return instance;
};

export default getAxiosInstance();
