import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export type ReportDetail = {
  id: number;
  task_id: number;
  task_title: string;
  employee_id: number;
  employee_name: string;
  title: string;
  content: string;
  ai_summary: string;
  created_at: string;
};

export default function ReportDetails() {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();

  const [report, setReport] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (reportId) fetchReport(reportId);
  }, [reportId]);

  const fetchReport = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`/reports/${id}`);
      setReport(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!report) return <div className="p-6 text-center text-gray-500">Report not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
          <h1 className="text-3xl font-bold">{report.title}</h1>
          <p className="mt-1 text-sm opacity-80">
            Report ID: {report.id} | Created At: {new Date(report.created_at).toLocaleString()}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded shadow-sm">
              <h2 className="font-semibold mb-1">Task</h2>
              <p>{report.task_title} (ID: {report.task_id})</p>
            </div>
            <div className="bg-gray-50 p-4 rounded shadow-sm">
              <h2 className="font-semibold mb-1">Employee</h2>
              <p>{report.employee_name}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h2 className="font-semibold mb-2">Content</h2>
            <div className="whitespace-pre-wrap max-h-64 overflow-y-auto">{report.content}</div>
          </div>

          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h2 className="font-semibold mb-2">AI Summary</h2>
            <div className="whitespace-pre-wrap max-h-32 overflow-y-auto">{report.ai_summary}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
