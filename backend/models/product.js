const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
  },

  image: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  countInStock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
