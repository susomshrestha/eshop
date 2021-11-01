const express = require('express');
const Category = require('../models/category');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const caetgoryList = await Category.find();

  if (!caetgoryList) {
    return res.status(500).send({ success: false });
  }

  res.send(caetgoryList);
});

router.get(`/:id`, async (req, res) => {
  try {
    const caetgory = await Category.findById(res.params.id);
    if (!caetgory) {
      return res.status(500).send({ success: false });
    }

    res.send(caetgoryList);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post(`/`, async (req, res) => {
  let category = new Category({
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
  });

  category = await category.save();

  if (!category) {
    return res.status(500).send({ success: false });
  }

  res.send(category);
});

router.put(`/:id`, async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      color: req.body.color,
      icon: req.body.icon,
    },
    {
      new: true,
    }
  );

  if (!category) {
    return res.status(500).send({ success: false });
  }

  res.send(category);
});

router.delete('/:id', async (req, res) => {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id);

    if (!cat) {
      res.status(400).json({
        success: false,
        message: 'Category not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully.',
    });
  } catch (error) {
    res.send(error);
  }
});

router.post('/', async (req, res) => {});

module.exports = router;
