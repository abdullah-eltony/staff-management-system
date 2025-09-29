import { useEffect, useState } from "react";
import {
  getTasks,
  deleteTask,
  updateTask,
  type TaskPayload,
  addTask,
} from "../api/task";
import { type Task } from "../types/types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [employeeFilter, setEmployeeFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.task_id !== id));
    } catch {
      setError("Failed to delete task.");
    }
  };

  const handleSave = async () => {
    if (!selectedTask) return;
    try {
      const { task_id, updated_at, created_at, employee_email, ...payload } = selectedTask;
      const updatedTask = await updateTask(task_id, payload);
      await fetchData();
      setSelectedTask(updatedTask);

    } catch {
      setError("Failed to update task.");
    }
  };

  const handleAddTask = async (task: TaskPayload) => {
    try {
      const added = await addTask(task);
      setTasks((prev) => [...prev, added]);
      await fetchData();
    } catch (err: any) {
      if (err?.response?.data) {
        setError(err.response.data.error || err.response.data.message);
      } else {
        setError("Network error.");
      }
    }
  };

  const handleChange = (field: keyof Task, value: string) => {
    setSelectedTask((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const filteredTasks = tasks.filter((task) =>
    employeeFilter
      ? task.assigned_employee_id?.toString() === employeeFilter
      : true
  );

  return {
    tasks: filteredTasks,
    rawTasks: tasks,
    loading,
    error,
    setError,
    selectedTask,
    setSelectedTask,
    employeeFilter,
    setEmployeeFilter,
    fetchData,
    handleDelete,
    handleSave,
    handleAddTask,
    handleChange,
  };
}
