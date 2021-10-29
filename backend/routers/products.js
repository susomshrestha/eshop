const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).send({ success: false });
  }

  res.send(productList);
});

router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    stockCount: req.body.stockCount,
  });

  try {
    const savedProduct = await product.save();
    res.send(savedProduct);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
