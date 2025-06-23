module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Alumni', 'role');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Alumni', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};

