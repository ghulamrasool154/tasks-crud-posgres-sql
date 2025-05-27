const { User } = require("../entities");
const handleResponse = require("../utils/handle-res");
const tryCatchFunction = require("../utils/try-catch");
const userServices = require("../services/user.services");
const createHttpError = require("http-errors");
const appConstants = require("../constants/app.constants");

class UserController {
  constructor() {
    this.createUser = tryCatchFunction(this.createUser);
    this.getAllUsers = tryCatchFunction(this.getAllUsers);
    this.getUserById = tryCatchFunction(this.getUserById);
    this.updateUser = tryCatchFunction(this.updateUser);
    this.deleteUser = tryCatchFunction(this.deleteUser);
  }

  async createUser(req, res) {
    const user = await User.create(req.body);
    return handleResponse(res, 201, "User created successfully", user);
  }

  async getAllUsers(req, res) {
    const result = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return handleResponse(res, 200, "Users fetched successfully", result);
  }

  async getUserById(req, res, next) {
    const user = await userServices.getUserById(req.params.id);
    return handleResponse(res, 200, "User fetched successfully", user);
  }

  async currentMe(req, res) {
    const id = req[appConstants.CURRENT_USER_KEY].id;
    const user = await userServices.getUserById(id);

    return handleResponse(res, 200, "My fetched successfully", user);
  }

  async updateUser(req, res) {
    const { id } = req.params;
    res.json({ message: `User ${id} updated` });
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    res.json({ message: `User ${id} deleted` });
  }
}

module.exports = new UserController();
