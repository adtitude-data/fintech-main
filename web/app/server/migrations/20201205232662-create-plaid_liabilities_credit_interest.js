"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("plaid_liabilities_credit_interest", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      client_id: {type: Sequelize.INTEGER, allowNull: false},
      inst_account_id: { type: Sequelize.INTEGER, allowNull: false },
      plaid_account_id: { type: Sequelize.INTEGER, allowNull: false },
      plaid_liabilities_credit_id: { type: Sequelize.INTEGER, allowNull: false },
      lci_apr_percentage: { type: Sequelize.STRING, allowNull: true },
      lci_apr_type: { type: Sequelize.STRING, allowNull: true },
      lci_balance_subject_to_apr: { type: Sequelize.STRING, allowNull: true },
      lci_interest_charge_amount: { type: Sequelize.STRING, allowNull: true },
      l_request_id: { type: Sequelize.STRING, allowNull: true },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("plaid_liabilities_credit_interest");
  },
};
