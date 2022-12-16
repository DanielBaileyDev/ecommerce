require('dotenv').config();
const express = require('express');
const app = express();
const indexRoutes = require('./Routes/index')
const productsRoutes = require('./Routes/products');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRoutes)
app.use('/products', productsRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
});