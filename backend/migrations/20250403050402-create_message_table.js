"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Message", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            senderId: {
                type: Sequelize.INTEGER, // Refers to Student/Alumni ID
                allowNull: false
            },
            receiverId: {
                type: Sequelize.INTEGER, // Refers to Student/Alumni ID
                allowNull: false
            },
            message: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Message");
    }
};

