import axios from "axios";

export const conduitAxios = axios.create({
  baseURL: "https://api.realworld.io/api/",
});
export const conduitAxiosCredentials = axios.create({
  baseURL: "https://api.realworld.io/api/",
});
conduitAxiosCredentials.interceptors.request.use(
  function (config) {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        config.headers["Authorization"] = `Token ${token}`;
      }
      return config;
    } catch (error) {
      // Handle error with local storage
      console.error("Error retrieving token from local storage:", error);
      return Promise.reject(error);
    }
  },
  function (error) {
    // Handle request error
    console.error("Error with request:", error);
    return Promise.reject(error);
  }
);
