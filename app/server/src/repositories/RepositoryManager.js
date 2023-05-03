const UserRepository = require('../repositories/UserRepository');
const ProductRepository = require('../repositories/ProductRepository');
const CategoriesRepository=require("../repositories/CategoriesRepository");
const OrderRepository = require('./OrdersRepository');


class RepositoryManager {
  constructor() {
    (async () => {
      this.userRepository = new UserRepository();
      this.productRepository=new ProductRepository();
      this.categoriesRepository =  new CategoriesRepository();
      this.orderRepository=new OrderRepository();
    })()
  }

  userRepository() {
    return this.userRepository;
  }

  categoriesRepository() {
    return this.categoriesRepository;
  }

  productRepository(){
    return this.productRepository;
  }

  orderRepository()
  {
    return this.orderRepository;
  }

}

module.exports = RepositoryManager;
