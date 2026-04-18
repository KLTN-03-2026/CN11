'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BankHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codebank: {
        type: Sequelize.STRING
      },
      codeorder:{
        type: Sequelize.STRING
      },
      codeuser: {
        type: Sequelize.STRING
      },
      codetable: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.STRING
      },
      method: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      hour: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        deèfaultValue: "pending"
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
    await queryInterface.dropTable('BankHistories');
  }
};