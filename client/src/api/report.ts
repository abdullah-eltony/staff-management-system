import type { ReportDetails } from "../types/types";
import axiosInstance from "./axiosInstance";

export type Report = {
  id: number;
  task_id: number;
  task_title: string;
  employee_id: number;
  employee_name: string;
  title: string;
  created_at: string;
};
export type ReportPayload = Omit<ReportDetails,"id" | "ai_summary" | "task_title" | "created_at" | "employee_name">

export async function getReports(): Promise<Report[]> {
  const res = await axiosInstance.get("/reports");
  return res.data;
}

export async function getReportById(id: number): Promise<ReportDetails> {
  const res = await axiosInstance.get(`/reports/${id}`);
  return res.data;
}

export async function createReport(payload: ReportPayload): Promise<ReportDetails> {
  const res = await axiosInstance.post("/reports/create", payload);
  return res.data;
}

export async function deleteReport(id: number): Promise<void> {
  await axiosInstance.delete(`/reports/${id}`);
}