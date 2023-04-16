const asyncHandler = require('express-async-handler');
const { NotFound } = require('../errors/errorHandler');
const ServiceManager=require("../services/ServiceManager");

class CategoriesController {
  constructor() {
  this.serviceManager=new ServiceManager();
  }

  createCategory = asyncHandler(async (req, res) => {
    const user = await this.serviceManager.categoriesService.createCategoryAsync(req.body);
    res.json(user);
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
}

module.exports = CategoriesController;
