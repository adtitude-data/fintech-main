"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class AccountsBalance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AccountsBalance.init(
    {
      item_id: {type: DataTypes.STRING, allowNull: false},
      current_val: { type: DataTypes.STRING, allowNull: true },
      iso_currency_code: { type: DataTypes.STRING, allowNull: true },
      mask: { type: DataTypes.STRING, allowNull: true },
      name: { type: DataTypes.STRING, allowNull: true },
      official_name: { type: DataTypes.STRING, allowNull: true },
      type_val: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "AccountsBalance",
      underscored: true,
      tableName: "accounts_token",

      hooks: {
        
      },
    }
  );

  return AccountsBalance;
};
