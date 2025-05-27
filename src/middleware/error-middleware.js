const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;

  let message = err.message || "Internal Server Error";

  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = `${err.errors[0].path} must be unique ${err.errors[0].value}`;
  }
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    type: "error",
    message,
    error: { message, stack: err.stack },
  });
};

module.exports = errorMiddleware;
