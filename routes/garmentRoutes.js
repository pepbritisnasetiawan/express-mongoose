const express = require('express');
const router = express.Router();
const garmentController = require('../controllers/garmentController');
const { wrapAsync } = require('../utils/asyncUtils');

router.get('/', wrapAsync(garmentController.getAllGarments));
router.get('/create', garmentController.renderCreateForm);
router.post('/', wrapAsync(garmentController.createGarment));
router.get('/:id', wrapAsync(garmentController.getGarmentById));
router.get(
  '/:garment_id/products/create',
  garmentController.renderCreateProductForm
);
router.post(
  '/:garment_id/products',
  wrapAsync(garmentController.createProductForGarment)
);
router.delete('/:garment_id', wrapAsync(garmentController.deleteGarment));

module.exports = router;
