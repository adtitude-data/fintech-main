"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class PlaidInstitutions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlaidInstitutions.init(
    {
      country_codes: {type: DataTypes.STRING, allowNull: false},
      institution_id: { type: DataTypes.STRING, allowNull: false },
      logo: { type: DataTypes.TEXT, allowNull: true },
      name: { type: DataTypes.STRING, allowNull: true },
      oauth: { type: DataTypes.BOOLEAN, allowNull: true },
      primary_color: { type: DataTypes.STRING, allowNull: true },
      products: { type: DataTypes.TEXT, allowNull: true },
      routing_numbers: { type: DataTypes.STRING, allowNull: true },
      url: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "PlaidInstitutions",
      underscored: true,
      tableName: "plaid_institutions",

      hooks: {
        
      },
    }
  );

  return PlaidInstitutions;
};
