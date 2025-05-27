const authRoutes = require("express").Router();
const authController = require("../controllers/auth.controllers");
const authGuard = require("../guards/projected.guards");
authRoutes.route("/login").post(authController.login);
authRoutes.route("/refresh-login").post(authController.refresh);

module.exports = authRoutes;
