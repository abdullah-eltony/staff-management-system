import type { Employee } from "../../types/types";
import { isAdmin, isCurrentUser } from "../../utils";

type Props = {
  employees: Employee[];
  onEdit?: (employee_id: number) => void;
  onDelete?: (employee_id: number) => void;
};

export default function EmployeesTable({ employees, onDelete, onEdit }: Props) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {employees.map((emp) => (
        <tr key={emp.employee_id}>
          <td className="px-6 py-4 whitespace-nowrap">{emp.employee_id}</td>
          <td className="px-6 py-4 whitespace-nowrap">{emp.name}</td>
          <td className="px-6 py-4 whitespace-nowrap">{emp.role}</td>
          <td className="px-6 py-4 whitespace-nowrap">{emp.email}</td>
          <td className="px-6 py-4 whitespace-nowrap">
          {(isCurrentUser(emp.employee_id) || isAdmin()) && (
            <button
            onClick={() => onEdit?.(emp.employee_id)}
            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 cursor-pointer"
            >
            Edit
            </button>
          )}
          {isAdmin() && (
            <button
            onClick={() => onDelete?.(emp.employee_id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
            >
            Delete
            </button>
          )}
          </td>
        </tr>
        ))}
      </tbody>
      </table>
      {employees.length === 0 && (
      <p className="text-gray-500 text-center py-12">No employees found.</p>
      )}
    </div>
  );
}
