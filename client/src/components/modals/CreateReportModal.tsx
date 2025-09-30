import { useState } from "react";
import type { ReportPayload } from "../../api/report";
import Modal from "../common/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (report: ReportPayload) => Promise<void>;
  taskId?: number;
  employeeId?: number;
};

export default function CreateReportModal({
  isOpen,
  onClose,
  onSave,
  taskId,
  employeeId,
}: Props) {
  const [report, setReport] = useState<ReportPayload>({
    title: "",
    content: "",
    task_id: taskId || 0,
    employee_id: employeeId || 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof ReportPayload, value: string | number) => {
    setReport((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSave(report);
      setReport({
        title: "",
        content: "",
        task_id: taskId || 0,
        employee_id: employeeId || 0,
      });
      onClose();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (

        <Modal isOpen={isOpen} onClose={onClose} onSave={handleSubmit} title="Create New Report" loading={loading}>
          <div className="space-y-3">
            {/* Task ID */}
            <div className="mb-3">
              <input
                type="hidden"
                value={report.task_id}
                onChange={(e) =>
                  handleChange("task_id", Number(e.target.value))
                }
                className="mt-1 w-full border rounded px-3 py-2"
                disabled={!!taskId}
              />
            </div>

            {/* Title */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={report.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>

            {/* Content */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                value={report.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2 h-32"
              />
            </div>
          </div>
        </Modal>
   
  );
}
