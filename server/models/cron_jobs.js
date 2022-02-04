"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class CRONJobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CRONJobs.init(
    {
      client_id: {type: DataTypes.INTEGER, allowNull: false},
      account_id: {type: DataTypes.INTEGER, allowNull: false},
      jobName: {type: DataTypes.STRING, allowNull: false},
      status: {type: DataTypes.STRING, allowNull: false},
    },
    {
      sequelize,
      modelName: "CRONJobs",
      underscored: true,
      tableName: "app_cron_jobs",

      hooks: {
        
      },
    }
  );

  return CRONJobs;
};
