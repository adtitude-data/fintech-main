"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class PlaidLiabilitiesStudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlaidLiabilitiesStudent.init(
    {
      client_id: {type: DataTypes.INTEGER, allowNull: false},
      inst_account_id: { type: DataTypes.INTEGER, allowNull: false },
      plaid_account_id: { type: DataTypes.STRING, allowNull: true },
      ls_account_id: { type: DataTypes.STRING, allowNull: true },
      ls_account_number: { type: DataTypes.STRING, allowNull: true },
      ls_disbursement_dates: { type: DataTypes.STRING, allowNull: true },
      ls_expected_payoff_date: { type: DataTypes.STRING, allowNull: true },
      ls_guarantor: { type: DataTypes.STRING, allowNull: true },
      ls_interest_rate_percentage: { type: DataTypes.STRING, allowNull: true },
      ls_is_overdue: { type: DataTypes.STRING, allowNull: true },
      ls_last_payment_amount: { type: DataTypes.STRING, allowNull: true },
      ls_last_payment_date: { type: DataTypes.STRING, allowNull: true },
      ls_last_statement_balance: { type: DataTypes.STRING, allowNull: true },
      ls_last_statement_issue_date: { type: DataTypes.STRING, allowNull: true },
      ls_loan_name: { type: DataTypes.STRING, allowNull: true },
      ls_loan_status_end_date: { type: DataTypes.STRING, allowNull: true },
      ls_loan_status_type: { type: DataTypes.STRING, allowNull: true },
      ls_minimum_payment_amount: { type: DataTypes.STRING, allowNull: true },
      ls_next_payment_due_date: { type: DataTypes.STRING, allowNull: true },
      ls_origination_date: { type: DataTypes.STRING, allowNull: true },
      ls_origination_principal_amount: { type: DataTypes.STRING, allowNull: true },
      ls_outstanding_interest_amount: { type: DataTypes.STRING, allowNull: true },
      ls_payment_reference_number: { type: DataTypes.STRING, allowNull: true },
      ls_pslf_status_estimated_eligibility_date: { type: DataTypes.STRING, allowNull: true },
      ls_pslf_status_payments_made: { type: DataTypes.STRING, allowNull: true },
      ls_pslf_status_payments_remaining: { type: DataTypes.STRING, allowNull: true },
      ls_repayment_plan_description: { type: DataTypes.STRING, allowNull: true },
      ls_repayment_plan_type: { type: DataTypes.STRING, allowNull: true },
      ls_sequence_number: { type: DataTypes.STRING, allowNull: true },
      ls_servicer_address_city: { type: DataTypes.STRING, allowNull: true },
      ls_servicer_address_country: { type: DataTypes.STRING, allowNull: true },
      ls_servicer_address_postal_code: { type: DataTypes.STRING, allowNull: true },
      ls_servicer_address_region: { type: DataTypes.STRING, allowNull: true },
      ls_servicer_address_street: { type: DataTypes.STRING, allowNull: true },
      ls_ytd_interest_paid: { type: DataTypes.STRING, allowNull: true },
      ls_ytd_principal_paid: { type: DataTypes.STRING, allowNull: true },
      ls_request_id: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "PlaidLiabilitiesStudent",
      underscored: true,
      tableName: "plaid_liabilities_student",

      hooks: {
        
      },
    }
  );

  return PlaidLiabilitiesStudent;
};
