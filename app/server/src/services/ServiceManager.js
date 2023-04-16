const  UserService  = require('../services/UserService');
//const { ProductService } = require('../services/ProductService');
const CategoriesService=require("../services/CategoriesService");

class ServiceManager {
  constructor() {
    (async () => {
      this.userService = new UserService();
      this.categoriesService=new CategoriesService();
     // this.productRepository = await new ProductRepository();
    })()
  }

  userService() {
    return this.userService;
  }

  categoriesService() {
    return this.categoriesService;
  }


}

module.exports = ServiceManager;
