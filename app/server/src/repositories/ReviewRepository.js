const { Op } = require('sequelize');
const Review = require('../models/entities/Review');

class ReviewRepository {

  async createReview(review) {
    await Review.create(review);
    return;
  }

  async getReviewById(id) {
    return await Review.findByPk(id);
  }

  async updateReview(id, review) {
    const existingReview = await Review.findByPk(id);
    if (!existingReview) {
      return null;
    }
    return await existingReview.update(review.dataValues);
  }

  async deleteReview(id) {
    return await Review.destroy({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }

  async getReviewsByProductId(productId) {
    return await Review.findAll({
      where: {
        productId: {
          [Op.eq]: productId
        }
      }
    });
  }

  async getAllReviews() {
    return await Review.findAll();
  }
}

module.exports = ReviewRepository;
