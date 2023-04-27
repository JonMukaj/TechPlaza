const { Op } = require('sequelize');
const Product = require('../models/entities/Product');

class ProductRepository {

  async CreateProduct(prod) {
     await Product.create(prod);
     return;
  }

  async GetProductById(id) {
    return await Product.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }
  async UpdateProduct(id, prod) {
    const existingProd = await Product.findByPk(id);
    if (!existingProd) {
      return null;
    }
    return await existingProd.update(category.dataValues);
  }

  async DeleteProduct(id) {
    return await Product.destroy({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }

  async GetProducts() {
    return await Product.findAll();
  }



  async GetProductsByCategoryId(categId){
    return await Product.findAll({
        where:{
            categoryId:categId
        }
    })
  }
}

module.exports = ProductRepository;
