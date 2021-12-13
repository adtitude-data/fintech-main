"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_2fa_active: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:false
      },
      is_2fa_logged: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:false
      },
      role: {
        type: DataTypes.ENUM("Admin", "Agent","Client"),
        allowNull: true,
        defaultValue: "Admin",
      },
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
      tableName: "app_users",

      hooks: {
        beforeValidate: (user, options) => {
          if (user.changed("password")) {
            user.salt = generateSalt();
            user.password = generateSecuredHash(user.password, user.salt);
          }
        },
      },
    }
  );

  return User;
};
