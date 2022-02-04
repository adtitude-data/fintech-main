"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("plaid_liabilities_mortgage", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      client_id: {type: Sequelize.INTEGER, allowNull: false},
      account_id: { type: Sequelize.INTEGER, allowNull: false },
      lm_account_id: { type: Sequelize.STRING, allowNull: true },
      lm_account_number: { type: Sequelize.STRING, allowNull: true },
      lm_current_late_fee: { type: Sequelize.STRING, allowNull: true },
      lm_escrow_balance: { type: Sequelize.STRING, allowNull: true },
      lm_has_pmi: { type: Sequelize.STRING, allowNull: true },
      lm_has_prepayment_penalty: { type: Sequelize.STRING, allowNull: true },
      lm_interest_rate_percentage: { type: Sequelize.STRING, allowNull: true },
      lm_interest_rate_type: { type: Sequelize.STRING, allowNull: true },
      lm_last_payment_amount: { type: Sequelize.STRING, allowNull: true },
      lm_last_payment_date: { type: Sequelize.STRING, allowNull: true },
      lm_loan_term: { type: Sequelize.STRING, allowNull: true },
      lm_loan_type_description: { type: Sequelize.STRING, allowNull: true },
      lm_maturity_date: { type: Sequelize.STRING, allowNull: true },
      lm_next_monthly_payment: { type: Sequelize.STRING, allowNull: true },
      lm_next_payment_due_date: { type: Sequelize.STRING, allowNull: true },
      lm_origination_date: { type: Sequelize.STRING, allowNull: true },
      lm_origination_principal_amount: { type: Sequelize.STRING, allowNull: true },
      lm_past_due_amount: { type: Sequelize.STRING, allowNull: true },
      lm_property_address_city: { type: Sequelize.STRING, allowNull: true },
      lm_property_address_country: { type: Sequelize.STRING, allowNull: true },
      lm_property_address_postal_code: { type: Sequelize.STRING, allowNull: true },
      lm_property_address_region: { type: Sequelize.STRING, allowNull: true },
      lm_property_address_street: { type: Sequelize.STRING, allowNull: true },
      lm_ytd_interest_paid: { type: Sequelize.STRING, allowNull: true },
      lm_ytd_principal_paid: { type: Sequelize.STRING, allowNull: true },
      lm_request_id: { type: Sequelize.STRING, allowNull: true },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("plaid_liabilities_mortgage");
  },
};
