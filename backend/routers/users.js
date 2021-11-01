const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const userList = await Product.find();

  if (!userList) {
    res.status(500).send({ success: false });
  }

  res.send(userList);
});

router.post('/', async (req, res) => {});

module.exports = router;
