"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class PlaidLiabilitiesMortgage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlaidLiabilitiesMortgage.init(
    {
      client_id: {type: DataTypes.INTEGER, allowNull: false},
      account_id: { type: DataTypes.INTEGER, allowNull: false },
      lm_account_id: { type: DataTypes.STRING, allowNull: true },
      lm_account_number: { type: DataTypes.STRING, allowNull: true },
      lm_current_late_fee: { type: DataTypes.STRING, allowNull: true },
      lm_escrow_balance: { type: DataTypes.STRING, allowNull: true },
      lm_has_pmi: { type: DataTypes.STRING, allowNull: true },
      lm_has_prepayment_penalty: { type: DataTypes.STRING, allowNull: true },
      lm_interest_rate_percentage: { type: DataTypes.STRING, allowNull: true },
      lm_interest_rate_type: { type: DataTypes.STRING, allowNull: true },
      lm_last_payment_amount: { type: DataTypes.STRING, allowNull: true },
      lm_last_payment_date: { type: DataTypes.STRING, allowNull: true },
      lm_loan_term: { type: DataTypes.STRING, allowNull: true },
      lm_loan_type_description: { type: DataTypes.STRING, allowNull: true },
      lm_maturity_date: { type: DataTypes.STRING, allowNull: true },
      lm_next_monthly_payment: { type: DataTypes.STRING, allowNull: true },
      lm_next_payment_due_date: { type: DataTypes.STRING, allowNull: true },
      lm_origination_date: { type: DataTypes.STRING, allowNull: true },
      lm_origination_principal_amount: { type: DataTypes.STRING, allowNull: true },
      lm_past_due_amount: { type: DataTypes.STRING, allowNull: true },
      lm_property_address_city: { type: DataTypes.STRING, allowNull: true },
      lm_property_address_country: { type: DataTypes.STRING, allowNull: true },
      lm_property_address_postal_code: { type: DataTypes.STRING, allowNull: true },
      lm_property_address_region: { type: DataTypes.STRING, allowNull: true },
      lm_property_address_street: { type: DataTypes.STRING, allowNull: true },
      lm_ytd_interest_paid: { type: DataTypes.STRING, allowNull: true },
      lm_ytd_principal_paid: { type: DataTypes.STRING, allowNull: true },
      lm_request_id: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "PlaidLiabilitiesMortgage",
      underscored: true,
      tableName: "plaid_liabilities_mortgage",

      hooks: {
        
      },
    }
  );

  return PlaidLiabilitiesMortgage;
};
