const userRoutes = require("express").Router();
const userController = require("../controllers/user.controllers");
const authGuard = require("../guards/projected.guards");

userRoutes
  .route("/")
  .get(authGuard, userController.getAllUsers)
  .post(userController.createUser);

userRoutes.route("/me").get(authGuard, userController.currentMe);
userRoutes.route("/:id").get(authGuard, userController.getUserById);

module.exports = userRoutes;
