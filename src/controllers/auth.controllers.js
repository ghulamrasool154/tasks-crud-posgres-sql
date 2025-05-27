const createHttpError = require("http-errors");
const handleResponse = require("../utils/handle-res");
const tryCatchFunction = require("../utils/try-catch");
const userServices = require("../services/user.services");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const appConstants = require("../constants/app.constants");
class AuthController {
  constructor() {
    this.login = tryCatchFunction(this.login.bind(this));
    this.refresh = tryCatchFunction(this.refresh.bind(this));
  }

  async login(req, res, next) {
    let ms = createHttpError.BadRequest("Email and password are required");
    if (!req.body) {
      return next(ms);
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ms);
    }
    const user = await userServices.getUserByEmail(email);
    const tokens = await this.#generateTokens(user.id);
    return handleResponse(res, 200, "Login successfully", tokens);
  }
  async refresh(req, res, next) {
    const refresh = createHttpError.BadRequest("Refresh token is required");
    if (!req.body) {
      return next(refresh);
    }
    if (!req.body.refreshToken) {
      return next(refresh);
    }

    try {
      const decoded = await promisify(jwt.verify)(
        req.body.refreshToken,
        process.env.JWT_SECRET
      );
      const user = await userServices.getUserById(decoded.userId);
      if (!user) {
        return next(createHttpError.Unauthorized("User not found"));
      }
      const tokens = await this.#generateTokens(user.id);

      return handleResponse(res, 200, "Refresh login successfully", tokens);
    } catch (error) {
      return next(createHttpError.Unauthorized(error.message));
    }
  }
  async #generateTokens(userId) {
    const secret = process.env.JWT_SECRET;
    const accessTokenExpiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
    const refreshTokenExpiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;
    const accessToken = jwt.sign({ userId }, secret, {
      expiresIn: accessTokenExpiresIn,
    });
    const refreshToken = jwt.sign({ userId }, secret, {
      expiresIn: refreshTokenExpiresIn,
    });

    return { accessToken, refreshToken };
  }
}

module.exports = new AuthController();
