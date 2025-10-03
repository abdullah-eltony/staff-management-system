export type Employee = {
  employee_id: number;
  name: string;
  role: string;
  email: string;
  password: string;
};

export interface TaskDetails {
  task_id: number;
  title: string;
  description: string;
  status: string;
  assigned_employee_id: number;
  employee_name: string;
  employee_email: string;
  employee_role: string;
}

export interface ReportDetails {
  id: number;
  task_id: number;
  task_title: string;
  employee_name: string;
  title: string;
  content: string;
  ai_summary: string;
  created_at: string;
}

export type Task = {
  task_id: number;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "done";
  employee_email: string; 
  created_at: string;
  assigned_employee_id: number | null | string;
  updated_at: string;
};
