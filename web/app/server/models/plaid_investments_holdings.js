"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class PlaidInvestmentsHoldings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlaidInvestmentsHoldings.init(
    {
      client_id: {type: DataTypes.INTEGER, allowNull: false},
      inst_account_id: { type: DataTypes.INTEGER, allowNull: false },
      plaid_account_id: { type: DataTypes.STRING, allowNull: false },
      h_account_id: { type: DataTypes.STRING, allowNull: false },
      h_cost_basis: { type: DataTypes.STRING, allowNull: true },
      h_institution_price: { type: DataTypes.STRING, allowNull: true },
      h_institution_price_as_of: { type: DataTypes.STRING, allowNull: true },
      h_institution_value: { type: DataTypes.STRING, allowNull: true },
      h_iso_currency_code: { type: DataTypes.STRING, allowNull: true },
      h_quantity: { type: DataTypes.STRING, allowNull: true },
      h_security_id: { type: DataTypes.STRING, allowNull: true },
      h_unofficial_currency_code: { type: DataTypes.STRING, allowNull: true },
      h_request_id: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "PlaidInvestmentsHoldings",
      underscored: true,
      tableName: "plaid_investments_holdings",

      hooks: {
        
      },
    }
  );

  return PlaidInvestmentsHoldings;
};
