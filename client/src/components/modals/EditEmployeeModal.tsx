import type { Employee } from "../../types/types";
import { isAdmin } from "../../utils";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onChange: (field: keyof Employee, value: string) => void;
  onSave: () => void;
};

export default function EditEmployeeModal({ isOpen, onClose, employee, onChange, onSave }: Props) {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-lg font-semibold mb-4">Edit Employee</h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={employee.name}
              onChange={e => onChange("name", e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              disabled={!isAdmin()}
              value={employee.role}
              onChange={e => onChange("role", e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
            {!isAdmin() && (<p className="text-xs text-gray-500 mt-1">Only admins can change roles.</p>)}

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={employee.email}
              onChange={e => onChange("email", e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={employee.password}
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
