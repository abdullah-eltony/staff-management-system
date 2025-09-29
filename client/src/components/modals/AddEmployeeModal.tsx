import type { Employee } from "../../types/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  employeeData: Omit<Employee, "employee_id">;
  onChange: (field: keyof Omit<Employee, "employee_id">, value: string) => void;
  onSave: () => void;
};

export default function AddEmployeeModal({ isOpen, onClose, employeeData, onChange, onSave }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-lg font-semibold mb-4">Add Employee</h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={employeeData.name || ""}
              onChange={e => onChange("name", e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

            <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={employeeData.role || ""}
              onChange={e => onChange("role", e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
            </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={employeeData.email || ""}
              onChange={e => onChange("email", e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={employeeData.password || ""}
              onChange={e => onChange("password", e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
