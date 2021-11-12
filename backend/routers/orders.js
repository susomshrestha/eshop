const express = require('express');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');
const Product = require('../models/product');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const orderList = await Order.find()
    .populate({
      path: 'user',
      select: 'name',
    })
    .populate({
      path: 'orderItems',
      populate: 'product',
    })
    .sort({ dateOrdered: 'desc' });

  if (!orderList) {
    res.status(500).send({ success: false });
  }

  res.send(orderList);
});

router.get(`/:id`, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(500).send({ success: false });
    }

    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  let orderItemIds = Promise.all(
    req.body.orderItems.map(async (item) => {
      let newOrderItem = new OrderItem({
        quantity: item.quantity,
        product: item.product,
      });
      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );

  orderItemIds = await orderItemIds;

  let totalPrice = await Promise.all(
    orderItemIds.map(async (id) => {
      const orderItem = await OrderItem.findById(id).populate(
        'product',
        'price'
      );
      const price = orderItem.product.price * orderItem.quantity;
      return price;
    })
  );

  totalPrice = totalPrice.reduce((a, b) => a + b, 0);

  let order = new Order({
    orderItems: orderItemIds,
    shippingAddress: req.body.shippingAddress,
    country: req.body.country,
    city: req.body.city,
    phone: req.body.phone,
    totalPrice: totalPrice,
    user: req.body.user,
  });

  order = await order.save();

  if (!order) {
    return res.status(500).send({ success: false });
  }

  res.send(order);
});

router.put(`/:id`, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status || order.status,
    },
    {
      new: true,
    }
  );

  if (!order) {
    return res.status(500).send({ success: false });
  }

  res.send(order);
});

router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      res.status(400).json({
        success: false,
        message: 'Order not found.',
      });
      return;
    }

    order.orderItems.forEach(async (item) => {
      await OrderItem.findByIdAndRemove(item._id);
    });

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully.',
    });
  } catch (error) {
    res.send(error);
  }
});

router.get('/totalsales', async (req, res) => {
  const totalSales = await Order.aggregate([
    {
      $group: { _id: null, totalsales: { $sum: '$totalPrice' } },
    },
  ]);

  if (!totalSales) {
    return res.status(400).send();
  }

  res.send(totalSales.pop().totalsales);
});

module.exports = router;
