const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) => {
  const userList = await User.find().select(`-passwordHash`);

  if (!userList) {
    res.status(500).send({ success: false });
  }

  res.send(userList);
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
  });

  user = await user.save();

  if (!user) {
    return res.status(500).send({ success: false });
  }

  res.send(user);
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
      passwordHash: !req.body.password
        ? userExist.passwordHash
        : bcrypt.hashSync(req.body.password, 10),
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
