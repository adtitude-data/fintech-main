"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("app_accounts_balance", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      item_id: {type: Sequelize.STRING, allowNull: false},
      current_val: { type: Sequelize.STRING, allowNull: true },
      iso_currency_code: { type: Sequelize.STRING, allowNull: true },
      mask: { type: Sequelize.STRING, allowNull: true },
      name: { type: Sequelize.STRING, allowNull: true },
      official_name: { type: Sequelize.STRING, allowNull: true },
      type_val: { type: Sequelize.STRING, allowNull: true },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("app_accounts_balance");
  },
};
 