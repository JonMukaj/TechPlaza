const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: true
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passwordhash: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tokenhash: {
    type: DataTypes.STRING,
    allowNull: true
  },
  refreshtoken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isactive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});

module.exports = User;
