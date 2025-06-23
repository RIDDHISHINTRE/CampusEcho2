module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Student", "isAdmin", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // 👈 Default value is false
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Student", "isAdmin");
  },
};

