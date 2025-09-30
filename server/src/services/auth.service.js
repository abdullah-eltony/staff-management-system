// services/auth.service.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import config from "../config/config.js";

class AuthService {
  constructor(db) {
    this.db = db;
  }

  async login(email, password) {
    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.status = 400;
      throw error;
    }

    const { rows } = await this.db.query(
      "SELECT employee_id, name, email, role, password FROM employees WHERE email = $1",
      [email]
    );

    if (rows.length === 0) {
      const error = new Error("Invalid email or password");
      error.status = 400;
      throw error;
    }

    const employee = rows[0];

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.status = 400;
      throw error;
    }

    // Generate JWT 
    const payload = {
      sub: employee.employee_id, 
      role: employee.role,
    };

    // Sign the JWT
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "1h" });

    return {
      token,
      employee: {
        id: employee.employee_id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    };
  }
}

export default new AuthService(pool);
