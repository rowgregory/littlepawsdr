import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';
import Error from '../../models/errorModel.js';

/**
 * @desc    Get all orders
 * @route   GET /api/order
 * @access  Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('items');

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    await Error.create({
      functionName: 'GET_ALL_ORDERS_ADMIN',
      detail: 'Failed to fetch all orders',
      user: {
        id: req.user?._id,
        email: req.user?.email,
      },
      state: 'fetching_orders',
      status: 500,
      name: err.name,
      message: err.message,
    });

    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
    });
  }
});

export default getOrders;
