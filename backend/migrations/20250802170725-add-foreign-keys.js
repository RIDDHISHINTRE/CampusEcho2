'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('WorkExperience', 'alumniId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addConstraint('WorkExperience', {
      fields: ['alumniId'],
      type: 'foreign key',
      name: 'fk_workexperience_alumniId',
      references: {
        table: 'Alumni',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // --- JOBS: Drop and recreate alumniId with FK ---
    await queryInterface.removeColumn('Job', 'createdBy');

    await queryInterface.addColumn('Job', 'createdBy', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addConstraint('Job', {
      fields: ['createdBy'],
      type: 'foreign key',
      name: 'fk_jobs_alumniId',
      references: {
        table: 'Alumni',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    
   

    // --- WORK EXPERIENCES ---
    await queryInterface.removeConstraint('WorkExperience', 'fk_workexperience_alumniId');
    await queryInterface.removeColumn('WorkExperience', 'alumniId');
    await queryInterface.addColumn('WorkExperience', 'alumniId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    // --- JOBS ---
    await queryInterface.removeConstraint('Job', 'fk_jobs_alumniId');
    await queryInterface.removeColumn('Job', 'createdBy');
    await queryInterface.addColumn('Job', 'createdBy', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};

