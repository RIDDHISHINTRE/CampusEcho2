module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('WorkExperiences', 'companyName', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('WorkExperiences', 'role', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('WorkExperiences', 'yearsOfExperience', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('WorkExperiences', 'companyName', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('WorkExperiences', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('WorkExperiences', 'yearsOfExperience', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};

