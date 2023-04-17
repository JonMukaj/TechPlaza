const UserRepository = require('../repositories/UserRepository');
const ProductRepository = require('../repositories/ProductRepository');
const CategoriesRepository=require("../repositories/CategoriesRepository");

class RepositoryManager {
  constructor() {
    (async () => {
      this.userRepository = new UserRepository();
      this.productRepository=new ProductRepository();
      this.categoriesRepository =  new CategoriesRepository();
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

  // add other methods for accessing other repositories here
}

module.exports = RepositoryManager;
