const createHttpError = require("http-errors");
const { User } = require("../entities");
const tryCatchFunction = require("../utils/try-catch");

class UserService {
  constructor() {}

  async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw createHttpError.NotFound("User not found " + id);
    }

    return user;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      throw createHttpError.NotFound("User not found " + email);
    }

    return user;
    return user.get({ plain: true });
  }
}

module.exports = new UserService();
