const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin');

//const product = require('../Models/product');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname+(file.mimetype === 'image/jpeg' ? '.jpg' : '.png')) //Appending extension
  }
});

const upload = multer({ storage: storage });

router.get('/', adminController.getProducts);

router.post('/createProduct', adminController.createProduct);

router.put('/updateProduct', upload.single('file'), adminController.updateProduct);

router.delete('/deleteProduct', adminController.deleteProduct);


module.exports = router;