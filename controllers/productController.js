const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
  const { category } = req.query;
  let products;
  if (category) {
    products = await Product.find({ category });
  } else {
    products = await Product.find({});
  }
  res.render('products/index', { products, category: category || 'All' });
};

exports.renderCreateForm = (req, res) => {
  res.render('products/create');
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    req.flash('success_msg', 'Product created successfully');
    res.redirect(`/products/${product._id}`);
  } catch (error) {
    req.flash('error_msg', 'Failed to create product');
    res.redirect('/products/create');
  }
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
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    req.flash('success_msg', 'Product updated successfully');
    res.redirect(`/products/${product._id}`);
  } catch (error) {
    req.flash('error_msg', 'Failed to update product');
    res.redirect(`/products/${req.params.id}/edit`);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success_msg', 'Product deleted successfully');
    res.redirect('/products');
  } catch (error) {
    req.flash('error_msg', 'Failed to delete product');
    res.redirect('/products');
  }
};
