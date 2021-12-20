const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('./../helpers/mailer');
var crypto = require('crypto');
const createHttpError = require('http-errors');

router.get(`/`, async (req, res) => {
  const userList = await User.find().select(`-passwordHash`);

  if (!userList) {
    res.status(500).send({ success: false });
  }

  res.send(userList);
});

router.get('/active', async function (req, res) {
  const user = await User.findOne({ activeToken: req.query.authToken });

  if (!user) {
    return res.status(500).send({ success: false });
  }

  user.active = true;

  const saveUser = await user.save();

  if (!saveUser) {
    return res.status(500).send({ success: false });
  }

  res.send({
    title: 'activation success!',
    content: user.name + 'Please <a href="/account/login">login</a>',
  });
});

router.get(`/:id`, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(500).send({ success: false });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post(`/register`, async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    country: req.body.country,
    city: req.body.city,
    street: req.body.street,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    activeToken: crypto.createHash('md5').update(req.body.email).digest('hex'),
    activeTokenExpire: Date.now() + 24 * 3600 * 1000,
  });

  console.log(crypto.createHash('md5').update(req.body.email).digest('hex'));

  user = await user.save();

  if (!user) {
    return res.status(500).send({ success: false });
  }

  var link = 'http://localhost:4200/auth/activate?authToken=' + user.activeToken;

  await mailer(user.email, link);

  const token = jwt.sign(
    {
      userId: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.secret,
    {
      expiresIn: '1d',
    }
  );

  res.send({
    success: true,
    data: user,
  });
});

router.put(`/:id`, async (req, res) => {
  const userExist = await User.findById(req.params.id);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name || userExist.name,
      email: req.body.email || userExist.email,
      phone: req.body.phone || userExist.phone,
      country: req.body.country || userExist.country,
      city: req.body.city || userExist.city,
      street: req.body.street || userExist.street,
      passwordHash: !req.body.password ? userExist.passwordHash : bcrypt.hashSync(req.body.password, 10),
    },
    {
      new: true,
    }
  );

  if (!user) {
    return res.status(500).send({ success: false });
  }

  res.send(user);
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  console.log(user);

  if (!user) {
    return res.status(400).send({ error: 'User not found' });
  }

  if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.secret,
    {
      expiresIn: '1d',
    }
  );

  res.send({
    user,
    token: token,
  });
});

module.exports = router;
