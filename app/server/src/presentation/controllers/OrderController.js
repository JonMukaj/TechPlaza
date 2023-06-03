const asyncHandler = require('express-async-handler');
const {BadRequest, NotFound } = require('../../errors/errorHandler');
const ServiceManager=require("../../services/ServiceManager");
const validator=require("../validation/orderValidation");

class OrderController {
  constructor() {
  this.serviceManager=new ServiceManager();
  }

  createOrder = asyncHandler(async (req, res) => {
    const { error, value } = validator.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const order = await this.serviceManager.orderService.createOrderAsync(value);
    res.json(order);
  });

  getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
   // console.log(req.user); get the user Id for the JWT Login
    const or=await this.serviceManager.orderService.getOrderByIdAsync(id);
     res.json(or);
  });

  updateOrder = asyncHandler(async (req, res) => {
    const or = await this.serviceManager.orderService.updateOrderAsync(req.params.id, req.body);
    res.json(or);
  });

  deleteOrder = asyncHandler(async (req, res) => {
    await this.serviceManager.orderService.deleteOrderAsync(req.params.id);
    res.sendStatus(204);
  });

  getOrders = asyncHandler(async (req, res) => {
    const Order = await this.serviceManager.orderService.getOrdersAsync();
    res.json(Order);
  });

  getOrdersByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const orders = await this.serviceManager.orderService.getOrdersByUserIdAsync(userId);
    res.json(orders);
  });


  createOrderWithShipping = asyncHandler(async (req, res) => {
    const { order, firstName, lastName, email, phoneNumber, address, city, zipcode } = req.body;

    // Create the order
    const createdOrder = await this.serviceManager.orderService.createOrderAsync(order);

    // Create the shipping address
    const createdShippingAddress = await this.serviceManager.shippingAddressService.createShippingAddressAsync({
      orderId: createdOrder.id,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      city,
      zipcode
    });

    // Return the created order as the response
    res.json(createdOrder);
  });
}

module.exports = OrderController;
