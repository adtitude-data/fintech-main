"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("plaid_investments_holdings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      client_id: {type: Sequelize.INTEGER, allowNull: false},
      inst_account_id: { type: Sequelize.INTEGER, allowNull: false },
      plaid_account_id: { type: Sequelize.STRING, allowNull: false },
      h_account_id: { type: Sequelize.STRING, allowNull: false },
      h_cost_basis: { type: Sequelize.STRING, allowNull: true },
      h_institution_price: { type: Sequelize.STRING, allowNull: true },
      h_institution_price_as_of: { type: Sequelize.STRING, allowNull: true },
      h_institution_value: { type: Sequelize.STRING, allowNull: true },
      h_iso_currency_code: { type: Sequelize.STRING, allowNull: true },
      h_quantity: { type: Sequelize.STRING, allowNull: true },
      h_security_id: { type: Sequelize.STRING, allowNull: true },
      h_unofficial_currency_code: { type: Sequelize.STRING, allowNull: true },
      h_request_id: { type: Sequelize.STRING, allowNull: true },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("plaid_investments_holdings");
  },
};
