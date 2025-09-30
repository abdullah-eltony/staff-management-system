
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
    const { token, employee } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user_role", employee.role);
    localStorage.setItem("user_id", employee.id);
    localStorage.setItem("user", JSON.stringify(employee));

    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to login");
  }
}
