const { Op } = require('sequelize');
const ShippingAddress = require('../models/entities/ShippingAddress');

class ShippingAddressRepository {
  async createShippingAddress(address) {
    return await ShippingAddress.create(address);
  }

  async getShippingAddressById(id) {
    return await ShippingAddress.findByPk(id);
  }

  async updateShippingAddress(id, address) {
    const existingAddress = await ShippingAddress.findByPk(id);
    if (!existingAddress) {
      return null;
    }
    return await existingAddress.update(address.dataValues);
  }

  async deleteShippingAddress(id) {
    return await ShippingAddress.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
  }

  async getShippingAddresses() {
    return await ShippingAddress.findAll();
  }

  async getShippingAddressesByUserId(userId) {
    return await ShippingAddress.findAll({
      where: {
        userId: {
          [Op.eq]: userId
        }
      }
    });
  }
}

module.exports = ShippingAddressRepository;
