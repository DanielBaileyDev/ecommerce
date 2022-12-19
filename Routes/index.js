const express = require('express');
const router = express.Router();
const indexController = require('../Controllers/index');

router.get('/', indexController.getFeatured);

module.exports = router;