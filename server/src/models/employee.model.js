class Employee {
  // Private properties
  #employee_id;
  #name;
  #email;
  #password;
  #role;
  #created_at;
  #updated_at;

  constructor({ employee_id, name, email, password, role, created_at, updated_at }) {
    this.#employee_id = employee_id;
    this.#name = name;
    this.#email = email;
    this.#password = password; 
    this.#role = role;
    this.#created_at = created_at;
    this.#updated_at = updated_at;
  }

  // Serialize to JSON (excluding password)
  toJSON() {
    return {
      employee_id: this.#employee_id,
      name: this.#name,
      email: this.#email,
      role: this.#role,
    };
  }
}



export default Employee;
