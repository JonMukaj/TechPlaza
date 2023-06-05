const UserRepository = require('../repositories/UserRepository');
const ProductRepository = require('../repositories/ProductRepository');
const CategoriesRepository=require("../repositories/CategoriesRepository");
const OrderRepository = require('./OrdersRepository');
const ReviewReposiory=require("./ReviewRepository");
const ShippingAddressRepository = require('./ShippingAddressRepository');
const CustomQueryRepository = require('./CustomQueryRepository');

class RepositoryManager {
  constructor() {
    (async () => {
      this.userRepository = new UserRepository();
      this.productRepository=new ProductRepository();
      this.categoriesRepository =  new CategoriesRepository();
      this.orderRepository=new OrderRepository();
      this.reviewRepository=new ReviewReposiory();
      this.shippingAddressRepository=new ShippingAddressRepository();
      this.customQueryRepositoy=new CustomQueryRepository();
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

  reviewRepository(){
    return this.reviewRepository;
  }
  shippingAddressRepository(){
    return this.shippingAddressRepository;
  }

  customQueryRepositoy(){
    return this.customQueryRepositoy;
  }

}

module.exports = RepositoryManager;
