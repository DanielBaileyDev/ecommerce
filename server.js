require('dotenv').config();
const express = require('express');
const app = express();
const indexRoutes = require('./Routes/index');
const productsRoutes = require('./Routes/products');
const adminRoutes = require('./Routes/admin');
const connectDB = require('./config/database');

const flash = require('express-flash');
const validator = require('validator');
const User = require('./Models/user')
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('./config/passport')(passport);

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



app.use('/', indexRoutes);
app.use('/products', productsRoutes);
app.use('/admin', adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/admin');
  });

// change to post
app.get('/logout',
  function (req, res) {
    req.logout((err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

app.post('/signup',
  function (req, res, next) {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })

    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    User.findOne({
      $or: [
        { email: req.body.email },
        { username: req.body.username }
      ]
    }, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('/')
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/admin')
        })
      })
    })
  });