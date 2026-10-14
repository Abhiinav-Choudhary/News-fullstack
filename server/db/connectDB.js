import "dotenv/config";
import pg from "pg";

// console.log("Connecting to Database Endpoint:", process.env.DATABASE_URL);
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;