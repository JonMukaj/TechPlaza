const asyncHandler = require('express-async-handler');
const { BadRequest, NotFound } = require('../../errors/errorHandler');
const ServiceManager = require('../../services/ServiceManager');
const validate = require('../validation/reviewValidation');

class ReviewController {
  constructor() {
    this.serviceManager = new ServiceManager();
  }

  createReview = asyncHandler(async (req, res) => {
    const { error, value } = validate.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const review = await this.serviceManager.reviewService.createReviewAsync(value);
    res.json(review);
  });

  getReviewById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const review = await this.serviceManager.reviewService.getReviewByIdAsync(id);
    res.json(review);
  });

  updateReview = asyncHandler(async (req, res) => {
    const { error, value } = validate.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const review = await this.serviceManager.reviewService.updateReviewAsync(req.params.id, value);
    res.json(review);
  });

  deleteReview = asyncHandler(async (req, res) => {
    await this.serviceManager.reviewService.deleteReviewAsync(req.params.id);
    res.sendStatus(204);
  });

  getReviewsByProductId = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const reviews = await this.serviceManager.reviewService.getReviewsByProductIdAsync(productId);
    res.json(reviews);
  });

  getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await this.serviceManager.reviewService.getAllReviewsAsync();
    res.json(reviews);
  });
}

module.exports = ReviewController;
