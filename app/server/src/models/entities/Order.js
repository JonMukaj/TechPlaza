const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');


const Users = require('./Users');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Users,
            key: 'id'
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    }
});

Order.belongsTo(Users, { foreignKey: 'userId' })
module.exports = Order;