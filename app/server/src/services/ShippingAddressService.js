const { BadRequest, NotFound } = require('../errors/errorHandler');
const RepositoryManager = require('../repositories/RepositoryManager');
const { ShippingAddressDTO } = require('../shared/DTO/mapper');

class ShippingAddressService {
  constructor() {
    this.repositoryManager = new RepositoryManager();
  }

  async createShippingAddressAsync(request) {
     await this.repositoryManager.shippingAddressRepository.createShippingAddress(request);
     return true;
  }

  async getShippingAddressByIdAsync(id) {
    const address = await this.repositoryManager.shippingAddressRepository.getShippingAddressById(id);
    if (!address) {
      throw new NotFound(`Shipping Address with ID ${id} not found`);
    }
    return address;
  }

  async updateShippingAddressAsync(id, request) {
    const address = await this.repositoryManager.shippingAddressRepository.getShippingAddressById(id);
    if (!address) {
      throw new NotFound(`Shipping Address with ID ${id} not found`);
    }
    return await this.repositoryManager.shippingAddressRepository.updateShippingAddress(id, request);
  }

  async deleteShippingAddressAsync(id) {
    const address = await this.repositoryManager.shippingAddressRepository.getShippingAddressById(id);
    if (!address) {
      throw new NotFound(`Shipping Address with ID ${id} not found`);
    }
    return await this.repositoryManager.shippingAddressRepository.deleteShippingAddress(id);
  }

  async getShippingAddressesAsync() {
    const addresses = await this.repositoryManager.shippingAddressRepository.getShippingAddresses();
    const shippingAddressDTOs = addresses.map((address) => new ShippingAddressDTO(address));
    return shippingAddressDTOs;
  }

  async getShippingAddressesByUserIdAsync(userId) {
    const addresses = await this.repositoryManager.shippingAddressRepository.getShippingAddressesByUserId(userId);

    if (!addresses || addresses.length === 0) {
      throw new NotFound(`No shipping addresses found for user with ID ${userId}`);
    }

    return addresses;
  }
}

module.exports = ShippingAddressService;
