import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://polls.apiblueprint.org"});

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;