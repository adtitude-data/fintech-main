"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("plaid_institutions", {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country_codes: {type: Sequelize.STRING, allowNull: false},
      institution_id: { type: Sequelize.STRING, allowNull: false },
      logo: { type: Sequelize.TEXT, allowNull: true },
      name: { type: Sequelize.STRING, allowNull: true },
      oauth: { type: Sequelize.BOOLEAN, allowNull: true },
      primary_color: { type: Sequelize.STRING, allowNull: true },
      products: { type: Sequelize.STRING, allowNull: true },
      routing_numbers: { type: Sequelize.TEXT, allowNull: true },
      url: { type: Sequelize.STRING, allowNull: true },
      created_at: { allowNull: true, type: Sequelize.DATE },
      updated_at: { allowNull: true, type: Sequelize.DATE}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("plaid_institutions");
  },
};
