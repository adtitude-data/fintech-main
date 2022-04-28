"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("app_plaid_accounts", {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      inst_account_id: {type: Sequelize.INTEGER, allowNull: false},
      plaid_account_id: {type: Sequelize.STRING, allowNull: false},
      status: {type: Sequelize.INTEGER, allowNull: false},
      created_at: { allowNull: true, type: Sequelize.DATE }, 
      updated_at: { allowNull: true, type: Sequelize.DATE}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("app_plaid_accounts");
  },
};
