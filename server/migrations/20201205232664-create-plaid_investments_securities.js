"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("plaid_investments_securities", {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      client_id: {type: Sequelize.INTEGER, allowNull: false},
      account_id: { type: Sequelize.INTEGER, allowNull: false },
      s_close_price: { type: Sequelize.STRING, allowNull: true },
      s_close_price_as_of: { type: Sequelize.STRING, allowNull: true },
      s_cusip: { type: Sequelize.STRING, allowNull: true },
      s_institution_id: { type: Sequelize.STRING, allowNull: true },
      s_institution_security_id: { type: Sequelize.STRING, allowNull: true },
      s_is_cash_equivalent: { type: Sequelize.STRING, allowNull: true },
      s_isin: { type: Sequelize.STRING, allowNull: true },
      s_iso_currency_code: { type: Sequelize.STRING, allowNull: true },
      s_name: { type: Sequelize.STRING, allowNull: true },
      s_proxy_security_id: { type: Sequelize.STRING, allowNull: true },
      s_security_id: { type: Sequelize.STRING, allowNull: true },
      s_sedol: { type: Sequelize.STRING, allowNull: true },
      s_ticker_symbol: { type: Sequelize.STRING, allowNull: true },
      s_type: { type: Sequelize.STRING, allowNull: true },
      s_unofficial_currency_code: { type: Sequelize.STRING, allowNull: true },
      s_request_id: { type: Sequelize.STRING, allowNull: true },
      created_at: { allowNull: true, type: Sequelize.DATE },
      updated_at: { allowNull: true, type: Sequelize.DATE}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("plaid_investments_securities");
  },
};
