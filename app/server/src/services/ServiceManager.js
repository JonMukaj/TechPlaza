const  UserService  = require('../services/UserService');
const  ProductService = require('../services/ProductService');
const CategoriesService=require("../services/CategoriesService");
const OrderService = require('./OrderService');

class ServiceManager {
  constructor() {
    (async () => {
      this.userService = new UserService();
      this.categoriesService=new CategoriesService();
      this.productService=new ProductService();
      this.orderService=new OrderService();
    })()
  }

  userService() {
    return this.userService;
  }

  categoriesService() {
    return this.categoriesService;
  }
  productService(){
    return this.productService;
  }

  orderService(){
    return this.orderService;
  }

}

module.exports = ServiceManager;
