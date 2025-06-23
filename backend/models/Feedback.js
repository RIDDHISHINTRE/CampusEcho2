const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Feedback = sequelize.define(
  "Feedback",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userType: {
      type: DataTypes.STRING, // "student" or "alumni"
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        if (value) {
          this.setDataValue("name", value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Feedback",
    timestamps: true,
  }
);

module.exports = Feedback;
