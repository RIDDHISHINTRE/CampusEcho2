module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn("Student", "profileImage", { type: Sequelize.STRING });
    await queryInterface.addColumn("Student", "bio", { type: Sequelize.TEXT });


    await queryInterface.addColumn("Alumni", "profileImage", { type: Sequelize.STRING });
    await queryInterface.addColumn("Alumni", "bio", { type: Sequelize.TEXT });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn("Student", "profileImage");
    await queryInterface.removeColumn("Student", "bio");


    await queryInterface.removeColumn("Alumni", "profileImage");
    await queryInterface.removeColumn("Alumni", "bio");
  }
};
