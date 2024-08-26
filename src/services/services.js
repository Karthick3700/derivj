
import { baseApi, imageApi } from "./axios";
import { utils } from "@/utils";


const service = {
  post: async function (authUrl, payload) {
    return baseApi
      .post(authUrl, payload)
      .then((resp) => {
        console.log("response::", resp.data);
        return resp.data;
      })
      .catch((error) => {
        console.log("err::", error);
        utils.showErrorMsg(utils.handleError(error));
      });
  },

  get: async function (url) {
    return baseApi
      .get(url)
      .then((resp) => {
        console.log("responsedata::", resp.data);
        return resp.data;
      })
      .catch((error) => {
        console.log("error::", error);
        utils.showErrorMsg(utils.handleError(error));
      });
  },

  put: async function (url, payload) {
    return baseApi
      .put(url, payload)
      .then((resp) => {
        console.log("responsedata::", resp.data);
        return resp.data;
      })
      .catch((error) => {
        console.log("error::", error);
        utils.showErrorMsg(utils.handleError(error));
      });
  },

  imageUpload: async function (url, formData) {
    return imageApi
      .post(url, formData)
      .then((resp) => {
        console.log("responseData::", resp?.data);
        return resp?.data;
      })
      .catch((error) => {
        console.log("Error::", error);
        utils.showErrorMsg(utils.handleError(error));
      });
  },
};

export default service;
