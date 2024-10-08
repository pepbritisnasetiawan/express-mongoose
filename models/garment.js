const mongoose = require('mongoose');

const garmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama tidak boleh kosong'],
  },
  location: {
    type: String,
  },
  contact: {
    type: String,
    required: [true, 'Kontak tidak bboleh kosong'],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garments',
  },
});

const Garment = mongoose.model('Garment', garmentSchema);

module.exports = Garment;
