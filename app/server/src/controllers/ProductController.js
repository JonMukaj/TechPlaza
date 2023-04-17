const asyncHandler = require('express-async-handler');
const { NotFound } = require('../errors/errorHandler');
const ServiceManager=require("../services/ServiceManager");

class ProductController {
  constructor() {
  this.serviceManager=new ServiceManager();
  }

  createProduct = asyncHandler(async (req, res) => {
    const prod = await this.serviceManager.productService.createProductAsync(req.body);
    res.json(prod);
  });

  getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const prod=await this.serviceManager.productService.getProductByIdAsync(id);
     res.json(prod);
  });

  updateProduct = asyncHandler(async (req, res) => {
    const prod = await this.serviceManager.productService.updateProduct(req.params.id, req.body);
    res.json(prod);
  });

  deleteProduct = asyncHandler(async (req, res) => {
    await this.serviceManager.productService.deleteProductAsync(req.params.id);
    res.sendStatus(204);
  });

  getProducts = asyncHandler(async (req, res) => {
    const prod = await this.serviceManager.productService.getProductsAsync();
    res.json(prod);
  });



}

module.exports = ProductController;
