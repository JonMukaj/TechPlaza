const express = require('express');
const ShippingAddressController = require('../presentation/controllers/ShippingAddressController');

const router = express.Router();
const shippingAddressController = new ShippingAddressController();

router.post('/', shippingAddressController.createShippingAddress.bind(shippingAddressController));
router.get('/:id', shippingAddressController.getShippingAddressById.bind(shippingAddressController));
router.put('/:id', shippingAddressController.updateShippingAddress.bind(shippingAddressController));
router.delete('/:id', shippingAddressController.deleteShippingAddress.bind(shippingAddressController));
router.get('/', shippingAddressController.getShippingAddresses.bind(shippingAddressController));
router.get('/user/:userId', shippingAddressController.getShippingAddressesByUserId.bind(shippingAddressController));

module.exports = router;
