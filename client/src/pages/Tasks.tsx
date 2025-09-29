import { useState } from "react";
import TasksTable from "../components/tables/TasksTable";
import EditTaskModal from "../components/modals/EditTaskModal";
import AddTaskModal from "../components/modals/AddTaskModal";
import { isAdmin } from "../utils";
import { useTasks } from "../hooks/useTask";

export default function Tasks() {
  const {
    tasks,
    rawTasks,
    loading,
    error,
    selectedTask,
    setSelectedTask,
    employeeFilter,
    setEmployeeFilter,
    handleDelete,
    handleSave,
    handleAddTask,
    handleChange,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Tasks</h2>

        {isAdmin() && (
          <div className="flex items-center gap-4">
            <input
              type="number"
              placeholder="Filter by Employee ID..."
              value={employeeFilter}
              onChange={(e) => setEmployeeFilter(e.target.value)}
              className="border rounded px-3 py-2 w-64"
            />
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        )}
      </div>

      <TasksTable
        tasks={tasks}
        onDelete={handleDelete}
        onEdit={(id) => {
          const task = rawTasks.find((t) => t.task_id === id);
          if (task) {
            setSelectedTask(task);
            setIsModalOpen(true);
          }
        }}
      />

      <EditTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onChange={handleChange}
        onSave={() => {
          handleSave();
          setIsModalOpen(false);
        }}
      />

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(task) => {
          handleAddTask(task);
          setIsAddModalOpen(false);
        }}
        error={error ?? ""}
      />
    </div>
  );
}
