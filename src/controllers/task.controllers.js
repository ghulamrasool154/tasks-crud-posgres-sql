const tryCatchFunction = require("../utils/try-catch");
const handleResponse = require("../utils/handle-res");
const { Task, User } = require("../entities");
const appConstants = require("../constants/app.constants");
class TasksController {
  constructor() {
    this.createTask = tryCatchFunction(this.createTask);
    this.getAllTasks = tryCatchFunction(this.getAllTasks);
    this.getTaskById = tryCatchFunction(this.getTaskById);
    this.updateTask = tryCatchFunction(this.updateTask);
    this.deleteTask = tryCatchFunction(this.deleteTask);
  }
  async createTask(req, res) {
    const user = req[appConstants.CURRENT_USER_KEY];
    const result = await Task.create({ ...req.body, userId: user.id });
    return handleResponse(res, 201, "User created successfully", result);
  }
  async getAllTasks(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;

    const { count, rows } = await Task.findAndCountAll({
      limit,
      offset,
      include: {
        model: User,
        attributes: ["id", "name", "email"],
      },
    });
    return handleResponse(res, 200, "Tasks fetched successfully", {
      totalItems: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      tasks: rows,
    });
  }
  async getTasksByUserId(req, res, next) {
    const userId = req.params.userId;
    if (!userId) {
      return next(createHttpError.BadRequest("User ID is required"));
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Task.findAndCountAll(
      {
        where: { userId: userId },
      },
      {
        limit,
        offset,
      }
    );
    return handleResponse(res, 200, "Tasks By User fetched successfully", {
      totalItems: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      tasks: rows,
    });
  }
  async updateTask(req, res) {
    return handleResponse(res, 200, "User created successfully");
  }
  async deleteTask(req, res) {
    return handleResponse(res, 200, "User created successfully");
  }
}
module.exports = new TasksController();
