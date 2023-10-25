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
  const orderData = req.body;

  try {
    const createdOrder = await createOrderDocument(orderData);

    await createEcardOrders(createdOrder)
    await createWelcomeWienerOrders(createdOrder)
    await createProductOrders(createdOrder, res);

    await updateProductStock(createdOrder);

    let hasEmailBeenSent = false;
    const orderConfirmationEmailHasBeenSent = await sendEmail(
      createdOrder,
      res,
      'sendOrderConfirmationEmail',
      '',
      hasEmailBeenSent
    );

    createdOrder.confirmationEmailHasBeenSent = orderConfirmationEmailHasBeenSent;
    await createdOrder.save();

    res.status(201).json(createdOrder);
  } catch (err) {
    const createdError = new Error({
      functionName: 'CREATE_NEW_ORDER_PUBLIC',
      detail: `${err.message}, order id: ${orderData?.paypalOrderId}`,
      user: {
        email: orderData?.email,
      },
      status: 500,
    });
    await createdError.save();

    res.status(500).send({
      error: err.message,
      message: `PayPal Order Id: ${orderData?.paypalOrderId}`,
      data: orderData,
      email: orderData?.email,
      isShipped: false,
    });
  }
});

async function createOrderDocument(orderData) {
  const order = new Order({
    ...orderData,
    confirmationEmailHasBeenSent: false,
    isShipped: false,
    requiresShipping: orderData.isPhysicalProduct,
  });

  return await order.save();
}

async function createEcardOrders(createdOrder) {
  const ecards = createdOrder.orderItems.filter(item => item.dateToSend);

  if (ecards?.length > 0) {
    for (const item of ecards) {
      const createdEcardOrder = new ECardOrder({
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
  
      await createdEcardOrder.save();
    }
  }
}

async function createWelcomeWienerOrders(createdOrder) {
  const welcomeWieners = createdOrder.orderItems.filter(item => item.dachshundId);

  if (welcomeWieners?.length > 0) {
    for (const item of welcomeWieners) {
      const createdWelcomeWienerOrder = new WelcomeWienerOrder({
        ...item,
        dachshundId: item.dachshundId,
        dachshundImage: item.dachshundImage,
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

      return await createdWelcomeWienerOrder.save();
    };
  }
}

async function createProductOrders(createdOrder, res) {
  const products = createdOrder?.orderItems.filter(item => item.isPhysicalProduct);

  if (products?.length > 0) {
    const hasOrderNotificationEmailBeenSent = false;
    const orderNotificationEmailHasSent = await sendEmail(
      createdOrder,
      res,
      'sendOrderNotificationEmail',
      '',
      hasOrderNotificationEmailBeenSent
    )

    createdOrder.orderNotificationEmailHasBeenSent = orderNotificationEmailHasSent;
    await createdOrder.save();

    for (const item of products) {
      const createdProductOrder = new ProductOrder({
        ...item,
        price: item.price,
        email: createdOrder.email,
        isPhysicalProduct: true,
        subtotal: item.quantity * item.price,
        totalPrice:
          item.quantity * item.price +
          Number(item.shippingPrice) * item.quantity,
        orderId: createdOrder._id,
      });

      await createdProductOrder.save();
    };
  }
}

async function updateProductStock(createdOrder) {
  for (const item of createdOrder?.orderItems) {
    if (item.shippingPrice > 0 && item.isPhysicalProduct) {
      const product = await Product.findById(item.productId);
      if(product && product?.sizes) {
        const objIndex = product?.sizes?.findIndex(obj => obj?.size === item?.size);
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
          product.countInStock = (product.countInStock === null || product.countInStock === undefined) ? 0 : product.countInStock - item.quantity;

          await product.save();
        }
      }
    }
  }
}

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
