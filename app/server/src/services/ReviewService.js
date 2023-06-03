const { NotFound } = require("../errors/errorHandler");
const RepositoryManager = require("../repositories/RepositoryManager");

class ReviewService {
  constructor() {
    this.repositoryManager = new RepositoryManager();
  }

  async createReviewAsync(review) {
    return await this.repositoryManager.reviewRepository.createReview(review);
  }

  async getReviewByIdAsync(id) {
    const review = await this.repositoryManager.reviewRepository.getReviewById(id);
    if (!review) {
      throw new NotFound(`Review with ID ${id} not found`);
    }
    return review;
  }

  async updateReviewAsync(id, review) {
    const updatedReview = await this.repositoryManager.reviewRepository.updateReview(id, review);
    if (!updatedReview) {
      throw new NotFound(`Review with ID ${id} not found`);
    }
    return updatedReview;
  }

  async deleteReviewAsync(id) {
    const deletedReview = await this.repositoryManager.reviewRepository.deleteReview(id);
    if (!deletedReview) {
      throw new NotFound(`Review with ID ${id} not found`);
    }
    return deletedReview;
  }

  async getReviewsByProductIdAsync(productId) {
    const reviews = await this.repositoryManager.reviewRepository.getReviewsByProductId(productId);
  //  const reviewDTOs = reviews.map((review) => new ReviewDTO(review));
    return reviews;
  }

  async getAllReviewsAsync() {
    const reviews = await this.repositoryManager.reviewRepository.getAllReviews();
 //   const reviewDTOs = reviews.map((review) => new ReviewDTO(review));
    return reviews;
  }
}

module.exports = ReviewService;
