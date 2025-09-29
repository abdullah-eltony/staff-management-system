import { useEffect, useState } from "react";
import { type Employee } from "../types/types";
import {
  deleteEmployee,
  getEmployees,
  updateEmployee,
  addEmployee,
} from "../api/employee";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "employee_id">>({
    name: "",
    role: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((e) => e.employee_id !== id));
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee({ ...employee, password: "" }); 
    setIsModalOpen(true);
  };

  const handleChange = (field: keyof Employee, value: string) => {
    if (!selectedEmployee) return;
    setSelectedEmployee((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    if (!selectedEmployee) return;
    try {
      const { employee_id, ...payload } = selectedEmployee;
      await updateEmployee(employee_id, payload);
      await fetchEmployees();
      
      setEmployees((prev) =>
        prev.map((e) =>
          e.employee_id === employee_id ? selectedEmployee : e
        )
      );
    } catch (err) {
      console.error("Error updating employee:", err);
    }
    setIsModalOpen(false);
  };

  const handleAddChange = (field: keyof Employee, value: string) => {
    setNewEmployee((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSave = async () => {
    try {
      await addEmployee(newEmployee);
      await fetchEmployees();
      setNewEmployee({ name: "", role: "", email: "", password: "" });
    } catch (err) {
      console.error("Error adding employee:", err);
    }
    setIsAddModalOpen(false);
  };

  return {
    employees,
    loading,
    selectedEmployee,
    isModalOpen,
    isAddModalOpen,
    newEmployee,
    setIsModalOpen,
    setIsAddModalOpen,
    handleEdit,
    handleDelete,
    handleChange,
    handleSave,
    handleAddChange,
    handleAddSave,
  };
}
