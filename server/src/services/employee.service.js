import db from "../db.js";
import BaseService from "./BaseServices.js";
import hashPassword from "../utils/hashPassword.js";
import Employee from '../models/employee.model.js'

class EmployeeService extends BaseService {
    constructor() {
        super(db, 'employees', 'employee_id'); // inject db + table name
    }

    // override getAll to exclude some fields
    async getAll() {
        const result = await this.db.query(`SELECT * FROM ${this.tableName}`);
        return result.rows.map(row => {
            const employee = new Employee(row);
            return employee.toJSON();
        });
    }

    // Override create method to handle password hashing
    async create(data) {
        if (data.password) {
            data.password = await hashPassword(data.password);
        }

        try {
            return await super.create(data);
        } catch (err) {
          // PostgreSQL unique_violation
            if (err.code === '23505') { 
                const error = new Error('Email already exists');
                error.status = 400;
                throw error;
            }
            throw err;
        }
    }

    // Override update method to handle password hashing
    async update(id, data) {
        if (data.password) {
            data.password = await hashPassword(data.password);
        }
        return super.update(id, data);
    }
}

export default new EmployeeService();
