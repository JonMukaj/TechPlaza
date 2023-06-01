'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add foreign key column to ShippingAddresses table
    await queryInterface.addColumn('ShippingAddresses', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove foreign key column from ShippingAddresses table
    await queryInterface.removeColumn('ShippingAddresses', 'userId');
  }
};
