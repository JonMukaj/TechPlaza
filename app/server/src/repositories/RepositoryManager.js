const UserRepository = require('../repositories/UserRepository');
//const ProductRepository = require('../repositories/ProductRepository');

class RepositoryManager {
  constructor() {
    (async () => {
      this.userRepository = new UserRepository();
     // this.productRepository = await new ProductRepository();
    })()
  }

  userRepository() {
    return this.userRepository;
  }

  productRepository() {
   // return this.productRepository;
  }

  // add other methods for accessing other repositories here
}

module.exports = RepositoryManager;
