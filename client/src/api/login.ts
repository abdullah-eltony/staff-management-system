
import axiosInstance from "./axiosInstance";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await axiosInstance.post("/login", { email, password });

    const { token,role, employee_id } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user_role",role)
    localStorage.setItem("user_id", employee_id);

    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to login");
  }
}
