// src/api/axiosInstance.ts
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import Swal from "sweetalert2";

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (err: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: { "x-api-key": "test-api-key" },
});

// attach token on every request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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
  async (error: AxiosError<{ message?: string; error?: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;
    const msg = error.response?.data?.error || error.response?.data?.message;

    // Handle expired access token (401 Unauthorized)
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        const response = await axios.post("http://localhost:5000/auth/refresh-token", {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        localStorage.setItem("token", newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); // retry
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        Swal.fire({
          title: "Session expired",
          text: "Please login again!",
          icon: "warning",
        }).then(() => {
          window.location.href = "/login";
        });
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // Other error handling
    if (status === 403) {
      Swal.fire({ title: "Forbidden", text: msg ?? "You don’t have permission.", icon: "warning" });
    } else if (status === 400) {
      Swal.fire({ title: "Validation error", text: msg ?? "", icon: "warning" });
    } else if (status === 404) {
      Swal.fire({ title: "Not Found", text: msg ?? "The requested resource was not found.", icon: "warning" });
    } else if (status === 500) {
      Swal.fire({ title: "Server Error", text: msg ?? "An error occurred on the server.", icon: "error" });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
