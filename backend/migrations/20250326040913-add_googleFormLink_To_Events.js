module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Event1s", "googleFormLink", {
      type: Sequelize.STRING,
      allowNull: true, // Optional field
      validate: {
        isUrl: true, // Ensures valid URL format
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Event1s", "googleFormLink");
  },
};
