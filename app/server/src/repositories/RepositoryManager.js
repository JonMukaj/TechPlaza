const UserRepository = require('../repositories/UserRepository');
//const ProductRepository = require('../repositories/ProductRepository');
const CategoriesRepository=require("../repositories/CategoriesRepository");

class RepositoryManager {
  constructor() {
    (async () => {
      this.userRepository = new UserRepository();
      this.categoriesRepository =  new CategoriesRepository();
    })()
  }

  userRepository() {
    return this.userRepository;
  }

  categoriesRepository() {
    return this.categoriesRepository;
  }

  // add other methods for accessing other repositories here
}

module.exports = RepositoryManager;
