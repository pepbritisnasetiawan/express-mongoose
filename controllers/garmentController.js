/* Models */
const Product = require('../models/product');
const Garment = require('../models/garment');

exports.getAllGarments = async (req, res) => {
  const garments = await Garment.find({});
  res.render('garment/index', { garments });
};

exports.renderCreateForm = (req, res) => {
  res.render('garment/create');
};

exports.createGarment = async (req, res) => {
  try {
    const garment = new Garment(req.body);
    await garment.save();
    req.flash('success_msg', 'Product created successfully');
    res.redirect('/garments');
  } catch (error) {
    req.flash('error_msg', 'Failed to create product');
    res.redirect('/garments/create');
  }
};

exports.getGarmentById = async (req, res) => {
  const { id } = req.params;
  const garment = await Garment.findById(id).populate('products');
  res.render('garment/show', { garment });
};

exports.renderCreateProductForm = (req, res) => {
  const { garment_id } = req.params;
  res.render('products/create', { garment_id });
};

exports.createProductForGarment = async (req, res) => {
  try {
    const { garment_id } = req.params;
    const garment = await Garment.findById(garment_id);
    const product = new Product(req.body);
    garment.products.push(product);
    product.garment = garment;
    await garment.save();
    await product.save();
    console.log(garment);
    req.flash('success_msg', 'Product created successfully');
    res.redirect(`/garments/${garment_id}`);
  } catch (error) {
    req.flash('error_msg', 'Failed to create product');
    res.redirect(`/garments/create`);
  }
};

exports.deleteGarment = async (req, res) => {
  try {
    const { garment_id } = req.params;
    await Garment.findOneAndDelete({ _id: garment_id });
    req.flash('success_msg', 'Product created successfully');
    res.redirect('/garments');
  } catch (error) {
    req.flash('error_msg', 'Failed to create product');
    res.redirect('/garments');
  }
};
