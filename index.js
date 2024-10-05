const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

/* Models */
const Product = require('./models/product');

// connect to mongodb
mongoose
  .connect('mongodb://127.0.0.1/shop_db')
  .then((res) => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.log(err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.render('products/index', { products });
});

app.listen(3000, () => {
  console.log('shop app listening on http://127.0.0.1:3000');
});
