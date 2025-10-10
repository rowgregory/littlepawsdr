import asyncHandler from 'express-async-handler';
import Order from '../../../models/orderModel.js';
import { logEvent, prepareLog } from '../../../utils/logHelpers.js';

/**
@desc    Update order status
@route   PATCH /api/order/update-order-status
@access  Private Admin
*/
const updateOrderStatus = asyncHandler(async (req, res) => {
  const log = await prepareLog('UPDATE_ORDER_STATUS', new Date());
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.body.orderId, { status: 'Complete' }, { new: true });

    logEvent(log, 'UPDATE ORDER STATUS SUCCESS', {
      message: `Order with id ${updatedOrder._id} status successfully updated to complete.`,
      name: 'OrderStatusUpdate',
    });
    res.status(201).json({
      message: 'Order status updated successfully',
      order: { orderId: updatedOrder?._id },
      sliceName: 'orderApi',
    });
  } catch (err) {
    logEvent(log, 'UPDATE ORDER STATUS ERROR', { message: err.message, name: err.name });
    await Error.create({
      functionName: 'UPDATE_ORDER_STATUS_PRIVATE_ADMIN_ERROR',
      name: err.name,
      message: err.message,
      user: req?.user,
    });

    res.status(500).json({
      message: `An error occurred.`,
      sliceName: 'orderApi',
    });
  }
});

export default updateOrderStatus;
