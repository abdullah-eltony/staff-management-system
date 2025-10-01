import express from "express";
import EmployeeController from "../controllers/employee.controller.js";
import apiKeyLogger from "../middlewares/apiKeyLogger.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import Validator from "../middlewares/ValidatorMiddleware.js";
import { createEmployeeSchema, updateEmployeeSchema } from "../validator/employeeValidator.js";
const employeeRouter = express.Router();

// Validators
const createEmployeeValidator = new Validator(createEmployeeSchema);
const updateEmployeeValidator = new Validator(updateEmployeeSchema);

// get all employees
employeeRouter.get(
  "/",
  apiKeyLogger,
  authMiddleware,
  EmployeeController.getAllEmployees
);
// get employee by ID
employeeRouter.get(
  "/:id",
  apiKeyLogger,
  EmployeeController.getEmployeeById
);
// create new employee
employeeRouter.post(
  "/add",
  apiKeyLogger,
  authMiddleware,
  createEmployeeValidator.validate,
  authorizeRoles("admin", "manager"),
  EmployeeController.createEmployee
);
// update employee
employeeRouter.put(
  "/:id",
  apiKeyLogger,
  authMiddleware,
  updateEmployeeValidator.validate,
  EmployeeController.updateEmployee
);
// delete employee
employeeRouter.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "manager"),
  EmployeeController.deleteEmployee
);

export default employeeRouter;
