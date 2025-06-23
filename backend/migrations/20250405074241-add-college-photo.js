'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Student', 'collegeIdPhoto', {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Student', 'collegeIdPhoto');
  }
};

