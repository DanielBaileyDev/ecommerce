const express = require('express');
const router = express.Router();
const productsController = require('../Controllers/products');

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductPage);
router.post('/payment/:id', productsController.postPayment);

module.exports = router;