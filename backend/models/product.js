const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    default: 1,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
