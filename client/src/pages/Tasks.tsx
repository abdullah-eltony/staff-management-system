import { useState } from "react";
import TasksTable from "../components/tables/TasksTable";
import EditTaskModal from "../components/modals/EditTaskModal";
import AddTaskModal from "../components/modals/AddTaskModal";
import { isAdmin } from "../utils";
import { useTasks } from "../hooks/useTask";
import { Plus } from "lucide-react";

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
      <div className="flex justify-between items-start flex-col sm:flex-row mb-4 gap-3">
        <h2 className="text-2xl font-semibold flex flex-1">Tasks</h2>

        {isAdmin() && (
          <div className="flex items-center gap-4 justify-between w-full sm:w-auto">
            <input
              type="number"
              placeholder="Filter by Employee ID..."
              value={employeeFilter}
              onChange={(e) => setEmployeeFilter(e.target.value)}
              className="border rounded px-3 py-2 w-64"
            />
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex gap-2 items-center"
            >
              <span className="hidden sm:inline-block">Add Task</span>
              <span>
                <Plus size={18}/>
              </span>
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
