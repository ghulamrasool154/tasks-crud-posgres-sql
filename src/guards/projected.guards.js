const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const userServices = require("../services/user.services");
const errorConstants = require("../constants/error.constants");
const appConstants = require("../constants/app.constants");
const authGuard = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  const message = "You are not logged in! Please log in to get access.";

  if (!token) {
    return next(createHttpError.Unauthorized(message));
  }
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await userServices.getUserById(decoded.userId);
    req[appConstants.CURRENT_USER_KEY] = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        createHttpError.Unauthorized(errorConstants.REFRESH_TOKEN_EXPIRED)
      );
    } else if (error.name === "JsonWebTokenError") {
      return next(createHttpError.Unauthorized(errorConstants.INVALID_TOKEN));
    }
    return next(createHttpError.Unauthorized(error.message));
  }
};

module.exports = authGuard;
