const { Op } = require('sequelize');
const Categories = require('../models/entities/Categories');

class CategoriesRepository {

  async CreateCategory(categories) {
     await Categories.create(categories);
     return;
  }

  async GetCategoryById(id) {
    return await Categories.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }
  async UpdateCategory(id, category) {
    const existingCategory = await Categories.findByPk(id);
    if (!existingCategory) {
      return null;
    }
    return await existingCategory.update(category);
  }

  async DeleteCategory(id) {
    return await Categories.destroy({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }

  async GetCategories() {
    return await Categories.findAll();
  }
}

module.exports = CategoriesRepository;
