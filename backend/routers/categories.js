const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const caetgoryList = await Product.find();

  if (!caetgoryList) {
    res.status(500).send({ success: false });
  }

  res.send(caetgoryList);
});

router.post('/', async (req, res) => {});

module.exports = router;
