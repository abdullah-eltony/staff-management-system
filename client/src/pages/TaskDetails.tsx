import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { type TaskDetails } from "../types/types";
import { User, Mail, Briefcase, ClipboardList } from "lucide-react";
import { getTaskById, updateTaskStatus } from "../api/task";
import CreateReportModal from "../components/modals/CreateReportModal";
import { useReports } from "../hooks/userReport";

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<TaskDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<string>("");
  const {handleCreateReport} = useReports()

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(Number(id));
        setTask(data);
        setStatus(data.status);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleStatusChange = async(newStatus: string) => {
    if (!task) return;
    try {
      setStatus(newStatus);
      await updateTaskStatus(task.task_id, newStatus);
    } catch (error) {
      setError("Failed to update status");
    }
  }


  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!task) return <p className="text-gray-500">No task found</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <ClipboardList className="w-7 h-7 text-blue-600" />
          Task Details
        </h2>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow"
            onClick={() => setIsModalOpen(true)}
          >
            Create Report
          </button>
          <Link
            to="/tasks"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow"
          >
            ← Back
          </Link>
        </div>
      </div>

      {/* Task Info */}
      <div className="bg-gray-50 rounded-xl p-5 shadow-sm space-y-3">
        <p>
          <span className="font-semibold">Title: </span> {task.title}
        </p>
        <p>
          <span className="font-semibold">Description: </span>{" "}
          {task.description}
        </p>
        <p>
          <span className="font-semibold">Status: </span>
            <select
            name="status"
            id="status"
            className={`border rounded px-2 py-1 ${
              status === "completed"
              ? "text-green-600"
              : status  === "in_progress"
              ? "text-yellow-600"
              : "text-red-400"
            }`}
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            >
            <option className="text-gray-600" value="pending">
              pending
            </option>
            <option className="text-yellow-600" value="in_progress">
              in_progress
            </option>
            <option className="text-green-600" value="completed">
              completed
            </option>
            </select>
        </p>
      </div>

      {/* Employee Info */}
      <div className="bg-gray-50 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="text-xl font-semibold">Assigned Employee</h3>
        <div className="flex items-center gap-3">
          <User className="text-blue-600" />
          <span>{task.employee_name}</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="text-blue-600" />
          <span>{task.employee_email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Briefcase className="text-blue-600" />
          <span>{task.employee_role}</span>
        </div>
      </div>
      <CreateReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateReport}
        taskId={task.task_id}
      />
    </div>
  );
}
