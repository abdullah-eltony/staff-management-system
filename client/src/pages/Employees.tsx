import EmployeesTable from "../components/tables/EmployeesTable";
import EditEmployeeModal from "../components/modals/EditEmployeeModal";
import AddEmployeeModal from "../components/modals/AddEmployeeModal";
import { isAdmin } from "../utils";
import { useEmployees } from "../hooks/useEmployee";

export default function EmployeesPage() {
  const {
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
  } = useEmployees();

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold">Employees</h2>
      {isAdmin() && (
        <button
        onClick={() => setIsAddModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
        Add Employee
        </button>
      )}
      </div>

      <EmployeesTable
      employees={employees}
      onEdit={(id) => {
        const emp = employees.find((e) => e.employee_id === id);
        if (emp) handleEdit(emp);
      }}
      onDelete={handleDelete}
      />

      <EditEmployeeModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      employee={selectedEmployee}
      onChange={handleChange as (field: string | number | symbol, value: string) => void}
      onSave={handleSave}
      />

      <AddEmployeeModal
      isOpen={isAddModalOpen}
      onClose={() => setIsAddModalOpen(false)}
      employeeData={newEmployee}
      onChange={handleAddChange as (field: string | number | symbol, value: string) => void}
      onSave={handleAddSave}
      />
    </div>
  );
}
