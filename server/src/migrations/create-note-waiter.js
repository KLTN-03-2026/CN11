'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NoteWaiters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codenote: {
        type: Sequelize.STRING
      },
      codeuser: {
        type: Sequelize.STRING
      },
      codehour: {
        type: Sequelize.STRING
      },
      codetable: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      des: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NoteWaiters');
  }
};