"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class PlaidAccounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlaidAccounts.init(
    {
      inst_account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      plaid_account_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "PlaidAccounts",
      underscored: true,
      tableName: "app_plaid_accounts",
      hooks: {
        
      },
    }
  );

  return PlaidAccounts;
};
