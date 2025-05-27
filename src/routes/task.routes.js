const taskRoutes = require("express").Router();
const taskController = require("../controllers/task.controllers");

taskRoutes
  .route("/")
  .get(taskController.getAllTasks)
  .post(taskController.createTask);
taskRoutes.route("/:userId/tasks").get(taskController.getTasksByUserId);

module.exports = taskRoutes;
