import asyncHandler from 'express-async-handler';
import Log from '../../../models/logModel.js';
import Order from '../../../models/orderModel.js';
import User from '../../../models/userModel.js';
import Error from '../../../models/errorModel.js';
import createOrderItems from '../../../utils/order/createOrderItems.js';
import handleInstantDeliveries from '../../../utils/order/handleInstantDeliveries.js';
import updateProductInventory from '../../../utils/order/updateProductInventory.js';
import createPugEmailClient from '../../../utils/emailClients.js';
import sendEmailWithRetry from '../../../utils/cron/sendEmailWithRetry.js';

/**
@desc    Create new order
@route   POST /api/order/create
@access  Public
*/
const createOrder = asyncHandler(async (req, res) => {
  const journeyId = `CREATE_ORDER_${Date.now()}`;
  const events = [];

  const pugEmail = createPugEmailClient();

  try {
    const {
      orderItems,
      shippingAddress,
      subtotal,
      shippingPrice,
      totalPrice,
      paypalOrderId,
      email,
      name,
    } = req.body;

    events.push({
      message: 'CREATE_ORDER_INITIATED',
      data: {
        itemCount: orderItems.length,
        totalPrice,
        email,
      },
    });

    // Validate order items
    if (!orderItems || orderItems.length === 0) {
      events.push({
        message: 'VALIDATION_ERROR',
        data: { error: 'No items in order' },
      });

      await Log.create({ journey: journeyId, events });

      return res.status(400).json({
        message: 'Order must contain at least one item',
      });
    }

    // Validate email
    if (!email) {
      events.push({
        message: 'VALIDATION_ERROR',
        data: { error: 'Email is required' },
      });

      await Log.create({ journey: journeyId, events });

      return res.status(400).json({
        message: 'Email is required',
      });
    }

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      events.push({
        message: 'USER_NOT_FOUND_CREATING_NEW',
        data: { email },
      });

      // Create new user record
      user = await User.create({
        email,
        name: name || email.split('@')[0], // Use provided name or extract from email
        isGuest: true, // Mark as guest checkout user
      });

      events.push({
        message: 'USER_CREATED',
        data: {
          userId: user._id,
          email: user.email,
          isGuest: true,
        },
      });
    } else {
      events.push({
        message: 'USER_FOUND',
        data: {
          userId: user._id,
          email: user.email,
        },
      });
    }

    // Create main order with user reference
    const order = await Order.create({
      user: user._id, // ✅ Use found or created user ID
      email: user.email,
      name: user.name,
      shippingAddress: shippingAddress || null,
      subtotal,
      shippingPrice,
      totalPrice,
      paypalOrderId,
      status: 'completed',
      shippingStatus: shippingAddress ? 'not-shipped' : 'digital',
    });

    events.push({
      message: 'ORDER_CREATED',
      data: {
        orderId: order._id,
        userId: user._id,
        email: order.email,
      },
    });

    // Create all order items
    const createdItems = await createOrderItems(orderItems, order, journeyId, events);

    // Add items to order
    order.items = createdItems.map((item) => item._id);
    await order.save();

    events.push({
      message: 'ORDER_ITEMS_CREATED',
      data: {
        itemCount: createdItems.length,
        orderId: order._id,
      },
    });

    //  Update product inventory for physical products
    await updateProductInventory(createdItems);

    // Handle instant digital sends
    await handleInstantDeliveries(createdItems);

    await sendEmailWithRetry(pugEmail, {}, 'ordernotification');

    await Log.create({
      journey: journeyId,
      events,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        orderId: order._id,
        userId: user._id,
        totalPrice: order.totalPrice,
      },
    });
  } catch (err) {
    events.push({
      message: 'CREATE_ORDER_ERROR',
      data: {
        error: err.message,
        name: err.name,
      },
    });

    await Log.create({ journey: journeyId, events });

    await Error.create({
      functionName: 'CREATE_ORDER',
      detail: `PayPal Order ID: ${req.body?.paypalOrderId}, Email: ${req.body?.email}`,
      user: {
        email: req.body?.email,
      },
      state: 'creating_order',
      status: 500,
      name: err.name,
      message: err.message,
    });

    res.status(500).json({
      success: false,
      message: `Error creating order: ${err.message}`,
      paypalOrderId: req.body?.paypalOrderId,
    });
  }
});

export default createOrder;
