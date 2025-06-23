module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn("Message", "isRead", {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn("Message", "isRead");
  },
};

