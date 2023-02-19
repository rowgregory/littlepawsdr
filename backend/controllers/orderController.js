import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { sendEmail } from '../utils/sendEmail.js';
import Error from '../models/errorModel.js';
import User from '../models/userModel.js';
import ECardOrder from '../models/eCardOrderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
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
    guestEmail,
    isGuestOrder,
    user,
  } = req.body;

  try {
    const order = new Order({
      user: {
        id: user?.id,
        email: user?.email,
        name: user?.name,
      },
      customer: req?.user?._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      orderId,
      isShipped: false,
      confirmationEmailHasBeenSent: false,
      isGuestOrder,
      guestEmail,
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
          const bulk = Product.collection.initializeOrderedBulkOp();
          bulk.find({ 'sizes.size': item.size, _id: product?._id }).updateOne({
            $set: {
              'sizes.$.amount': product.sizes[objIndex].amount - item.qty,
            },
          });

          bulk.find({ 'sizes.size': item.size, _id: product?._id }).updateOne({
            $pull: {
              sizes: {
                amount: 0,
              },
            },
          });

          bulk.execute();
        } else {
          product.countInStock = product.countInStock - item.qty;

          await product.save();
        }
      }

      const emailHasSent = await sendEmail(
        createdOrder,
        res,
        'sendOrderConfirmationEmail',
        '',
        hasEmailBeenSent
      );

      createdOrder.confirmationEmailHasBeenSent = emailHasSent;
      await createdOrder.save();

      if (!isGuestOrder) {
        const userExists = await User.findById({ _id: createdOrder?.user?.id });

        userExists.shippingAddress = shippingAddress;
        await userExists.save();
      }

      res.status(201).json(createdOrder);
    }
  } catch (err) {
    const createdError = new Error({
      functionName: 'CREATE_NEW_ORDER_PUBLIC',
      detail: `${err.message}, order id: ${orderId}`,
      user: {
        id: user?._id,
        name: user?.name,
        email: user?.email ?? guestEmail,
      },
      status: 500,
    });
    await createdError.save();

    res.status(500).send({
      message: `Please call (***)***-**** to resolve issue, orderID: ${orderId}`,
      data: req.body,
      email: user?.email || guestEmail,
      isShipped: false,
    });
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    res.json(order);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_ORDER_BY_ID_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
      },
      STATUS: 500,
    });

    await createdError.save();

    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
});

// @desc    Update order to paid ❌
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
      functionName: 'UPDATE_ORDER_TO_SHIPPED_ADMIN',
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
  try {
    const orders = await Order.find();
    const guestOrders = orders.filter(
      order => order?.guestEmail === req?.user?.email
    );
    const customerOrders = orders.filter(
      order => order?.user?.email === req?.user?.email
    );

    const ecardOrders = await ECardOrder.find({ email: req.user.email });

    const productOrders = guestOrders?.concat(customerOrders);

    res.json({ productOrders, ecardOrders });
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_MY_ORDERS_PRIVATE',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
      },
      state: 'ORDER_IS_NULL',
    });

    await createdError.save();

    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', '_id name');

    res.json(orders);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_ALL_ORDERS_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
      },
      status: 500,
    });

    await createdError.save();

    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
});

// @desc    Send order confirmation email
// @route   POST /api/orders/send-order-confirmation-email
// @access  Public
const sendOrderConfirmationEmail = asyncHandler(async (req, res) => {
  try {
    sendEmail(req.body, res, 'sendOrderConfirmationEmail');
  } catch (err) {
    const createdError = new Error({
      functionName: 'SEND_ORDER_CONFIRMATION_EMAIL',
      detail: err.message,
    });

    await createdError.save();

    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
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
