const express = require('express');
const ProductController = require('../presentation/controllers/ProductController');
const { upload } = require('../config/fileUpload');

const router = express.Router();
const productController = new ProductController();

router.post('/', productController.createProduct.bind(productController));
router.get('/:id', productController.getProductById.bind(productController));
router.put('/:id', productController.updateProduct.bind(productController));
router.delete('/:id', productController.deleteProduct.bind(productController));
router.get('/', productController.getProducts.bind(productController));
router.put('/image/:id', upload.single('productImage'), productController.updateProductImage.bind(productController));
router.post('/ids', productController.getProductsByIds.bind(productController));


module.exports = router;
