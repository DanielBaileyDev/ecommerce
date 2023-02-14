require('dotenv').config();
const express = require('express');
const app = express();
const indexRoutes = require('./Routes/index');
const paymentStatusRoutes = require('./Routes/paymentstatus');
const productsRoutes = require('./Routes/products');
const aboutRoutes = require('./Routes/about');
const adminRoutes = require('./Routes/admin');
const authRoutes = require('./Routes/auth');
const connectDB = require('./config/database');
const flash = require('express-flash');
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
    secret: process.env.SESSION_SECRET,
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
app.use('/paymentstatus', paymentStatusRoutes);
app.use('/products', productsRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/about', aboutRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});