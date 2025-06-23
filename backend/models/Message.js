const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Message = sequelize.define("Message", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    senderId: {
        type: DataTypes.INTEGER,  // Matches Student/Alumni ID
        allowNull: false
    },
    receiverId: {
        type: DataTypes.INTEGER,  // Matches Student/Alumni ID
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    isRead :{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},{
    tableName :'Message'
    ,timestamps: true
 });

module.exports = Message;

