"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class PlaidBalance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlaidBalance.init(
    {
      client_id: {type: DataTypes.INTEGER, allowNull: false},
      account_id: { type: DataTypes.INTEGER, allowNull: false },
      b_account_id: { type: DataTypes.STRING, allowNull: true },
      b_blanace_available: { type: DataTypes.STRING, allowNull: true },
      b_blanace_current: { type: DataTypes.STRING, allowNull: true },
      b_blanace_iso_currency_code: { type: DataTypes.STRING, allowNull: true },
      b_blanace_limit: { type: DataTypes.STRING, allowNull: true },
      b_mask: { type: DataTypes.STRING, allowNull: true },
      b_name: { type: DataTypes.STRING, allowNull: true },
      b_official_name: { type: DataTypes.STRING, allowNull: true },
      b_subtype: { type: DataTypes.STRING, allowNull: true },
      b_type: { type: DataTypes.STRING, allowNull: true },
      b_institution_id: { type: DataTypes.STRING, allowNull: true },
      b_item_id: { type: DataTypes.STRING, allowNull: true },
      b_request_id: { type: DataTypes.STRING, allowNull: true }
    },
    {
      sequelize,
      modelName: "PlaidBalance",
      underscored: true,
      tableName: "plaid_balance",

      hooks: {
        
      },
    }
  );

  return PlaidBalance;
};
