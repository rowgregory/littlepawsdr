import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import GuestOrder from '../models/guestOrderModel.js';
import { send_mail } from '../server.js';
import Error from '../models/errorModel.js';
import User from '../models/userModel.js';

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
    orderId,
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
      orderId,
      email: req.user.email,
      isShipped: false,
      confirmationEmailHasBeenSent: false,
    });

    const createdOrder = await order.save();

    let hasEmailBeenSent = false;

    if (createdOrder) {
      for (const item of createdOrder.orderItems) {
        const product = await Product.findById(item.product);
        const objIndex = product?.sizes?.findIndex(
          obj => obj?.size === item?.size
        );

        if (product?.sizes?.length > 0) {
          await Product.updateOne(
            { 'sizes.size': item.size },
            {
              $set: {
                'sizes.$.amount': product.sizes[objIndex].amount - item.qty,
              },
            }
          );
        } else {
          product.countInStock = product.countInStock - item.qty;

          await product.save();
        }
      }

      const emailHasSent = await send_mail(
        createdOrder,
        res,
        'sendOrderConfirmationEmail',
        '',
        hasEmailBeenSent
      );

      createdOrder.confirmationEmailHasBeenSent = emailHasSent;
      await createdOrder.save();

      const user = await User.findById({ _id: req.user._id });

      if (!user) {
        const createdError = new Error({
          functionName: 'CREATE_NEW_ORDER',
          detail: `Could not find user with the id of ${req.user._id} to attach shipping address to`,
        });
        await createdError.save();
      }

      user.shippingAddress = shippingAddress;
      await user.save();

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    const createdError = new Error({
      functionName: 'CREATE_NEW_ORDER',
      detail: `${error.message}, order id: ${orderId}`,
    });
    await createdError.save();

    res.status(500).send({
      message: `Please call (***)***-**** to resolve issue, orderID: ${orderId}`,
      data: req.body,
      email: req.user.email,
      isShipped: false,
    });
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
  try {
    const order = await Order.findById(req.params.id);

    order.isShipped = req.body.isShipped;
    order.shippedOn = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (err) {
    const createdError = new Error({
      functionName: 'UPDATE_ORDER_TO_SHIPPED',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
      },
      state: 'ORDER_IS_NULL',
    });

    await createdError.save();

    res.status(404).json({
      message: `There was an error setting the order to shipped: ${err}`,
    });
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
  send_mail(req.body, res, 'sendOrderConfirmationEmail');
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
