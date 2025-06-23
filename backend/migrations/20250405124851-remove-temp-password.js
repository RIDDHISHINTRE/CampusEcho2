"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove temporaryPassword from Alumni


    // Remove temporaryPassword from Students
    await queryInterface.removeColumn("Student", "temporaryPassword");
  },

  async down(queryInterface, Sequelize) {
  

    // Re-add temporaryPassword to Students
    await queryInterface.addColumn("Student", "temporaryPassword", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};

