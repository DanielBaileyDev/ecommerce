const validator = require('validator');
const User = require('../models/user');

module.exports = {
  login: (req, res) => {
    return res.redirect('back');
  },
  logout: (req, res) => {
    req.logout((err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  },
  signup: (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: 'Please enter a valid email address.' });
    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push({ msg: 'Password must be at least 8 characters long' });
    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push({ msg: 'Passwords do not match' });

    if (validationErrors.length) {
      req.flash('fail', validationErrors);
      return res.redirect('back');
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 'User',
    });

    User.findOne({ email: req.body.email, }, (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash('fail', { msg: 'Account with that email address or username already exists' });
        return res.redirect('back');
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect('back');
        })
      })
    });
  }
};