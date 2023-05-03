const express = require('express');
const OrderController = require('../presentation/controllers/OrderController');

const router = express.Router();
const orderController = new OrderController();

router.post('/', orderController.createOrder.bind(orderController));
router.get('/:id', orderController.getOrderById.bind(orderController));
router.put('/:id', orderController.updateOrder.bind(orderController));
router.delete('/:id', orderController.deleteOrder.bind(orderController));
router.get('/', orderController.getOrders.bind(orderController));
router.get('/:userId/order', orderController.getOrdersByUserId.bind(orderController));

module.exports = router;
