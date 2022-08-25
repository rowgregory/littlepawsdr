import asyncHandler from 'express-async-handler';
import GuestOrder from '../models/guestOrderModel.js';
import Product from '../models/productModel.js';

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
    size,
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
      size,
    });

    const createdGuestOrder = await guestOrder.save();

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
    }

    res.status(201).json(createdGuestOrder);
  } catch (error) {
    res.status(400);
    throw new Error(error);
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
  const guestOrder = await GuestOrder.findById(req.params.id);

  if (guestOrder) {
    guestOrder.isShipped = req.body.isShipped;
    guestOrder.shippedOn = Date.now();

    const updatedGuestOrder = await guestOrder.save();

    res.json(updatedGuestOrder);
  } else {
    res.status(404);
    throw new Error('Guest order not found!');
  }
});

export {
  addGuestOrderItems,
  getGuestOrderById,
  getGuestOrders,
  updateGuestOrderToShipped,
};
