class BaseService {
  constructor(dbinstance, tableName , PK='id') {
    this.db = dbinstance;
    this.tableName = tableName;
    this.PK = PK;
  }

  // get all records from the table
  async getAll() {
    const result = await this.db.query(`SELECT * FROM ${this.tableName}`);
    return result.rows;
  }

  // get a single record by id
  // abstract method to be implemented in subclasses
  async getById() {}

  // create a new record
  async create(data) {
    // Extract keys and values from the data object
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(", "); // "$1, $2, $3, ..."

    // Construct the INSERT query
    const result = await this.db.query(
      `INSERT INTO ${this.tableName} (${keys.join(
        ", "
      )}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return result.rows[0];
  }

  // update a record by id
  async update(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    // Construct the SET part of the UPDATE query
    const setString = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const result = await this.db.query(
      `UPDATE ${
        this.tableName
      } SET ${setString}, updated_at=NOW() WHERE ${this.PK} = $${
        keys.length + 1
      } RETURNING *`,
      [...values, id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  // delete a record by id
  async delete(id) {
    const result = await this.db.query(
      `DELETE FROM ${this.tableName} WHERE ${this.PK} = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }
}

export default BaseService;
