import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { sendEmail } from '../utils/sendEmail.js';
import Error from '../models/errorModel.js';
import ProductOrder from '../models/productOrderModel.js';
import getTrackingService from '../utils/getTrackingService.js';
import { logEvent, prepareLog } from '../utils/logHelpers.js';
import createEcardOrders from '../utils/order-helpers/createEcardOrders.js';
import createOrderDocument from '../utils/order-helpers/createOrderDocument.js';
import createWelcomeWienerOrders from '../utils/order-helpers/createWelcomeWienerOrders.js';
import createProductOrders from '../utils/order-helpers/createProductOrders.js';

/**
@desc    Create new order
@route   POST /api/order
@access  Public
*/
const createOrder = asyncHandler(async (req, res) => {
  const log = await prepareLog('CREATE_ORDER', new Date());
  try {
    const order = await createOrderDocument(req.body, req?.user, log);

    if (order.isEcard) {
      await createEcardOrders(req.body, order, log);
    }
    if (order?.isWelcomeWiener) {
      await createWelcomeWienerOrders(req.body, order, log);
    }
    if (order?.isProduct) {
      await createProductOrders(req.body, order, log);
    }

    res.status(201).json({
      message: 'Order created',
      order: { orderId: order?._id },
      sliceName: 'orderApi',
    });
  } catch (err) {
    logEvent(log, 'CREATE ORDER ERROR', { message: err.message, name: err.name });
    await Error.create({
      functionName: 'CREATE_NEW_ORDER_PUBLIC_ERROR',
      detail: `PaypalOrderId: ${req.body?.paypalOrderId}`,
      name: err.name,
      message: err.message,
      user: req?.user,
    });

    res.status(500).json({
      message: `PayPal Order Id: ${req.body?.paypalOrderId},`,
      sliceName: 'orderApi',
    });
  }
});

/**
@desc    Get order by ID
@route   GET /api/order/:id
@access  Public
*/
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate([
      { path: 'ecards' },
      { path: 'welcomeWieners' },
      { path: 'products' },
    ]);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ order });
  } catch (err) {
    await Error.create({
      functionName: 'GET_ORDER_BY_ID_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error fetching order`,
      sliceName: 'orderApi',
    });
  }
});

/**
@desc    Get all orders
@route   GET /api/order
@access  Private/Admin
*/
const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate([
        { path: 'user' },
        { path: 'ecards' },
        { path: 'welcomeWieners' },
        { path: 'products' },
      ]);

    res.status(200).json({ orders });
  } catch (err) {
    await Error.create({
      functionName: 'GET_ALL_ORDERS_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(404).json({
      message: `Error fetching orders`,
      sliceName: 'orderApi',
    });
  }
});

/**
@desc    Update order with tracking number
@route   PUT /api/order/:id/tracking-number
@access  Private/Admin
*/
const updateOrderWithTrackingNumber = asyncHandler(async (req, res) => {
  const log = await prepareLog('UPDATE ORDER WITH TRACKING NUMBER');
  logEvent(log, 'BEGINNING UPDATE ORDER WITH TRACKING NUMBER', {
    orderId: req?.body?.id,
    trackingNumber: req.body?.trackingNumber,
  });

  try {
    const { id, trackingNumber } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      {
        trackingNumber,
        shippingProvider: getTrackingService(trackingNumber),
        isShipped: true,
        shippedOn: Date.now(),
        status: 'Complete',
      },
      { new: true }
    );
    logEvent(log, 'ORDER UPDATED');

    const updatedProductOrder = await ProductOrder.findOneAndUpdate(
      { orderId: id },
      { status: 'Shipped' },
      { new: true }
    );
    logEvent(log, 'PRODUCT ORDER UPDATED', updatedProductOrder);

    await sendEmail(order, {}, 'sendOrderShippedConfirmationEmail');

    logEvent(log, 'END UPDATE ORDER WITH TRACKING NUMBER SUCCESSFULLY');
    res.status(200).json({
      message: 'Order updated and shipping confirmation email has been sent',
      sliceName: 'orderApi',
    });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_ORDER_WITH_TRACKING_NUMBER',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error updating order tracking number`,
      sliceName: 'orderApi',
    });
  }
});

export { createOrder, getOrderById, getOrders, updateOrderWithTrackingNumber };
