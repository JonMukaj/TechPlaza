const express = require('express');
const CategoriesController = require('../presentation/controllers/CategoriesController');

const router = express.Router();
const categoriesController = new CategoriesController();

router.post('/', categoriesController.createCategory.bind(categoriesController));
router.get('/:id', categoriesController.getCategoryById.bind(categoriesController));
router.put('/:id', categoriesController.updateCategory.bind(categoriesController));
router.delete('/:id', categoriesController.deleteCategory.bind(categoriesController));
router.get('/', categoriesController.getCategories.bind(categoriesController));
router.get('/:categoryId/products', categoriesController.getProductsByCategoryId.bind(categoriesController));

module.exports = router;
