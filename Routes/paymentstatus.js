const express = require('express');
const router = express.Router();
const paymentStatusController = require('../Controllers/paymentstatus');

router.get('/', paymentStatusController.getPage);

module.exports = router;