const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Job = sequelize.define("Job", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    applicationLink: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    location: {  // Job location (city, state, or "Remote")
        type: DataTypes.STRING,
        allowNull: false,
    },
    eligibility: {  // Eligibility criteria for the job
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdBy: {  // ID of the alumni who created the job
        type: DataTypes.INTEGER,  // Same type as Alumni ID
        allowNull: false,
    }
} ,{
    tableName :'Job'
    ,timestamps: true
 });

module.exports = Job;


