// models/Task.js
const { sequelize } = require("../config/sequelize");
const { DataTypes } = require("@sequelize/core");
const User = require("./user");
const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
  }
);

// Task.hasOne(User, { sourceKey: "userId", foreignKey: "id", as: "user" });
Task.belongsTo(User, { foreignKey: "userId" });

module.exports = Task;
