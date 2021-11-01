const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const orderList = await Product.find();

  if (!orderList) {
    res.status(500).send({ success: false });
  }

  res.send(orderList);
});

router.post('/', async (req, res) => {});

module.exports = router;
