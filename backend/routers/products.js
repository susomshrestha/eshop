const express = require('express');
const Product = require('../models/product');
const Category = require('../models/category');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid image type');
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${FILE_TYPE_MAP[file.mimetype]}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
  const productList = await Product.find().populate('category');

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

router.post('/', uploadOptions.single('image'), async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);

    if (!category) {
      return res.status(500).send({ message: 'Invalid data.' });
    }

    const filepath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: `${filepath}${req.file.filename}`,
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

router.put(`/:id`, uploadOptions.single('image'), async (req, res) => {
  const productExist = await Product.findById(req.params.id);

  let imagepath = productExist.image;
  const filepath = `${req.protocol}://${req.get('host')}/public/uploads/`;

  if (req.file) {
    imagepath = `${filepath}${req.file.filename}`;
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: imagepath,
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

router.put(
  '/gallery/:id',
  uploadOptions.array('images', 10),
  async (req, res) => {
    let imagePaths = [];
    const filepath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    req.files.map((file) => {
      imagePaths.push(`${filepath}${file.filename}`);
    });

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        images: imagePaths,
      },
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(500).send({ success: false });
    }

    res.send(product);
  }
);

module.exports = router;
