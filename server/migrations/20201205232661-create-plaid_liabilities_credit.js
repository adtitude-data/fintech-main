"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("plaid_liabilities_credit", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      client_id: {type: Sequelize.INTEGER, allowNull: false},
      account_id: { type: Sequelize.INTEGER, allowNull: false },
      l_account_id: { type: Sequelize.STRING, allowNull: true },
      l_is_overdue: { type: Sequelize.STRING, allowNull: true },
      l_last_payment_amount: { type: Sequelize.STRING, allowNull: true },
      l_last_payment_date: { type: Sequelize.STRING, allowNull: true },
      l_last_statement_balance: { type: Sequelize.STRING, allowNull: true },
      l_last_statement_issue_date: { type: Sequelize.STRING, allowNull: true },
      l_minimum_payment_amount: { type: Sequelize.STRING, allowNull: true },
      l_next_payment_due_date: { type: Sequelize.STRING, allowNull: true },
      l_request_id: { type: Sequelize.STRING, allowNull: true },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("plaid_liabilities_credit");
  },
};
