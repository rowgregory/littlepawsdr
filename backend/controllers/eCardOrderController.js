import asyncHandler from 'express-async-handler';
import ECardOrder from '../models/eCardOrderModel.js';
import { sendEmail } from '../utils/sendEmail.js';
import Error from '../models/errorModel.js';

//@desc   Create an eCard order
//@route  POST api/ecard-order
//@access Public
const createECardOrder = asyncHandler(async (req, res) => {
  const {
    recipientsFirstName,
    recipientsEmail,
    dateToSend,
    firstName,
    lastName,
    email,
    message,
    totalPrice,
    image,
    name,
    orderId,
    subTotal,
  } = req.body;

  try {
    const eCard = new ECardOrder({
      recipientsFirstName,
      recipientsEmail,
      dateToSend,
      firstName,
      lastName,
      email,
      message,
      totalPrice,
      image,
      name,
      orderId,
      subTotal,
    });

    const createdECard = await eCard.save();

    sendEmail(createdECard, res, 'eCardPurchaseConfirmation');
  } catch (err) {
    const createdError = new Error({
      functionName: 'CREATE_ECARD_ORDER_PUBLIC',
      detail: err.message,
      user: {
        id: '',
        name: `${firstName} ${lastName}`,
        email: email,
      },
      state: `PayPal orderId: ${orderId}`,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Get eCard order by id
// @route   GET /api/ecard-order/:id
// @access  Public
const getECardOrderById = asyncHandler(async (req, res) => {
  try {
    const eCard = await ECardOrder.findById(req.params.id);

    res.json(eCard);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_ECARD_ORDER_BY_ID_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});
// @desc    Get ecard orders
// @route   GET /api/ecard-order/list
// @access  Private/Admin
const getECardOrders = asyncHandler(async (req, res) => {
  try {
    const eCards = await ECardOrder.find({});

    res.status(200).json(eCards);
  } catch (error) {
    const createdError = new Error({
      functionName: 'GET_ECARD_ORDER_LIST_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/my-ecard-orders
// @access  Private
const getMyEcardOrders = asyncHandler(async (req, res) => {
  try {
    const ecardOrders = await ECardOrder.find({ email: req.user.email });

    res.json(ecardOrders);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_MY_ECARD_ORDERS_PRIVATE',
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

export {
  createECardOrder,
  getECardOrderById,
  getECardOrders,
  getMyEcardOrders,
};
