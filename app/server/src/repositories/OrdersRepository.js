const { Op } = require('sequelize');
const Order = require('../models/entities/Order');

class OrderRepository {

  async CreateOrder(order) {
     await Order.create(order);
     return;
  }

  async GetOrderById(id) {
    return await Order.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }
  async UpdateOrder(id, request) {
    const existingOrder = await Order.findByPk(id);
    if (!existingOrder) {
      return null;
    }
    return await existingOrder.update(request.dataValues);
  }

  async DeleteOrder(id) {
    return await Order.destroy({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }

  async GetOrders() {
    return await Order.findAll();
  }



  async GetOrdersByUserId(usrId) {
    return await Order.findAll({
        where:{
            userId:usrId
        }
    });
  }
}

module.exports = OrderRepository;
