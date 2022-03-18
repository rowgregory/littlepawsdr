import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import GuestOrder from '../models/guestOrderModel.js';
import nodemailer from 'nodemailer';
import Email from 'email-templates';
import path from 'path';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400);
    throw new Error('An Error occured', error);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

// @desc    Update order to shipped
// @route   PUT /api/orders/:id/shipped
// @access  Private/Admin
const updateOrderToShipped = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isShipped = req.body.isShipped;
    order.shippedOn = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res
      .status(404)
      .send({ message: 'There was an error setting the order to shipped.' });
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  const guestOrders = await GuestOrder.find({ email: req.user.email });

  res.json(orders.concat(guestOrders));
});

// @desc    Get all logged in user orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', '_id name');

  res.json(orders);
});

// @desc    Send order confirmation email
// @route   POST /api/orders/send-order-confirmation-email
// @access  Public
const sendOrderConfirmationEmail = asyncHandler(async (req, res) => {
  const {
    order: { _id, orderItems, shippingAddress, email, isPaid, createdAt },
    email: loggedInUserEmail,
  } = req.body;

  const __dirname = path.resolve();
  const root = path.join(__dirname, 'emails');

  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  const pugEmail = new Email({
    transport: transporter,
    send: true,
    preview: false,
    views: {
      options: {
        extention: 'pug',
      },
      root,
    },
  });

  pugEmail
    .send({
      template: 'orderconfirmation',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org',
        to: email !== undefined ? email : loggedInUserEmail,
      },
      locals: {
        _id,
        orderItems,
        shippingAddress,
        email: email !== undefined ? email : loggedInUserEmail,
        isPaid,
        createdAt,
        isGuest: email !== undefined ? true : false,
      },
    })
    .then(() => {
      console.log(
        `Order confirmation email has been sent to ${
          loggedInUserEmail ?? email
        }`
      );
      res.json({ success: true });
    });
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToShipped,
  sendOrderConfirmationEmail,
};
