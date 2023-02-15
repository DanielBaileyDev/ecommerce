const express = require('express');
const router = express.Router();
const paymentStatusController = require('../controllers/paymentstatus');

router.get('/', paymentStatusController.getPage);

module.exports = router;