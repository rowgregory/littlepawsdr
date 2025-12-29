import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import Log from '../../../models/logModel.js';
import Order from '../../../models/orderModel.js';

/**
 * @desc    Get order by ID
 * @route   GET /api/order/:id
 * @access  Public
 */
const getOrderById = asyncHandler(async (req, res) => {
  const journeyId = `GET_ORDER_${Date.now()}`;
  const events = [];

  try {
    events.push({
      message: 'GET_ORDER_INITIATED',
      data: { orderId: req.params.id },
    });

    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items');

    if (!order) {
      events.push({
        message: 'ORDER_NOT_FOUND',
        data: { orderId: req.params.id },
      });

      await Log.create({ journey: journeyId, events });

      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    events.push({
      message: 'ORDER_RETRIEVED_SUCCESSFULLY',
      data: {
        orderId: order._id,
        itemCount: order.items.length,
        totalPrice: order.totalPrice,
      },
    });

    await Log.create({ journey: journeyId, events });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    events.push({
      message: 'GET_ORDER_ERROR',
      data: { error: err.message, orderId: req.params.id },
    });

    await Log.create({ journey: journeyId, events });

    await Error.create({
      functionName: 'GET_ORDER_BY_ID',
      detail: `Order ID: ${req.params.id}`,
      user: {
        id: req.user?._id,
        email: req.user?.email,
      },
      state: 'fetching_order',
      status: 500,
      name: err.name,
      message: err.message,
    });

    res.status(500).json({
      success: false,
      message: 'Error fetching order',
    });
  }
});

export default getOrderById;
