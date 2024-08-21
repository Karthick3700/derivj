import baseApi from "./axios";

const Services = {
  post: async function (authUrl, payload) {
    return baseApi
      .post(authUrl, payload)
      .then((resp) => {
        console.log("response::",resp.data)
        return resp.data;
      })
      .catch((error) => {
        console.log("err::", error);
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
      });
  },
};

export default Services;
