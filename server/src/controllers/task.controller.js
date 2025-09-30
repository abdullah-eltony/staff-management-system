import TaskService from "../services/task.service.js";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validator/taskValidator.js";

class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  getAllTasks = async (req, res, next) => {
    const {sub: id, role} = req.user;
    try {
      const tasks = await this.taskService.getAll({ employee_id: id, role });
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  };

  getTasksByEmployee = async (req, res, next) => {
    try {
      const tasks = await this.taskService.getTasksByEmployee(
        req.params.employee_id
      );
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  };

  getTaskById = async (req, res, next) => {
    try {
      const task = await this.taskService.getById(req.params.task_id);
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json(task);
    } catch (err) {
      next(err);
    }
  };

  createTask = async (req, res, next) => {
    try {
      const { error } = createTaskSchema.validate(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      await this.taskService.create(req.body);
      res.status(201).json({ message: "Task created successfully" });
    } catch (err) {
      next(err);
    }
  };

  updateTask = async (req, res, next) => {
    try {
      const { error } = updateTaskSchema.validate(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const task = await this.taskService.update(req.params.task_id, req.body);
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json(task);
    } catch (err) {
      next(err);
    }
  };

  changeTaskStatus = async (req, res, next) => {
    try {
      const { status } = req.body;
      await this.taskService.updateStatus(req.params.task_id, status);
      res.json({ message: "Task status updated successfully" });
    } catch (err) {
      next(err);
    }
  };

  deleteTask = async (req, res, next) => {
    try {
      const deleted = await this.taskService.delete(req.params.task_id);
      if (!deleted) return res.status(404).json({ error: "Task not found" });
      res.status(204).json({ message: "Task deleted successfully" });
    } catch (err) {
      next(err);
    }
  };
}

// export an instance for consistency
export default new TaskController(TaskService);
