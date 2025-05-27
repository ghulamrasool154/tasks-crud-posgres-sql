require("dotenv").config();
const express = require("express");
const allRoutes = require("./routes");
const app = express();
const morgan = require("morgan");
const errorMiddleware = require("./middleware/error-middleware");
const createError = require("http-errors");
const cors = require("cors");
const createHttpError = require("http-errors");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", allRoutes);

// app.all("*", (req, res, next) => {
// //   next(createHttpError.NotFound("Not Found" + req.originalUrl));
// });

app.all(/.*/, (req, res, next) => {
  next(createHttpError.NotFound("Not Found" + req.originalUrl));
});
// GLOBAL ERROR MIDDLEWARE
app.use(errorMiddleware);

module.exports = app;
