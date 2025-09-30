import Report from "../models/report.model.js";
import db from "../db.js";

class ReportService {
  constructor(db) {
    this.db = db;
  }

  async create({ task_id, title, content, ai_summary }) {
    const result = await this.db.query(
      `INSERT INTO reports (task_id, title, content, ai_summary)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [task_id, title, content, ai_summary]
    );
    return new Report(result.rows[0]);
  }

  async getAll({ employee_id, role }) {
    let result;

    if (role !== "admin" && role !== "manager") {
      result = await this.db.query(
        `SELECT r.id, r.title, r.created_at, t.title AS task_title
         FROM reports r
         JOIN tasks t ON r.task_id = t.task_id
         WHERE t.assigned_employee_id = $1
         ORDER BY r.created_at DESC`,
        [employee_id]
      );
    } else {
      result = await this.db.query(
        `SELECT r.id, r.title, r.created_at, e.name AS employee_name, t.title AS task_title
         FROM reports r
         JOIN tasks t ON r.task_id = t.task_id
         JOIN employees e ON t.assigned_employee_id = e.employee_id
         ORDER BY r.created_at DESC`
      );
    }

    return result.rows;
  }

  async getById(id) {
    const result = await this.db.query(
      `
      SELECT
        r.*,
        t.title AS task_title,
        e.name AS employee_name
      FROM reports r
      JOIN tasks t ON r.task_id = t.task_id
      JOIN employees e ON t.assigned_employee_id = e.employee_id
      WHERE r.id = $1
      `,
      [id]
    );
    if (!result.rows[0]) return null;
    return result.rows[0];
  }

  async delete(id) {
    const result = await this.db.query(
      `DELETE FROM reports WHERE id = $1 RETURNING *`,
      [id]
    );
    if (!result.rows[0]) return null;
    return new Report(result.rows[0]);
  }
}


  export default new ReportService(db);
