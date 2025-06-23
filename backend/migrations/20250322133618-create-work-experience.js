'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WorkExperiences', { // Table names are case-sensitive
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      alumniId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Alumni', // Ensure this matches the exact table name in DB
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      yearsOfExperience: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('WorkExperiences');
  },
};

