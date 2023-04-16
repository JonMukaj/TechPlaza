const bcrypt = require('bcryptjs');
const { BadRequest, NotFound } = require("../errors/errorHandler");
const RepositoryManager=require("../repositories/RepositoryManager");
const { log } = require('console');
const {CategoriesDTO}=require("../shared/DTO/mapper");

class CategoriesService {
  constructor() {
   this.repositoryManager=new RepositoryManager();
  }

  async createCategoryAsync(category) {
    const userToCreate = {
      ...category
    };
    return await this.repositoryManager.categoriesRepository.CreateCategory(category);
  }


  async getCategoryByIdAsync(id) {
    const category = await this.repositoryManager.categoriesRepository.GetCategoryById(id);
    if (!category) {
      throw new NotFound(`Category with ID ${id} not found`);
    }
    return category;
  }


  async updateCategoryAsync(id, category) {
    return await this.repositoryManager.categoriesRepository.UpdateCategory(id,category);
  }

  async deleteCategoryAsync(id) {
    return await this.repositoryManager.categoriesRepository.DeleteCategory(id);
  }

  async getCategoriesAsync() {

    const categories= await this.repositoryManager.categoriesRepository.GetCategories();
    const listOfCategories = categories.map(i => new CategoriesDTO(i)); 
    return listOfCategories;
  }
}

module.exports = CategoriesService;
