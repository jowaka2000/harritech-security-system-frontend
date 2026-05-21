import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
  baseURL: "https://api.harristech.co.ke/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      //authorization error
      localStorage.removeItem("ACCESS_TOKEN");
    }

    //set un authorized

    throw error;
  }
);

export default axiosClient;
