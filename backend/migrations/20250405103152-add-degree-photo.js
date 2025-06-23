'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Alumni', 'DegreePhoto', {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Alumni', 'DegreePhoto');
  }
};