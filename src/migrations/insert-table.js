const { Task, User } = require("../entities");
const { sequelize } = require("../config/sequelize");
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
    await sequelize.sync(); // You can use { force: true } to reset tables
    console.log("Tables synced...");
  } catch (err) {
    console.error("DB sync failed:", err);
  }
};
syncDatabase()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
