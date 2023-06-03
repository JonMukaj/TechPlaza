const express = require('express');
const ReviewController = require('../presentation/controllers/ReviewController');

const router = express.Router();
const reviewController = new ReviewController();

router.post('/', reviewController.createReview.bind(reviewController));
router.get('/:id', reviewController.getReviewById.bind(reviewController));
router.put('/:id', reviewController.updateReview.bind(reviewController));
router.delete('/:id', reviewController.deleteReview.bind(reviewController));
router.get('/product/:productId', reviewController.getReviewsByProductId.bind(reviewController));
router.get('/', reviewController.getAllReviews.bind(reviewController));

module.exports = router;
