// src/api/axiosInstance.ts
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: { "x-api-key": "test-api-key" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    const status = error.response?.status;
    const msg = error.response?.data?.error || error.response?.data?.message;
    console.log(error.response?.data)

    if (status === 403) {
      Swal.fire({
        title: "Forbidden",
        text: msg ?? "You don’t have permission.",
        icon: "warning",
      });
    } else if (status === 401) {
      Swal.fire({
        title: "Authentication error",
        text: msg ?? "Please login again!",
        icon: "warning",
      }).then((res) => {
        localStorage.removeItem("token");
        if (res.value) window.location.href = "/login";
      });
    } else if (status === 400) {
      Swal.fire({
        title: "validation error",
        text: msg ?? "",
        icon: "warning",
      });
    } else if (status === 404) {
      Swal.fire({
        title: "Not Found",
        text: msg ?? "The requested resource was not found.",
        icon: "warning",
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
