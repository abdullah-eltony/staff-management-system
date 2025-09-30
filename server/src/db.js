import { Pool } from "pg";
import config from "./config/config.js";

// Singleton Database class to manage PostgreSQL connections
class Database {
  static instance;

  // Private constructor to prevent direct instantiation
  constructor() {
    if (Database.instance) return Database.instance;

    // Initialize the connection pool
    this.pool = new Pool(config.db);
    Database.instance = this;


    // Handle unexpected errors on the pool
    this.pool.on("error", async (err) => {
      console.error("Unexpected error on idle client:", err.message);
      await this.retryConnection();
    });
  }

  async connect() {
    try {
      // Test the connection
      const client = await this.pool.connect();
      console.log("Connected to PostgreSQL successfully");
      client.release();
    } catch (err) {
      console.error("Could not connect to PostgreSQL:", err.message);
      await this.retryConnection();
    }
  }

  // Retry connection logic with exponential backoff 
  async retryConnection() {
    let retries = 0;
    const maxRetries = 5;

    while (retries < maxRetries) {
      retries++;
      console.log(`🔄 Retry attempt ${retries}/${maxRetries}...`);

      try {
        this.pool = new Pool(config.db);
        const client = await this.pool.connect();
        console.log("Reconnected to PostgreSQL successfully");
        client.release();
        return;
      } catch (err) {
        console.error("Retry failed:", err.message);
        await new Promise((res) => setTimeout(res, retries * 2000));
      }
    }

    console.error("Could not reconnect after several attempts. Exiting...");
    process.exit(-1);
  }

  // Method to execute queries instadead of using pool directly
  async query(text, params) {
    try {
      const result = await this.pool.query(text, params);
      return result;
    } catch (err) {
      console.error("Query error:", err.message);
      throw err;
    }
  }
}

// Export a singleton instance of the Database class
const db = new Database();
await db.connect();

export default db;
