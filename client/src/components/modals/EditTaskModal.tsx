import {  type Task } from "../../types/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onChange: (field: keyof Omit<Task, "task_id" | "created_at">, value: string) => void;
  onSave: () => void;
};

export default function EditTaskModal({ isOpen, onClose, task, onChange, onSave }: Props) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={task.title}
              onChange={(e) => onChange("title", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={task.description}
              onChange={(e) => onChange("description", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={task.status}
              onChange={(e) => onChange("status", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Assigned Employee ID</label>
            <input
              type="number"
              value={task.assigned_employee_id ?? ""}
              onChange={(e) => onChange("assigned_employee_id", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
