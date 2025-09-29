import type { Task } from "../../types/types";

type Props = {
  tasks: Task[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

import React from "react";

interface StatusCellProps {
  status: string;
}

const StatusCell: React.FC<StatusCellProps> = ({ status }) => {
  let bgColor = "bg-gray-400";

  switch (status.toLowerCase()) {
    case "completed":
      bgColor = "bg-green-400";
      break;
    case "in_progress":
      bgColor = "bg-yellow-400";
      break;
    case "pending":
      bgColor = "bg-red-400";
      break;
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${bgColor}`}
    >
      {status}
    </span>
  );
};

import { Eye, SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils";

interface ActionsCellProps {
  task_id: number;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const ActionsCell: React.FC<ActionsCellProps> = ({
  task_id,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <td className="px-6 py-4 whitespace-nowrap flex space-x-3">
      <button
        onClick={() => navigate(`/tasks/${task_id}`)}
        className="text-blue-500 hover:text-blue-700 bg-gray-100 p-2 rounded-full"
        title="View"
      >
        <Eye size={20} />
      </button>
      {isAdmin() && (
        <>
          <button
            onClick={() => onEdit?.(task_id)}
            className="text-yellow-500 hover:text-yellow-700 bg-gray-100 p-2 rounded-full"
            title="Edit"
          >
            {}
            <SquarePen size={20} />
          </button>
          <button
            onClick={() => onDelete?.(task_id)}
            className="text-red-500 hover:text-red-700 bg-gray-100 p-2 rounded-full"
            title="Delete"
          >
            <Trash2 size={20} />
          </button>
        </>
      )}
    </td>
  );
};

export default function TasksTable({ tasks, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
          ID
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
          Title
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
          Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
          Created At
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
          Assigned Employee
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
          Actions
        </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {tasks.map((task) => (
        <tr key={task.task_id}>
          <td className="px-6 py-4 whitespace-nowrap">{task.task_id}</td>
          <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
          <td className="px-6 py-4 whitespace-nowrap">
          <StatusCell status={task.status} />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
          {new Date(task.created_at).toLocaleString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
          {task.employee_email ?? "Unassigned"}
          </td>
          <ActionsCell
          task_id={task.task_id}
          onEdit={onEdit}
          onDelete={onDelete}
          />
        </tr>
        ))}
      </tbody>
      </table>
      {tasks.length === 0 && (
      <div className="text-gray-500 text-center py-12">No tasks available.</div>
      )}
    </div>
  );
}
