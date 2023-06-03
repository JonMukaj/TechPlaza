const asyncHandler = require('express-async-handler');
const { BadRequest, NotFound } = require('../../errors/errorHandler');
const ServiceManager = require('../../services/ServiceManager');
const validate = require('../validation/shippingAddressValidation');

class ShippingAddressController {
  constructor() {
    this.serviceManager = new ServiceManager();
  }

  createShippingAddress = asyncHandler(async (req, res) => {
    const { error, value } = validate.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const shippingAddress = await this.serviceManager.shippingAddressService.createShippingAddressAsync(value);
    res.json(shippingAddress);
  });

  getShippingAddressById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const address = await this.serviceManager.shippingAddressService.getShippingAddressByIdAsync(id);
    res.json(address);
  });

  updateShippingAddress = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { error, value } = validate.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const updatedAddress = await this.serviceManager.shippingAddressService.updateShippingAddressAsync(id, value);
    res.json(updatedAddress);
  });

  deleteShippingAddress = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await this.serviceManager.shippingAddressService.deleteShippingAddressAsync(id);
    res.sendStatus(204);
  });

  getShippingAddresses = asyncHandler(async (req, res) => {
    const shippingAddresses = await this.serviceManager.shippingAddressService.getShippingAddressesAsync();
    res.json(shippingAddresses);
  });

  getShippingAddressesByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const addresses = await this.serviceManager.shippingAddressService.getShippingAddressesByUserIdAsync(userId);

    if (!addresses || addresses.length === 0) {
      throw new NotFound(`No shipping addresses found for user with ID ${userId}`);
    }

    res.json(addresses);
  });
}

module.exports = ShippingAddressController;
