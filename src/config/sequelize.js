const { Sequelize } = require("@sequelize/core");
const { PostgresDialect } = require("@sequelize/postgres");

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL database connected successfully");
  } catch (error) {
    console.error("❌ PostgreSQL connection error:", error);
  }
};
module.exports = { sequelize, connectToDatabase };
