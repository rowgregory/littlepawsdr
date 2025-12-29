import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import Order from '../../../models/orderModel.js';

/**
 * @desc    Update order shipping status
 * @route   PUT /api/order/:id/update-shipping-status
 * @access  Private/Admin
 */
const updateShippingStatus = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { shippingStatus: 'shipped' },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Shipping status updated',
      order,
    });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_SHIPPING_STATUS',
      detail: `Order ID: ${req.params.id}`,
      user: {
        id: req.user?._id,
        email: req.user?.email,
      },
      state: 'updating_shipping_status',
      status: 500,
      name: err.name,
      message: err.message,
    });

    res.status(500).json({
      success: false,
      message: 'Error updating shipping status',
    });
  }
});

export default updateShippingStatus;
