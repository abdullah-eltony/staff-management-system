import { useState } from "react";
import type { TaskPayload } from "../../api/task";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  error?:string | null
  onSave: (task: TaskPayload) => void;
};

export default function AddTaskModal({ isOpen, onClose, onSave, error }: Props) {
  const [newTask, setNewTask] = useState<TaskPayload>({
    title: "",
    description: "",
    status: "pending",
    assigned_employee_id: null,
  });

  const handleChange = (field: keyof TaskPayload, value: string | number | null) => {
    setNewTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(newTask);
    setNewTask({
      title: "",
      description: "",
      status: "pending",
      assigned_employee_id: null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Title */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newTask.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={newTask.status}
            onChange={(e) => handleChange("status", e.target.value as TaskPayload["status"])}
            className="mt-1 w-full border rounded px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Assigned Employee */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Assigned Employee ID</label>
          <input
            type="number"
            value={newTask.assigned_employee_id ?? ""}
            onChange={(e) =>
              handleChange("assigned_employee_id", e.target.value ? Number(e.target.value) : null)
            }
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
