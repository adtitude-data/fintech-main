"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("app_sub_accounts", {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      account_id: {type: Sequelize.INTEGER, allowNull: false},
      sub_account_id: {type: Sequelize.STRING, allowNull: false},
      status: {type: Sequelize.INTEGER, allowNull: false},
      created_at: { allowNull: true, type: Sequelize.DATE },
      updated_at: { allowNull: true, type: Sequelize.DATE}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("app_sub_accounts");
  },
};
