import { Eye, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils";
import { type Report } from "../../api/report";

interface ReportsTableProps {
  reports: Report[];
  onDelete: (id: number) => void;
}

export function ReportsTable({ reports, onDelete }: ReportsTableProps) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Report ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Task
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Employee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Report Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Created At
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reports.map((report) => (
            <tr key={report.id}>
              <td className="px-6 py-4 whitespace-nowrap">{report.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.task_title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.employee_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(report.created_at).toLocaleString()}
              </td>
              <td className="text-center">
                <button
                  onClick={() => navigate(`/reports/${report.id}`)}
                  className="rounded-full p-2 bg-gray-100 text-blue-500 hover:bg-blue-200"
                >
                  <Eye size={20} />
                </button>
                {isAdmin() && (
                  <button
                    onClick={() => onDelete(report.id)}
                    className="rounded-full p-2 bg-gray-100 text-red-500 ml-2 hover:bg-red-200"
                  >
                    <Trash size={20} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reports.length === 0 && (
        <div className="text-gray-500 text-center py-12">No reports found.</div>
      )}
    </div>
  );
}
