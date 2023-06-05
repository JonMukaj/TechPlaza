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


  async updateOrderAsync(id, request) {
    const order = await this.repositoryManager.orderRepository.GetOrderById(id);
    if (!order) {
      throw new NotFound(`Order with ID ${id} not found`);
    }

    for (const key in request) {
      if (request.hasOwnProperty(key)) {
        order[key] = request[key];
      }
    }

    return await this.repositoryManager.orderRepository.UpdateOrder(id,order);
  }

  async deleteOrderAsync(id) {
    const order = await this.repositoryManager.orderRepository.GetOrderById(id);
    if (!order) {
      throw new NotFound(`Order with ID ${id} not found`);
    }
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


  async createOrderWithShippingAsync(request,loggedUserId) {
    let total = 0;
    
    const shipping = {
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      phoneNumber: request.phoneNumber,
      address: request.address,
      city: request.city,
      zipcode: request.zipcode,
      userId: loggedUserId
    };
  
    for (const prod of request.order) {
      const existingProduct = await this.repositoryManager.productRepository.GetProductById(prod.id);
      if (!existingProduct) {
        throw new NotFound(`Product with ID ${prod.id} not found`);
      }
      
      total += existingProduct.price * prod.quantity;
    }
    
    const order={
      total:total,
      userId:loggedUserId
    };
  
    await this.repositoryManager.shippingAddressRepository.createShippingAddress(shipping);
    await this.repositoryManager.orderRepository.CreateOrder(order);

    return total;
  }
  
}

module.exports = OrderService;
