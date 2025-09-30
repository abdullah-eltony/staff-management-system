import bcrypt from "bcrypt";
import Employee from "../models/employee.model.js";
import db from "../db.js";

class EmployeeService {
  // Dependency Injection of the database instance
  constructor(dbInstance) {
    this.db = dbInstance;
  }

  // Get all employees
  async getAll() {
    const result = await this.db.query("SELECT * FROM employees");
    // Map each row to an Employee instance without password
    return result.rows.map((row) => new Employee(row).toJSON());
  }

  // Get employee by ID
  async getById(id) {
    const result = await this.db.query(
      "SELECT * FROM employees WHERE employee_id=$1",
      [id]
    );
    if (result.rows.length === 0) return null;
    return new Employee(result.rows[0]);
  }

  // Create new employee
  async create(data) {
    const { name, email, role, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const result = await this.db.query(
        `INSERT INTO employees (name, email, role, password) 
         VALUES ($1, $2, $3, $4) 
         RETURNING employee_id, name, email, role, created_at, updated_at`,
        [name, email, role, hashedPassword]
      );

      return new Employee(result.rows[0]);
    } catch (err) {
      if (err.code === "23505") { // unique_violation
        const error = new Error("Email already exists");
        error.status = 400;
        throw error;
      }
      throw err;
    }
  }

  // Update employee
  async update(employee_id, data) {
    const { name, email, role, password } = data;

    let result;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      result = await this.db.query(
        `UPDATE employees 
         SET name=$1, email=$2, role=$3, password=$4, updated_at=NOW() 
         WHERE employee_id=$5 RETURNING *`,
        [name, email, role, hashedPassword, employee_id]
      );
    } else {
      result = await this.db.query(
        `UPDATE employees 
         SET name=$1, email=$2, role=$3, updated_at=NOW() 
         WHERE employee_id=$4 RETURNING *`,
        [name, email, role, employee_id]
      );
    }

    if (result.rows.length === 0) return null;
    return new Employee(result.rows[0]);
  }

  // Delete employee
  async delete(employee_id) {
    const result = await this.db.query(
      "DELETE FROM employees WHERE employee_id=$1 RETURNING *",
      [employee_id]
    );
    return result.rows.length > 0;
  }
}

// ✅ Export as singleton with db injected
export default new EmployeeService(db);
