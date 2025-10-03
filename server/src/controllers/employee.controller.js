import EmployeeService from "../services/employee.service.js";

class EmployeeController {
  constructor(service) {
    this.service = service;
  }

  // Get all employees
  getAllEmployees = async (req, res, next) => {
    try {
      const employees = await this.service.getAll();
      res.json(employees);
    } catch (err) {
      next(err);
    }
  };

  // Get employee by ID
  getEmployeeById = async (req, res, next) => {
    try {
      const employee = await this.service.getById(req.params.id);
      if (!employee) return res.status(404).json({ error: "Employee not found" });
      res.json(employee);
    } catch (err) {
      next(err);
    }
  };

  // Create new employee
  createEmployee = async (req, res, next) => {
    try {
      await this.service.create(req.body);
      res.status(201).json({ message: "Employee created successfully" });
    } catch (err) {
      next(err);
    }
  };

  // Update employee
  updateEmployee = async (req, res, next) => {
    try {
      const employee = await this.service.update(req.params.id, req.body);
      if (!employee) return res.status(404).json({ error: "Employee not found" });
      res.json(employee);
    } catch (err) {
      next(err);
    }
  };

  // Delete employee
  deleteEmployee = async (req, res, next) => {
    try {
      const deleted = await this.service.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Employee not found" });
      res.status(204).json({ message: "Employee deleted successfully" });
    } catch (err) {
      next(err);
    }
  };
}

export default new EmployeeController(EmployeeService);
