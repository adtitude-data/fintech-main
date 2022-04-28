"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TwoFaToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TwoFaToken.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qr_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "TwoFaToken",
      underscored: true,
      tableName: "twofa_tokens",
    }
  );
  return TwoFaToken;
};
