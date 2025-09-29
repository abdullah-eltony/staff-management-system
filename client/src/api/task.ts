import type { TaskDetails } from "../types/types";
import axiosInstance from "./axiosInstance";
import { type Task } from "../types/types";

export type TaskPayload = Omit<Task, "task_id" | "created_at" | "updated_at" | "employee_email">;


export async function getTasks(): Promise<Task[]> {
  const res = await axiosInstance.get("/tasks");
  return res.data;
}

export async function getTaskById(id: number): Promise<TaskDetails> {
  const res = await axiosInstance.get(`/tasks/${id}`);
  return res.data;
}

export async function addTask(task: TaskPayload): Promise<Task> {
  const res = await axiosInstance.post("/tasks/add", task);
  return res.data;
}

export async function updateTask(id: number, task: TaskPayload): Promise<Task> {
  const res = await axiosInstance.put(`/tasks/${id}`, task);
  return res.data;
}

export async function deleteTask(id: number): Promise<void> {
  await axiosInstance.delete(`/tasks/${id}`);
}

export async function updateTaskStatus(id: number, status: string): Promise<void> {
  await axiosInstance.patch(`/tasks/${id}`, { status });
}
