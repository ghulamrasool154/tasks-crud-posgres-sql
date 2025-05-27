const handleResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success: true,
    type: "success",
    status: statusCode,
    message: message,
    data: data,
  });
};
module.exports = handleResponse;
