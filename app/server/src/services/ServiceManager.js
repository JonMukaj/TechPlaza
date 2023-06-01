const  UserService  = require('../services/UserService');
const  ProductService = require('../services/ProductService');
const CategoriesService=require("../services/CategoriesService");
const OrderService = require('./OrderService');
const ReviewService=require("../services/ReviewService");
const ShippingAddressService = require('./ShippingAddressService');

class ServiceManager {
  constructor() {
    (async () => {
      this.userService = new UserService();
      this.categoriesService=new CategoriesService();
      this.productService=new ProductService();
      this.orderService=new OrderService();
      this.reviewService=new ReviewService();
      this.shippingAddressService=new ShippingAddressService();
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
  
  reviewService(){
    return this.reviewService;
  }

  shippingAddressService()
  {
    return this.shippingAddressService;
  }

}

module.exports = ServiceManager;
