import db from "../db.js"
import Task from "../models/task.model.js";
import BaseService from "./BaseServices.js";

// class TaskService {
//   constructor(db) {
//     this.db = db;
//   }

//   async getAll({ employee_id, role }) {
//     const baseQuery = `
//       SELECT t.*, e.email AS employee_email
//       FROM tasks t
//       LEFT JOIN employees e ON t.assigned_employee_id = e.employee_id
//     `;

//     let result;
//     if (role !== "admin" && role !== "manager") {
//       result = await this.db.query(
//         `${baseQuery} WHERE e.employee_id = $1`,
//         [employee_id]
//       );
//     } else {
//       result = await this.db.query(baseQuery);
//     }

//     return result.rows;
//   }

//   async getTasksByEmployee(employee_id) {
//     const result = await this.db.query(
//       `SELECT * FROM tasks WHERE assigned_employee_id = $1`,
//       [employee_id]
//     );
//     return result.rows.map((row) => new Task(row));
//   }

//   async getById(task_id) {
//     const result = await this.db.query(
//       `SELECT 
//         t.*,
//         e.employee_id AS assigned_employee_id, 
//         e.name AS employee_name, 
//         e.email AS employee_email, 
//         e.role AS employee_role
//        FROM tasks t
//        LEFT JOIN employees e ON e.employee_id = t.assigned_employee_id
//        WHERE t.task_id = $1`,
//       [task_id]
//     );

//     if (result.rows.length === 0) return null;
//     return result.rows[0];
//   }

//   async create(data) {
//     const { title, description, assigned_employee_id } = data;

//     if (assigned_employee_id && assigned_employee_id !== null) {
//       await this.#checkEmployeeExists(assigned_employee_id);
//     }

//     await this.db.query(
//       `INSERT INTO tasks (title, description, assigned_employee_id)
//        VALUES($1,$2,$3) RETURNING *`,
//       [title, description, assigned_employee_id || null]
//     );

//   }

//   async update(task_id, data) {
//     const { title, description, status, assigned_employee_id } = data;

//     if (assigned_employee_id && assigned_employee_id !== null) {
//       await this.#checkEmployeeExists(assigned_employee_id);
//     }

//     const result = await this.db.query(
//       `UPDATE tasks
//        SET title=$1, description=$2, status=$3, assigned_employee_id=$4, updated_at=NOW()
//        WHERE task_id=$5 RETURNING *`,
//       [title, description, status, assigned_employee_id || null, task_id]
//     );

//     if (result.rows.length === 0) return null;
//     return new Task(result.rows[0]);
//   }

//   async updateStatus(task_id, status) {
//     const result = await this.db.query(
//       `UPDATE tasks
//        SET status=$1, updated_at=NOW()
//        WHERE task_id=$2 RETURNING *`,
//       [status, task_id]
//     );

//     if (result.rows.length === 0) return null;
//     return new Task(result.rows[0]);
//   }

//   async delete(task_id) {
//     const result = await this.db.query(
//       "DELETE FROM tasks WHERE task_id=$1 RETURNING *",
//       [task_id]
//     );
//     return result.rows.length > 0;
//   }

//   // Private helper method
//   async #checkEmployeeExists(employeeId) {
//     const result = await this.db.query(
//       `SELECT 1 FROM employees WHERE employee_id = $1 LIMIT 1`,
//       [employeeId]
//     );

//     if (result.rows.length === 0) {
//       const error = new Error(`Employee with id ${employeeId} does not exist`);
//       error.status = 404;
//       throw error;
//     }
//   }
// }

class TaskService extends BaseService {
  constructor() {
    super(db, 'tasks', 'task_id');
  }

  // Override getAll to implement role-based access
  async getAll({ employee_id, role }) {
    const baseQuery = `
      SELECT t.*, e.email AS employee_email
      FROM ${this.tableName} t
      LEFT JOIN employees e ON t.assigned_employee_id = e.employee_id
    `;

    let result;
    if (role !== "admin" && role !== "manager") {
      result = await this.db.query(
        `${baseQuery} WHERE e.employee_id = $1`,
        [employee_id]
      );
    } else {
      result = await this.db.query(baseQuery);
    }
    return result.rows;
  }

  // Override getById to include employee details
  async getById(task_id) {
    const result = await this.db.query(
      `SELECT 
        t.*,
        e.employee_id AS assigned_employee_id, 
        e.name AS employee_name, 
        e.email AS employee_email, 
        e.role AS employee_role
       FROM ${this.tableName} t
       LEFT JOIN employees e ON e.employee_id = t.assigned_employee_id
       WHERE t.task_id = $1`,
      [task_id]
    );
    if (!result.rows[0]) return null;
    return result.rows[0];
  }

  // Additional methods specific to TaskService
  async getTasksByEmployee(employee_id) {
    const result = await this.db.query(
      `SELECT * FROM ${this.tableName} WHERE assigned_employee_id = $1`,
      [employee_id]
    );
    return result.rows.map((row) => new Task(row));
  }

  // additional method specific to TaskService
  async updateStatus(task_id, status) {
    const result = await this.db.query(
      `UPDATE ${this.tableName}
       SET status=$1, updated_at=NOW()
       WHERE task_id=$2 RETURNING *`,
      [status, task_id]
    );
    if (!result.rows[0]) return null;
    return result.rows[0];
  }

}



// ✅ Export as singleton with db injected
export default new TaskService(db);
