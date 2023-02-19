import asyncHandler from 'express-async-handler';
import GuestOrder from '../models/guestOrderModel.js';
import Product from '../models/productModel.js';
import Error from '../models/errorModel.js';
import { sendEmail } from '../utils/sendEmail.js';

// @desc    Create new order
// @route   POST /api/guest-orders
// @access  Private
const addGuestOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    email,
    orderId,
  } = req.body;

  try {
    const guestOrder = new GuestOrder({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      email,
      orderId,
      isShipped: false,
      confirmationEmailHasBeenSent: false,
    });

    const createdGuestOrder = await guestOrder.save();

    let hasEmailBeenSent = false;

    if (createdGuestOrder) {
      for (const item of createdGuestOrder.orderItems) {
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

      const emailHasSent = await sendEmail(
        createdGuestOrder,
        res,
        'sendOrderConfirmationEmail',
        '',
        hasEmailBeenSent
      );

      createdGuestOrder.confirmationEmailHasBeenSent = emailHasSent;
      await createdGuestOrder.save();

      res.status(201).json(createdGuestOrder);
    }
  } catch (error) {
    const createdError = new Error({
      functionName: 'CREATE_NEW_GUEST_ORDER',
      detail: `${error.message}, order id: ${orderId}`,
    });
    await createdError.save();

    res.status(500).send({
      message: `Please call (***)***-**** to resolve issue, orderID: ${orderId}`,
      data: req.body,
      email,
      isShipped: false,
    });
  }
});

// @desc    Get order by ID
// @route   GET /api/guest-orders/:id
// @access  Public
const getGuestOrderById = asyncHandler(async (req, res) => {
  const order = await GuestOrder.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Guest order not found!');
  }
});

// @desc    Get all guest orders
// @route   GET /api/guest-orders
// @access  Private/Admin
const getGuestOrders = asyncHandler(async (req, res) => {
  const guestOrders = await GuestOrder.find({});

  res.json(guestOrders);
});

// @desc    Update guest order to shipped
// @route   PUT /api/guest-orders/:id/ship
// @access  Private/Admin
const updateGuestOrderToShipped = asyncHandler(async (req, res) => {
  try {
    const guestOrder = await GuestOrder.findById(req.params.id);

    guestOrder.isShipped = req.body.isShipped;
    guestOrder.shippedOn = Date.now();

    const updatedGuestOrder = await guestOrder.save();

    res.json(updatedGuestOrder);
  } catch (err) {
    const createdError = new Error({
      functionName: 'UPDATE_GUEST_ORDER_TO_SHIPPED',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
      },
      state: 'GUEST_ORDER_IS_NULL',
    });

    await createdError.save();

    res.status(404).json({
      message: `There was an error setting the guest order to shipped: ${err}`,
    });
  }
});

export {
  addGuestOrderItems,
  getGuestOrderById,
  getGuestOrders,
  updateGuestOrderToShipped,
};
