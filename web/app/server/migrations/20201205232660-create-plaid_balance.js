"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("plaid_balance", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      client_id: {type: Sequelize.INTEGER, allowNull: false},
      inst_account_id: { type: Sequelize.INTEGER, allowNull: false },
      plaid_account_id: { type: Sequelize.STRING, allowNull: true }, // b_account_id renamed to plaid_account_id
      b_blanace_available: { type: Sequelize.STRING, allowNull: true },
      b_blanace_current: { type: Sequelize.STRING, allowNull: true },
      b_blanace_iso_currency_code: { type: Sequelize.STRING, allowNull: true },
      b_blanace_limit: { type: Sequelize.STRING, allowNull: true },
      b_mask: { type: Sequelize.STRING, allowNull: true },
      b_name: { type: Sequelize.STRING, allowNull: true },
      b_official_name: { type: Sequelize.STRING, allowNull: true },
      b_subtype: { type: Sequelize.STRING, allowNull: true },
      b_type: { type: Sequelize.STRING, allowNull: true },
      b_institution_id: { type: Sequelize.STRING, allowNull: true },
      b_item_id: { type: Sequelize.STRING, allowNull: true },
      b_request_id: { type: Sequelize.STRING, allowNull: true },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("plaid_balance");
  },
};
