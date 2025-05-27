const app = require("./app");
const { databaseConnection } = require("./config/db.config");
const { connectToDatabase } = require("./config/sequelize");
const { syncDatabase } = require("./entities");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// PostgreSQL DATABASE CONNECTION
const startServer = async () => {
  try {
    // Connect to PostgreSQL database
    await connectToDatabase();

    const PORT = process.env.PORT || 9090;
    app.listen(PORT, () => {
      console.log(`✅ NodeJS Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  // process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  appServer.close(() => {
    console.log("💥 Process terminated!");
  });
});
// Start the server
startServer();
