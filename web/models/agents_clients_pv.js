"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class AgentsClientsPV extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AgentsClientsPV.init(
    {
      agent_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      client_id: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "AgentsClientsPV",
      underscored: true,
      tableName: "agents_clients_pv",

      hooks: {
        
      },
    }
  );

  return AgentsClientsPV;
};
