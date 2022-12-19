const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin');

router.get('/', adminController.getProducts);

router.post('/createProduct', adminController.createProduct);

router.put('/updateProduct', adminController.updateProduct);

router.delete('/deleteProduct', adminController.deleteProduct);


module.exports = router;