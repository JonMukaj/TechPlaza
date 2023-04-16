const  UserService  = require('../services/UserService');
//const { ProductService } = require('../services/ProductService');

class ServiceManager {
  constructor() {
    (async () => {
      this.userService = new UserService();
     // this.productRepository = await new ProductRepository();
    })()
  }

  userService() {
    return this.userService;
  }

  productService() {
   // return this.productService;
  }


}

module.exports = ServiceManager;
