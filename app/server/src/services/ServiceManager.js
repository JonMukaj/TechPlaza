const  UserService  = require('../services/UserService');
const  ProductService = require('../services/ProductService');
const CategoriesService=require("../services/CategoriesService");

class ServiceManager {
  constructor() {
    (async () => {
      this.userService = new UserService();
      this.categoriesService=new CategoriesService();
      this.productService=new ProductService();
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


}

module.exports = ServiceManager;
