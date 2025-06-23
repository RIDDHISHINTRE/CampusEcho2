'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update password column in Student table
    await queryInterface.changeColumn('Student', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Update password column in Alumni table
    await queryInterface.changeColumn('Alumni', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert password column in Student table
    await queryInterface.changeColumn('Student', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Revert password column in Alumni table
    await queryInterface.changeColumn('Alumni', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};

