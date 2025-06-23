module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Student", "isVerified", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("Student", "temporaryPassword", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Alumni", "isVerified", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.addColumn("Alumni", "temporaryPassword", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Student", "isVerified");
    await queryInterface.removeColumn("Student", "temporaryPassword");
    await queryInterface.removeColumn("Alumni", "isVerified");
    await queryInterface.removeColumn("Alumni", "temporaryPassword");
  },
};

