import { useState } from "react";
import type { TaskPayload } from "../../api/task";
import Modal from "../common/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  error?: string | null;
  onSave: (task: TaskPayload) => void;
};

export default function AddTaskModal({
  isOpen,
  onClose,
  onSave,
}: Props) {
  const [newTask, setNewTask] = useState<TaskPayload>({
    title: "",
    description: "",
    status: "pending",
    assigned_employee_id: null,
  });

  const handleChange = (
    field: keyof TaskPayload,
    value: string | number | null
  ) => {
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
    <Modal isOpen={isOpen} onClose={onClose} onSave={handleSubmit} title="Add Task">
      <div className="space-y-3">
        {/* Title */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Title
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={newTask.status}
                onChange={(e) =>
                  handleChange(
                    "status",
                    e.target.value as TaskPayload["status"]
                  )
                }
                className="mt-1 w-full border rounded px-3 py-2"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Assigned Employee */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Assigned Employee ID
              </label>
              <input
                type="number"
                value={newTask.assigned_employee_id ?? ""}
                onChange={(e) =>
                  handleChange(
                    "assigned_employee_id",
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </Modal>
    
  );
}
