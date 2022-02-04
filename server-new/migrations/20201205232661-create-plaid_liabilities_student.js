"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("plaid_liabilities_student", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      client_id: {type: Sequelize.INTEGER, allowNull: false},
      account_id: { type: Sequelize.INTEGER, allowNull: false },
      ls_account_id: { type: Sequelize.STRING, allowNull: true },
      ls_account_number: { type: Sequelize.STRING, allowNull: true },
      ls_disbursement_dates: { type: Sequelize.STRING, allowNull: true },
      ls_expected_payoff_date: { type: Sequelize.STRING, allowNull: true },
      ls_guarantor: { type: Sequelize.STRING, allowNull: true },
      ls_interest_rate_percentage: { type: Sequelize.STRING, allowNull: true },
      ls_is_overdue: { type: Sequelize.STRING, allowNull: true },
      ls_last_payment_amount: { type: Sequelize.STRING, allowNull: true },
      ls_last_payment_date: { type: Sequelize.STRING, allowNull: true },
      ls_last_statement_balance: { type: Sequelize.STRING, allowNull: true },
      ls_last_statement_issue_date: { type: Sequelize.STRING, allowNull: true },
      ls_loan_name: { type: Sequelize.STRING, allowNull: true },
      ls_loan_status_end_date: { type: Sequelize.STRING, allowNull: true },
      ls_loan_status_type: { type: Sequelize.STRING, allowNull: true },
      ls_minimum_payment_amount: { type: Sequelize.STRING, allowNull: true },
      ls_next_payment_due_date: { type: Sequelize.STRING, allowNull: true },
      ls_origination_date: { type: Sequelize.STRING, allowNull: true },
      ls_origination_principal_amount: { type: Sequelize.STRING, allowNull: true },
      ls_outstanding_interest_amount: { type: Sequelize.STRING, allowNull: true },
      ls_payment_reference_number: { type: Sequelize.STRING, allowNull: true },
      ls_pslf_status_estimated_eligibility_date: { type: Sequelize.STRING, allowNull: true },
      ls_pslf_status_payments_made: { type: Sequelize.STRING, allowNull: true },
      ls_pslf_status_payments_remaining: { type: Sequelize.STRING, allowNull: true },
      ls_repayment_plan_description: { type: Sequelize.STRING, allowNull: true },
      ls_repayment_plan_type: { type: Sequelize.STRING, allowNull: true },
      ls_sequence_number: { type: Sequelize.STRING, allowNull: true },
      ls_servicer_address_city: { type: Sequelize.STRING, allowNull: true },
      ls_servicer_address_country: { type: Sequelize.STRING, allowNull: true },
      ls_servicer_address_postal_code: { type: Sequelize.STRING, allowNull: true },
      ls_servicer_address_region: { type: Sequelize.STRING, allowNull: true },
      ls_servicer_address_street: { type: Sequelize.STRING, allowNull: true },
      ls_ytd_interest_paid: { type: Sequelize.STRING, allowNull: true },
      ls_ytd_principal_paid: { type: Sequelize.STRING, allowNull: true },
      ls_request_id: { type: Sequelize.STRING, allowNull: true },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("plaid_liabilities_student");
  },
};
