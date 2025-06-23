const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const WorkExperience = sequelize.define(
  "WorkExperience",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    alumniId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Alumni", // Reference the table name
        key: "id",
      },
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        if (value) {
          this.setDataValue("companyName", value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
        }
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    yearsOfExperience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "WorkExperience",
    timestamps: true,
  }
);

module.exports = WorkExperience;

