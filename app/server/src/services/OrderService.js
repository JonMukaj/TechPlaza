const { BadRequest, NotFound } = require("../errors/errorHandler");
const RepositoryManager=require("../repositories/RepositoryManager");
const { log } = require('console');
const {OrderDTO}=require("../shared/DTO/mapper");

class OrderService {
  constructor() {
   this.repositoryManager=new RepositoryManager();
  }

  async createOrderAsync(request) {
    const user=await this.repositoryManager.userRepository.GetUserById(request.userId);
    if(!user)
        throw new NotFound(`User with ID ${request.userId} not found`);

    return await this.repositoryManager.orderRepository.CreateOrder(request);
  }


  async getOrderByIdAsync(id) {
    const order = await this.repositoryManager.orderRepository.GetOrderById(id);
    if (!order) {
      throw new NotFound(`Order with ID ${id} not found`);
    }
    return order;
  }


  async updateOrderAsync(id, req) {
    return await this.repositoryManager.orderRepository.UpdateOrder(id,req);
  }

  async deleteOrderAsync(id) {
    return await this.repositoryManager.orderRepository.DeleteOrder(id);
  }

  async getOrdersAsync() {
    const orders= await this.repositoryManager.orderRepository.GetOrders();
    //const list = orders.map(i => new OrderDTO(i)); 
    return orders;
  }

  async getOrdersByUserIdAsync(userId) {
    const user=await this.repositoryManager.userRepository.GetUserById(userId);
    if(!user) throw new NotFound(`User with id: ${userId} not found!`);

    const orders= await this.repositoryManager.orderRepository.GetOrdersByUserId(userId);
   // const list = orders.map(i => new OrderDTO(i)); 
    return orders;
  }
}

module.exports = OrderService;
