"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class SubAccounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubAccounts.init(
    {
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sub_account_id: {
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
      modelName: "SubAccounts",
      underscored: true,
      tableName: "app_sub_accounts",
      hooks: {
        
      },
    }
  );

  return SubAccounts;
};
