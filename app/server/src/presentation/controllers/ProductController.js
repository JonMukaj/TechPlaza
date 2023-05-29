const asyncHandler = require('express-async-handler');
const {BadRequest, NotFound } = require('../../errors/errorHandler');
const ServiceManager=require("../../services/ServiceManager");
const validate=require("../validation/productValidation");


class ProductController {
  constructor() {
  this.serviceManager=new ServiceManager();
  }

  createProduct = asyncHandler(async (req, res) => {
    const { error, value } = validate.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const prod = await this.serviceManager.productService.createProductAsync(value);
    res.json(prod);
  });

  getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const prod=await this.serviceManager.productService.getProductByIdAsync(id);
     res.json(prod);
  });

  updateProduct = asyncHandler(async (req, res) => {
    const { error, value } = validate.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const prod = await this.serviceManager.productService.updateProductAsync(req.params.id, value);
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


  updateProductImage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    console.log(req.params);
    const imageFile = req.file;
    if (!imageFile) {
      throw new BadRequest('No image file provided');
    }
    const updatedProduct = await this.serviceManager.productService.updateProductImageAsync(id, imageFile.filename);
    res.json(true);
  });

  getProductsByIds = asyncHandler(async (req, res) => {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds)) {
      throw new BadRequest('Invalid product IDs provided');
    }

    const products = await this.serviceManager.productService.getProductsByIdsAsync(productIds);

    res.json(products);
  });


}

module.exports = ProductController;
