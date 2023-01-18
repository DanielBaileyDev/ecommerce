const express = require('express');
const router = express.Router();
const authController = require('../Controllers/auth');
const passport = require('passport');

router.post('/login', passport.authenticate('local', { failureRedirect: 'back' }), authController.login);
router.post('/logout', authController.logout);
router.post('/signup', authController.signup);

module.exports = router;