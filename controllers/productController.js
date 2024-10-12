const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
  const { category } = req.query;
  let products;
  if (category) {
    products = await Product.find({ category });
    // res.render('products/index', { products, category });
  } else {
    products = await Product.find({});
    // res.render('products/index', { products, category: 'All' });
  }
  res.render('products/index', { products, category: category || 'All' });
};

exports.renderCreateForm = (req, res) => {
  res.render('products/create');
};

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect(`/products/${product._id}`);
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate('garment');
  res.render('products/show', { product });
};

exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product });
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect('/products');
};
