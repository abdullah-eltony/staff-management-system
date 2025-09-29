import axiosInstance from "./axiosInstance";
import type {  Employee} from "../types/types";

export async function getEmployees(): Promise<Employee[]> {
  try {
    const res = await axiosInstance.get<Employee[]>("/employees");
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch employees");
  }
}

export async function addEmployee(employee: Omit<Employee, "employee_id">): Promise<Employee> {
  try {
    const res = await axiosInstance.post<Employee>("/employees/add", employee);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to add employee");
  }
}

export async function updateEmployee(id: number, employee: Partial<Employee>): Promise<Employee> {
  try {
    const res = await axiosInstance.put<Employee>(`/employees/${id}`, employee);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update employee");
  }
}

export async function deleteEmployee(id: number): Promise<void> {
  try {
    await axiosInstance.delete(`/employees/${id}`);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete employee");
  }
}
