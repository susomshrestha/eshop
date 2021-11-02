const express = require('express');
const Product = require('../models/product');
const Category = require('../models/category');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).send({ success: false });
  }

  res.send(productList);
});

router.get(`/:id`, async (req, res) => {
  try {
    const product = await Product.findById(res.params.id).populate('category');
    if (!product) {
      return res.status(500).send({ success: false });
    }

    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);

    if (!category) {
      return res.status(500).send({ message: 'Invalid data.' });
    }

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
      countInStock: req.body.countInStock,
    });

    const savedProduct = await product.save();
    res.send(savedProduct);
  } catch (error) {
    res.send(error);
  }
});

router.put(`/:id`, async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
      countInStock: req.body.countInStock,
    },
    {
      new: true,
    }
  );

  if (!product) {
    return res.status(500).send({ success: false });
  }

  res.send(product);
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(400).json({
        success: false,
        message: 'Product not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully.',
    });
  } catch (error) {
    res.send(error);
  }
});

router.get(`/count`, async (req, res) => {
  try {
    const productCount = await Product.countDocuments((count) => count);

    res.send({ productCount });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get(`/featured`, async (req, res) => {
  try {
    const products = await Product.find({
      isFeatured: true,
    });

    res.send({ productCount: products });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
