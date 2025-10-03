
import axiosInstance from "./axiosInstance";

export async function logout() {
  try {
    await axiosInstance.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user");
    window.location.href = "/login";
  } catch (err) {
    console.error(err);
    throw new Error("Failed to login");
  }
}
