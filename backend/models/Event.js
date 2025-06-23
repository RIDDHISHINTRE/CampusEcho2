const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event1 = sequelize.define("Event1", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    EventImage : {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
    },
    googleFormLink: {  // ✅ Optional field for judge application
        type: DataTypes.STRING,
        allowNull: true,  // Not required for all events
        validate: {
            isUrl: true, // Ensures valid URL format
        }
    },
    createdBy: {
        type: DataTypes.STRING, // Assuming alumni ID
        allowNull: false,
    }
});

module.exports = Event1;