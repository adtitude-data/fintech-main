"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class PlaidLiabilitiesCredit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlaidLiabilitiesCredit.init(
    {
      client_id: {type: DataTypes.INTEGER, allowNull: false},
      account_id: { type: DataTypes.INTEGER, allowNull: false },
      l_account_id: { type: DataTypes.STRING, allowNull: true },
      l_is_overdue: { type: DataTypes.STRING, allowNull: true },
      l_last_payment_amount: { type: DataTypes.STRING, allowNull: true },
      l_last_payment_date: { type: DataTypes.STRING, allowNull: true },
      l_last_statement_balance: { type: DataTypes.STRING, allowNull: true },
      l_last_statement_issue_date: { type: DataTypes.STRING, allowNull: true },
      l_minimum_payment_amount: { type: DataTypes.STRING, allowNull: true },
      l_next_payment_due_date: { type: DataTypes.STRING, allowNull: true },
      l_request_id: { type: DataTypes.STRING, allowNull: true }
    },
    {
      sequelize,
      modelName: "PlaidLiabilitiesCredit",
      underscored: true,
      tableName: "plaid_liabilities_credit",

      hooks: {
        
      },
    }
  );

  return PlaidLiabilitiesCredit;
};
