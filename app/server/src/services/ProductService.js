const { BadRequest, NotFound } = require("../errors/errorHandler");
const RepositoryManager=require("../repositories/RepositoryManager");
const { log } = require('console');
const {ProductDTO}=require("../shared/DTO/mapper");

class ProductService {
  constructor() {
   this.repositoryManager=new RepositoryManager();
  }

  async createProductAsync(request) {
    const category=await this.repositoryManager.categoriesRepository.GetCategoryById(request.categoryId);
    if(!category)
        throw new NotFound(`Category with ID ${request.categoryId} not found`);

    return await this.repositoryManager.productRepository.CreateProduct(request);
  }


  async getProductByIdAsync(id) {
    const prod = await this.repositoryManager.productRepository.GetProductById(id);
    if (!prod) {
      throw new NotFound(`Product with ID ${id} not found`);
    }
    return prod;
  }


  async updateProductAsync(id, prod) {
    return await this.repositoryManager.productRepository.UpdateProduct(id,prod);
  }

  async deleteProductAsync(id) {
    return await this.repositoryManager.productRepository.DeleteProduct(id);
  }

  async getProductsAsync() {

    const prod= await this.repositoryManager.productRepository.GetProducts();
    const list = prod.map(i => new ProductDTO(i)); 
    return list;
  }

  async getProductsByCategoryIdAsync(categoryId) {
    const prod= await this.repositoryManager.productRepository.GetProductsByCategoryId(categoryId);
    const list = prod.map(i => new ProductDTO(i)); 
    return list;
  }


  async updateProductImageAsync(productId, image) {
    const product = await this.repositoryManager.productRepository.GetProductById(productId);
    if (!product) {
      throw new NotFound(`Product with ID ${productId} not found`);
    }
    console.log(image);
    product.image = image;
    await product.save();
    return true;
  }

}

module.exports = ProductService;
