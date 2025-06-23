module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove profileImage column from Students and Alumni tables
    await queryInterface.removeColumn("Student", "profileImage");
    await queryInterface.removeColumn("Alumni", "profileImage");
  },

  async down(queryInterface, Sequelize) {
    // Re-add profileImage column to Students and Alumni tables in case of rollback
    await queryInterface.addColumn("Student", "profileImage", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Alumni", "profileImage", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};

