const routes = require("express").Router();
const userRoutes = require("./user.routes");
const taskRoutes = require("./task.routes");
const authRoutes = require("./auth.routes");
const authGuard = require("../guards/projected.guards");

routes.use("/users", userRoutes);
routes.use("/tasks", authGuard, taskRoutes);
routes.use("/auth", authRoutes);

module.exports = routes;
