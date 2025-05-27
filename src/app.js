require("dotenv").config();
const express = require("express");
const allRoutes = require("./routes");
const app = express();
const morgan = require("morgan");
const errorMiddleware = require("./middleware/error-middleware");
const createError = require("http-errors");
const cors = require("cors");
const createHttpError = require("http-errors");
const path = require("path");
const taskControllers = require("./controllers/task.controllers");
const { Task, User } = require("./entities");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", path.join(__dirname, "public", "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { title: "Hey", message: "Hello there!" });
});
app.get("/tasks", async (req, res) => {
  const data = await Task.findAll({
    include: {
      model: User,
      attributes: ["id", "name", "email"],
    },
  });
  res.render("tasks", { data });
});

app.get("/add-tasks", async (req, res) => {
  // const { title, description, status, userId } = req.body;
  // // Create new task logic (save to DB)
  // await Task.create({ title, description, status, userId });
  // res.redirect("/tasks"); // Redirect to task list page
  res.render("add-tasks");
});
app.post("/tasks", async (req, res) => {
  const { title, description, status } = req.body;
  // // Create new task logic (save to DB)
  await Task.create({ title, description, status, userId: 70 });
  res.redirect("/tasks"); // Redirect to task list page
  // res.render("add-tasks");
});

app.use("/api", allRoutes);

// app.all("*", (req, res, next) => {
// //   next(createHttpError.NotFound("Not Found" + req.originalUrl));
// });

app.all(/.*/, (req, res, next) => {
  next(createHttpError.NotFound("Not Found" + req.originalUrl));
});
// GLOBAL ERROR MIDDLEWARE
app.use(errorMiddleware);

module.exports = app;
