'use strict';
const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'passwordHash', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    await queryInterface.addColumn('Users', 'tokenHash', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'passwordHash');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'tokenHash');
  },
};
