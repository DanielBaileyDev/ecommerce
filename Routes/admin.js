const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin');
const { ensureAuth } = require('../config/ensureauth');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + (file.mimetype === 'image/jpeg' ? '.jpg' : '.png'));
  }
});

const upload = multer({ storage: storage });

router.get('/', ensureAuth, adminController.getProducts);

router.post('/createProduct', adminController.createProduct);

router.put('/updateProduct', upload.single('file'), adminController.updateProduct);

router.delete('/deleteProduct', adminController.deleteProduct);


module.exports = router;