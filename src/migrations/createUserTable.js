// migrations/createUserTable.js
const pool = require("../config/db.config");

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await pool.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT,
    userId INTEGER
  );
`);

    console.log("User tasks created ✅");
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    await pool.end();
  }
};

createTable();
