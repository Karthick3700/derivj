import axios from "./axios";

const Services = {
  post: async function (authUrl, payload) {
    return axios
      .post(authUrl, payload)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        console.log("err::", error);
      });
  },

  get: async function (url) {
    return axios
      .get(url)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        console.log("error::", error);
      });
  },

  put: async function (url, payload) {
    return axios
      .put(url, payload)
      .then((resp) => {
        return resp.data;
      })
      .catch((error) => {
        console.log("error::", error);
      });
  },
};

export default Services;
