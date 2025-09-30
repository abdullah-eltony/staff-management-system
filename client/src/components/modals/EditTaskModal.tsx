import { type Task } from "../../types/types";
import Modal from "../common/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onChange: (
    field: keyof Omit<Task, "task_id" | "created_at">,
    value: string
  ) => void;
  onSave: () => void;
};

export default function EditTaskModal({
  isOpen,
  onClose,
  task,
  onChange,
  onSave,
}: Props) {
  if (!isOpen || !task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} onSave={onSave} title="Edit Task">
      <div className="space-y-3">
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
          <label className="block text-sm font-medium mb-1">
            Assigned Employee ID
          </label>
          <input
            type="number"
            value={task.assigned_employee_id ?? ""}
            onChange={(e) => onChange("assigned_employee_id", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>
    </Modal>
  );
}
