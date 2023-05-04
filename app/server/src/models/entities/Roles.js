const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Roles = sequelize.define('Roles', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Roles;
