require('dotenv').config();
const express = require('express');
const app = express();
const indexRoutes = require('./Routes/index');
const productsRoutes = require('./Routes/products');
const adminRoutes = require('./Routes/admin');
const mongoose = require('mongoose');

// Connect DB
async function connectDB() {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRoutes);
app.use('/products', productsRoutes);
app.use('/admin', adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

// Multer
const product = require('./Models/product');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname+`.jpg`) //Appending extension
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async function (req, res) {
  try {
    await product.replaceOne({
      _id: req.body._id
    },
      {
        img: '/uploads/' + req.file.filename,
        name: req.body.name,
        price: req.body.price,
        featured: req.body.featured,
      });
    res.redirect('/admin');
  } catch (err) {
    console.log(err);
  }
  //console.log(req.body);
  //res.json(req.file);
});