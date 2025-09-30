import type { Employee } from "../../types/types";
import Modal from "../common/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  employeeData: Omit<Employee, "employee_id">;
  onChange: (field: keyof Omit<Employee, "employee_id">, value: string) => void;
  onSave: () => void;
};

export default function AddEmployeeModal({
  isOpen,
  onClose,
  employeeData,
  onChange,
  onSave,
}: Props) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} title="Add Employee" onClose={onClose} onSave={onSave}>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={employeeData.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            value={employeeData.role || ""}
            onChange={(e) => onChange("role", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={employeeData.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={employeeData.password || ""}
            onChange={(e) => onChange("password", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
          />
        </div>
      </div>
    </Modal>
  );
}
