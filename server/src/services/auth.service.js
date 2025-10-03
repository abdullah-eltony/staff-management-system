import config from "../config/config.js";
import pool from "../db.js";
import {
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/auth.utils.js";

class AuthService {
  constructor(db) {
    this.db = db;
  }

  async login(email, password) {
    // check employee exist
    const { rows } = await this.db.query(
      `SELECT employee_id, name, email, role, password, refresh_token 
     FROM employees 
     WHERE email = $1`,
      [email]
    );

    const employee = rows[0];
    if (!employee) {
      throw this._error("Invalid email or password", 400);
    }

    // check password
    const isValidPassword = await verifyPassword(password, employee.password);
    if (!isValidPassword) {
      throw this._error("Invalid email or password", 400);
    }
    // payload
    const payload = { sub: employee.employee_id, role: employee.role };

    // tokens generation
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // update refresh-token in db
    await this.db.query(
      "UPDATE employees SET refresh_token = $1 WHERE employee_id = $2",
      [refreshToken, employee.employee_id]
    );

    // exclude passowrd for security
    const user = {
      id: employee.employee_id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };

    return { accessToken, refreshToken, user };
  }

  async refreshToken(refreshToken) {
    const payload = verifyToken(refreshToken, config.JWT_REFRESH_SECRET);
    if (!payload) throw this._error("Invalid refresh token", 401);

    const { rows } = await this.db.query(
      "SELECT employee_id, role FROM employees WHERE employee_id = $1 AND refresh_token = $2",
      [payload.sub, refreshToken]
    );

    if (!rows.length) throw this._error("Refresh token not found", 401);

    // new payload
    const cleanPayload = {
      sub: rows[0].employee_id,
      role: rows[0].role,
    };

    return { accessToken: generateAccessToken(cleanPayload) };
  }

  async logout(userId) {
    await this.db.query(
      "UPDATE employees SET refresh_token = NULL WHERE employee_id = $1",
      [userId]
    );
    return { message: "Logged out successfully" };
  }

  _error(msg, status) {
    const err = new Error(msg);
    err.status = status;
    return err;
  }
}

export default new AuthService(pool);
