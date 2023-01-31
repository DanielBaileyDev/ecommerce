const express = require('express');
const router = express.Router();
const aboutController = require('../Controllers/about');

router.get('/', aboutController.getPage);

module.exports = router;