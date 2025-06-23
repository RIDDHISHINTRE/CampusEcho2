module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Alumni', 'companyName');
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.addColumn('Alumni', 'companyName', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};

