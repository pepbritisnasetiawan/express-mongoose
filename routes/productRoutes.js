const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { wrapAsync } = require('../utils/asyncUtils');

router.get('/', wrapAsync(productController.getAllProducts));
router.get('/create', productController.renderCreateForm);
router.post('/', wrapAsync(productController.createProduct));
router.get('/:id', wrapAsync(productController.getProductById));
router.get('/:id/edit', wrapAsync(productController.renderEditForm));
router.put('/:id', wrapAsync(productController.updateProduct));
router.delete('/:id', wrapAsync(productController.deleteProduct));

module.exports = router;
