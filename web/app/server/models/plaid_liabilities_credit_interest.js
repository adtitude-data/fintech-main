"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class PlaidLiabilitiesCreditInterest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlaidLiabilitiesCreditInterest.init(
    {
      client_id: {type: DataTypes.INTEGER, allowNull: false},
      inst_account_id: { type: DataTypes.INTEGER, allowNull: false },
      plaid_account_id: { type: DataTypes.STRING, allowNull: true },
      plaid_liabilities_credit_id: { type: DataTypes.INTEGER, allowNull: false },
      lci_apr_percentage: { type: DataTypes.STRING, allowNull: true },
      lci_apr_type: { type: DataTypes.STRING, allowNull: true },
      lci_balance_subject_to_apr: { type: DataTypes.STRING, allowNull: true },
      lci_interest_charge_amount: { type: DataTypes.STRING, allowNull: true },
      l_request_id: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "PlaidLiabilitiesCreditInterest",
      underscored: true,
      tableName: "plaid_liabilities_credit_interest",

      hooks: {
        
      },
    }
  );

  return PlaidLiabilitiesCreditInterest;
};
