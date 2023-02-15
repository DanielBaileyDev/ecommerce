const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { ensureAuth, hasPermission, isAdmin } = require('../config/ensureauth');
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

router.get('/', ensureAuth, hasPermission, adminController.getProducts);

router.post('/createProduct', isAdmin, adminController.createProduct);

router.put('/updateProduct', isAdmin, upload.single('file'), adminController.updateProduct);

router.delete('/deleteProduct', isAdmin, adminController.deleteProduct);


module.exports = router;