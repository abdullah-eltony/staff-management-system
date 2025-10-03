
import axiosInstance from "./axiosInstance";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });
    const { accessToken, refreshToken,user } = res.data;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken",refreshToken);
    localStorage.setItem("user_role", user.role);
    localStorage.setItem("user_id", user.id);
    localStorage.setItem("user", JSON.stringify(user));

    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to login");
  }
}
