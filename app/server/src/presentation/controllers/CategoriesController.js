const asyncHandler = require('express-async-handler');
const {BadRequest, NotFound } = require('../../errors/errorHandler');
const ServiceManager=require("../../services/ServiceManager");
const validator=require("../validation/categoryValidation");

class CategoriesController {
  constructor() {
  this.serviceManager=new ServiceManager();
  }

  createCategory = asyncHandler(async (req, res) => {
    const { error, value } = validator.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const category = await this.serviceManager.categoriesService.createCategoryAsync(value);
    res.json(category);
  });

  getCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category=await this.serviceManager.categoriesService.getCategoryByIdAsync(id);
     res.json(category);
  });

  updateCategory = asyncHandler(async (req, res) => {
    const category = await this.serviceManager.categoriesService.updateCategory(req.params.id, req.body);
    res.json(category);
  });

  deleteCategory = asyncHandler(async (req, res) => {
    await this.serviceManager.categoriesService.deleteCategoryAsync(req.params.id);
    res.sendStatus(204);
  });

  getCategories = asyncHandler(async (req, res) => {
    const category = await this.serviceManager.categoriesService.getCategoriesAsync();
    res.json(category);
  });

  getProductsByCategoryId = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const prods = await this.serviceManager.productService.getProductsByCategoryIdAsync(categoryId);
    res.json(prods);
  });
}

module.exports = CategoriesController;
