'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Event1s', 'EventImage', {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Event1s', 'EventImage');
  }
};
