import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { sendEmail } from '../utils/sendEmail.js';
import Error from '../models/errorModel.js';
import ECardOrder from '../models/eCardOrderModel.js';
import WelcomeWienerOrder from '../models/welcomeWienerOrderModel.js';
import ProductOrder from '../models/productOrderModel.js';

// @desc    Create new order
// @route   POST /api/order
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
  const {
    name,
    orderItems,
    subtotal,
    totalPrice,
    paypalOrderId,
    email,
    shippingAddress,
    shippingPrice,
    isPhysicalProduct,
    totalItems,
  } = req.body;

  try {
    const order = new Order({
      name,
      orderItems,
      totalPrice,
      subtotal,
      paypalOrderId,
      email,
      shippingAddress,
      shippingPrice,
      confirmationEmailHasBeenSent: false,
      isShipped: false,
      requiresShipping: isPhysicalProduct,
      totalItems,
    });

    const createdOrder = await order.save();

    const ecards = createdOrder.orderItems.filter(item => {
      return item.dateToSend;
    });

    if (ecards) {
      await ecards?.map(async item => {
        const createdEcardOrder = new ECardOrder({
          productId: item.productId,
          recipientsFullName: item.recipientsFullName,
          recipientsEmail: item.recipientsEmail,
          dateToSend: item.dateToSend,
          email,
          message: item.message,
          totalPrice: item.price,
          subtotal: item.price,
          image: item.productImage,
          productName: item.productName,
          quantity: 1,
          isPhysicalProduct: false,
          orderId: createdOrder._id,
        });

        return await createdEcardOrder.save();
      });
    }

    const welcomeWieners = createdOrder.orderItems.filter(item => {
      return item.dachshundId;
    });

    if (welcomeWieners) {
      await welcomeWieners?.map(async item => {
        const createdWelcomeWienerOrder = new WelcomeWienerOrder({
          dachshundId: item.dachshundId,
          dachshundImage: item.dachshundImage,
          dachshundName: item.dachshundName,
          price: item.price,
          productId: item.productId,
          productIcon: item.productIcon,
          productName: item.productName,
          quantity: item.quantity,
          email,
          isPhysicalProduct: false,
          subtotal: item.quantity * item.price,
          totalPrice: item.quantity * item.price,
          orderId: createdOrder._id,
        });

        return await createdWelcomeWienerOrder.save();
      });
    }

    const products = createdOrder.orderItems.filter(item => {
      return item.isPhysicalProduct;
    });

    if (products) {
      await products?.map(async item => {
        const createdProductOrder = new ProductOrder({
          price: item.price,
          productId: item.productId,
          productImage: item.productImage,
          productName: item.productName,
          quantity: item.quantity,
          size: item.size,
          shippingPrice: item.shippingPrice,
          email,
          isPhysicalProduct: true,
          subtotal: item.quantity * item.price,
          totalPrice:
            item.quantity * item.price +
            Number(item.shippingPrice) * item.quantity,
          orderId: createdOrder._id,
        });

        return await createdProductOrder.save();
      });
    }

    if (shippingPrice > 0) {
      for (const item of products) {
        const product = await Product.findById(item.productId);
        const objIndex = product?.sizes?.findIndex(
          obj => obj?.size === item?.size
        );

        if (product?.sizes?.length > 0) {
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
        } else {
          product.countInStock = product.countInStock - item.quantity;

          await product.save();
        }
      }
    }

    let hasEmailBeenSent = false;

    const emailHasSent = await sendEmail(
      createdOrder,
      res,
      'sendOrderConfirmationEmail',
      '',
      hasEmailBeenSent
    );

    createdOrder.confirmationEmailHasBeenSent = emailHasSent;
    await createdOrder.save();

    res.status(201).json(createdOrder);
  } catch (err) {
    const createdError = new Error({
      functionName: 'CREATE_NEW_ORDER_PUBLIC',
      detail: `${err.message}, order id: ${paypalOrderId}`,
      user: {
        email,
      },
      status: 500,
    });
    await createdError.save();

    res.status(500).send({
      error: err.message,
      message: `Please call (***)***-**** to resolve issue, orderID: ${paypalOrderId}`,
      data: req.body,
      email,
      isShipped: false,
    });
  }
});

// @desc    Get order by ID
// @route   GET /api/order/:id
// @access  Public
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_ORDER_BY_ID_ADMIN',
      detail: err.message,
      STATUS: 500,
    });

    await createdError.save();

    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
});

// @desc    Get logged in user orders
// @route   GET /api/order/my-orders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({
      email: req.user.email,
    });
    const ecardOrders = await ECardOrder.find({
      email: req.user.email,
    });

    const convertedEcardOrders = ecardOrders.map(order => {
      // repair logic for converting legacy ecards to new order shape
      if (order?.firstName && order?.lastName) {
        const orderItems = [
          {
            _id: order?._id,
            price: order?.totalPrice,
            subtotal: order?.subTotal,
            quantity: 1,
            email: order?.email,
            isPhysicalProduct: order?.isPhysicalProduct,
            recipientsFullName: order?.recipientsFirstName,
            recipientsEmail: order?.recipientsEmail,
            dateToSend: order?.dateToSend,
            message: order?.message,
            isSent: order?.isSent,
            productImage: order?.image,
            productName: order?.name,
            isEcard: true,
          },
        ];

        return {
          _id: order?._id,
          name: `${order?.firstName}${order?.lastName}`,
          orderItems,
          totalPrice: order?.totalPrice,
          paypalOrderId: order?.orderId,
          email: order?.email,
          requiresShipping: order?.isPhysicalProduct,
          subtotal: order?.totalPrice,
          totalItems: 1,
          createdAt: order?.createdAt,
        };
      }
    });

    const ecardsAndOrders =
      convertedEcardOrders?.length > 0
        ? orders?.concat(convertedEcardOrders)
        : orders;

    res.status(200).json({ orders: ecardsAndOrders });
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
// @route   GET /api/order
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({});
    const ecardOrders = await ECardOrder.find({});
    const welcomeWienerOrders = await WelcomeWienerOrder.find({});
    const productOrders = await ProductOrder.find({});

    res.json({ orders, ecardOrders, welcomeWienerOrders, productOrders });
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
// @route   POST /api/order/send-order-confirmation-email
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

// @desc    Update order with tracking number
// @route   PUT /api/order/:id/tracking-number
// @access  Private/Admin
const updateOrderWithTrackingNumber = asyncHandler(async (req, res) => {
  try {
    const { trackingNumber } = req.body;
    const id = req.params.id;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json(`Order id ${id} not found`);

    order.trackingNumber = trackingNumber;
    order.isShipped = true;
    order.shippedOn = Date.now();

    const savedOrder = await order.save();

    let hasEmailBeenSent = false;

    const shippingEmailHasSent = await sendEmail(
      savedOrder,
      res,
      'sendOrderShippedConfirmationEmail',
      '',
      hasEmailBeenSent
    );

    savedOrder.orderShippedconfirmationEmailHasBeenSent = shippingEmailHasSent;

    await savedOrder.save();

    res
      .status(200)
      .json('Order updated and shipping confirmation email has been sent');
  } catch (err) {
    console.log('ERROR: ', err);
    const createdError = new Error({
      functionName: 'UPDATE_ORDER_WITH_TRACKING_NUMBER',
      detail: err.message,
    });

    await createdError.save();

    res.status(404).json({
      message: `500 - Server Error`,
    });
  }
});

export {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  sendOrderConfirmationEmail,
  updateOrderWithTrackingNumber,
};
