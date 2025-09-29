import { useState } from "react";
import type { ReportPayload } from "../../api/report";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (report: ReportPayload) => Promise<void>;
  taskId?: number;
  employeeId?: number;
};

export default function CreateReportModal({ isOpen, onClose, onSave, taskId, employeeId }: Props) {
  const [report, setReport] = useState<ReportPayload>({
    title: "",
    content: "",
    task_id: taskId || 0,
    employee_id: employeeId || 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof ReportPayload, value: string | number) => {
    setReport(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await onSave(report);
      setReport({ title: "", content: "", task_id: taskId || 0, employee_id: employeeId || 0 });
      onClose();
    } catch (err) {
      setError(err as "Failed to create report");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Create New Report</h2>

        {error && <div className="mb-3 text-red-500">{error}</div>}

        {/* Task ID */}
        <div className="mb-3">
          <input
            type="hidden"
            value={report.task_id}
            onChange={(e) => handleChange("task_id", Number(e.target.value))}
            className="mt-1 w-full border rounded px-3 py-2"
            disabled={!!taskId}
          />
        </div>

        {/* Employee ID */}
        <div className="mb-3">
          <input
            type="hidden"
            value={report.employee_id}
            onChange={(e) => handleChange("employee_id", Number(e.target.value))}
            className="mt-1 w-full border rounded px-3 py-2"
            disabled={!!employeeId}
          />
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={report.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={report.content}
            onChange={(e) => handleChange("content", e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2 h-32"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
