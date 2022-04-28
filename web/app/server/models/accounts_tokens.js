"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class AccountsTokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AccountsTokens.init(
    {
      client_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inst_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inst_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      item_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      access_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_access_token_expired: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "AccountsTokens",
      underscored: true,
      tableName: "app_accounts_token",
      hooks: {
        
      },
    }
  );

  return AccountsTokens;
};
