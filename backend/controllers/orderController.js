import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { sendEmail } from '../utils/sendEmail.js';
import Error from '../models/errorModel.js';
import ECardOrder from '../models/eCardOrderModel.js';
import WelcomeWienerOrder from '../models/welcomeWienerOrderModel.js';
import ProductOrder from '../models/productOrderModel.js';
import getTrackingService from '../utils/getTrackingService.js';
import { logEvent, prepareLog } from '../utils/logHelpers.js';

/**
@desc    Create new order
@route   POST /api/order
@access  Public
*/
const createOrder = asyncHandler(async (req, res) => {
  const orderData = req.body;

  const log = await prepareLog('CREATE_ORDER');
  let createdOrder;
  try {
    logEvent(log, 'BEGINNING OF CREATE ORDER', orderData);
    createdOrder = await createOrderDocument(orderData, req?.user, log);

    if (createdOrder.isEcard) {
      await createEcardOrders(createdOrder);
    }

    if (createdOrder.isWelcomeWiener) {
      await createWelcomeWienerOrders(createdOrder, log);
    }

    if (createdOrder?.isProduct) {
      await sendEmail(log, {}, 'ADMIN_ORDER_NOTIFICATION');
      await updateProductStock(createdOrder, log);
    }

    logEvent(log, 'ALL CREATE ORDER TASKS FINISHED SUCCESSFULLY', { orderId: createdOrder?._id });
    await log.save();
    res.status(201).json({
      message: 'Order created',
      order: { orderId: createdOrder?._id },
      sliceName: 'orderApi',
    });
  } catch (err) {
    logEvent(log, 'CREATE ORDER ERROR', { message: err.message, name: err.name });
    await Error.create({
      functionName: 'CREATE_NEW_ORDER_PUBLIC',
      detail: `PaypalOrderId: ${orderData?.paypalOrderId}`,
      name: err.name,
      message: err.message,
      user: {
        id: req?.user?._id,
        email: req?.user?.email,
        ...(createdOrder && { orderId: createdOrder._id }),
      },
    });

    res.status(500).json({
      error: err.message,
      message: `PayPal Order Id: ${orderData?.paypalOrderId},`,
      data: orderData,
      email: orderData?.email,
      isShipped: false,
      sliceName: 'orderApi',
    });
  }
});

async function createOrderDocument(orderData, user, log) {
  try {
    logEvent(log, 'BEGINNING CREATE ORDER DOCUMENT');
    const order = await Order.create({
      ...orderData,
      requiresShipping: orderData?.requiresShipping,
      ...(user?._id && { user: user?._id }),
      ...(orderData?.isProduct && { isProduct: orderData?.isProduct }),
      ...(orderData?.isWelcomeWiener && { isWelcomeWiener: orderData?.isWelcomeWiener }),
      ...(orderData?.isEcard && { isEcard: orderData?.isEcard }),
      status: orderData?.requiresShipping ? 'Pending Fulfillment' : 'Digital Order',
    });
    logEvent(log, 'END CREATE ORDER DOCUMENT FINISH SUCCESSFULLY', order);
    await log.save();
    return order;
  } catch (err) {
    logEvent(log, 'CREATE ORDER DOCUMENT ERROR', { message: err.message, name: err.name });
    await log.save();
  }
}

async function createEcardOrders(createdOrder) {
  const ecards = createdOrder.orderItems.filter((item) => item.dateToSend);

  if (ecards?.length > 0) {
    for (const item of ecards) {
      await ECardOrder.create({
        ...item,
        productName: item.productName,
        message: item.message,
        dateToSend: item.dateToSend,
        recipientsEmail: item.recipientsEmail,
        recipientsFullName: item.recipientsFullName,
        productId: item.productId,
        email: createdOrder.email,
        isPhysicalProduct: false,
        totalPrice: item.price,
        subtotal: item.price,
        image: item.productImage,
        quantity: 1,
        orderId: createdOrder._id,
      });
    }
  }
}

async function createWelcomeWienerOrders(createdOrder, log) {
  logEvent(log, 'INITIATE WELCOME WIENER CREATE DOCUMENT');
  const welcomeWieners = createdOrder.orderItems.filter((item) => item.dachshundId);

  for (const item of welcomeWieners) {
    const welcomeWienerOrder = await WelcomeWienerOrder.create({
      ...item,
      dachshundId: item.dachshundId,
      productImage: item.productImage,
      dachshundName: item.dachshundName,
      price: item.price,
      productId: item.productId,
      productIcon: item.productIcon,
      productName: item.productName,
      quantity: item.quantity,
      email: createdOrder.email,
      isPhysicalProduct: false,
      subtotal: item.quantity * item.price,
      totalPrice: item.quantity * item.price,
      orderId: createdOrder._id,
    });
    logEvent(log, 'WELCOME WIENER ORDER DOCUMENT CREATED', welcomeWienerOrder);
    await log.save();
    return welcomeWienerOrder;
  }
}

async function updateProductStock(createdOrder, log) {
  for (const item of createdOrder?.orderItems) {
    const product = await Product.findById(item.productId);
    logEvent(log, 'PHYSICAL PRODUCT FOUND AND READY FOR UPDATING', product.name);

    const objIndex = product?.sizes?.findIndex((obj) => obj?.size === item?.size);

    if (product?.sizes?.length > 0) {
      logEvent(log, 'PRODUCT HAS SIZES - READY TO BULK EXECUTE', {
        productName: product.name,
        sizes: product?.sizes,
      });

      const bulk = Product.collection.initializeOrderedBulkOp();
      bulk.find({ 'sizes.size': item.size, _id: product?._id }).updateOne({
        $set: {
          'sizes.$.amount': product.sizes[objIndex].amount - item.quantity,
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
    }

    product.countInStock -= item.quantity;
    product.isOutofStock = product.countInStock === 0 ? true : false;

    logEvent(log, 'UPDATING COUNT IN STOCK AND OUT OF STOCK', {
      countInStock: product.countInStock,
      isOutOfStock: product.isOutOfStock,
    });

    await product.save();
    await log.save();
  }
}

/**
@desc    Get order by ID
@route   GET /api/order/:id
@access  Public
*/
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
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
    const orders = await Order.find({}).populate('user');
    const ecardOrders = await ECardOrder.find({});
    const welcomeWienerOrders = await WelcomeWienerOrder.find({});
    const productOrders = await ProductOrder.find({});

    res.status(200).json({ orders, ecardOrders, welcomeWienerOrders, productOrders });
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
  try {
    const { id, trackingNumber } = req.body;

    await ProductOrder.findOneAndUpdate({ orderId: id }, { status: 'Completed' });

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

    await sendEmail(order, res, 'sendOrderShippedConfirmationEmail');

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
