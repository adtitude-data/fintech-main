"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cron_jobs", {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      client_id: {type: Sequelize.INTEGER, allowNull: false},
      account_id: {type: Sequelize.INTEGER, allowNull: false},
      jobName: {type: Sequelize.STRING, allowNull: false},
      status: {type: Sequelize.STRING, allowNull: false},
      created_at: { allowNull: true, type: Sequelize.DATE },
      updated_at: { allowNull: true, type: Sequelize.DATE}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("cron_jobs");
  },
};
