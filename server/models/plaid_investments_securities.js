"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class PlaidInvestmentsSecurities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlaidInvestmentsSecurities.init(
    {
      client_id: {type: DataTypes.INTEGER, allowNull: false},
      account_id: { type: DataTypes.INTEGER, allowNull: false },
      s_close_price: { type: DataTypes.STRING, allowNull: true },
      s_close_price_as_of: { type: DataTypes.STRING, allowNull: true },
      s_cusip: { type: DataTypes.STRING, allowNull: true },
      s_institution_id: { type: DataTypes.STRING, allowNull: true },
      s_institution_security_id: { type: DataTypes.STRING, allowNull: true },
      s_is_cash_equivalent: { type: DataTypes.STRING, allowNull: true },
      s_isin: { type: DataTypes.STRING, allowNull: true },
      s_iso_currency_code: { type: DataTypes.STRING, allowNull: true },
      s_name: { type: DataTypes.STRING, allowNull: true },
      s_proxy_security_id: { type: DataTypes.STRING, allowNull: true },
      s_security_id: { type: DataTypes.STRING, allowNull: true },
      s_sedol: { type: DataTypes.STRING, allowNull: true },
      s_ticker_symbol: { type: DataTypes.STRING, allowNull: true },
      s_type: { type: DataTypes.STRING, allowNull: true },
      s_unofficial_currency_code: { type: DataTypes.STRING, allowNull: true },
      s_request_id: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "PlaidInvestmentsSecurities",
      underscored: true,
      tableName: "plaid_investments_securities",

      hooks: {
        
      },
    }
  );

  return PlaidInvestmentsSecurities;
};
