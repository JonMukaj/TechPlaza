'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'roleId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Roles',
        key: 'id' 
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'roleId');
  }
};
