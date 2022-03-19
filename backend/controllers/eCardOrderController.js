import asyncHandler from 'express-async-handler';
import ECardOrder from '../models/eCardOrderModel.js';
import { send_mail } from '../server.js';

//@desc   Create an eCard order
//@route  POST api/ecard-order
//@access Public
const createECardOrder = asyncHandler(async (req, res) => {
  const {
    recipientsFirstName,
    recipientsEmail,
    dateToSend,
    sendYourselfACopy,
    firstName,
    lastName,
    email,
    message,
    taxPrice,
    totalPrice,
    image,
  } = req.body;

  try {
    const eCard = new ECardOrder({
      recipientsFirstName,
      recipientsEmail,
      dateToSend,
      sendYourselfACopy,
      firstName,
      lastName,
      email,
      message,
      taxPrice,
      totalPrice,
      image,
      isSent: false,
    });

    const createdECard = await eCard.save();

    send_mail(req.body, res, 'eCardPurchaseConfirmation');

    res.status(201).json(createdECard);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: 'ECard not created' });
  }
});

// @desc    Get eCard order by id
// @route   GET /api/ecard-order/:id
// @access  Public
const getECardOrderById = asyncHandler(async (req, res) => {
  const eCard = await ECardOrder.findById(req.params.id);

  if (eCard) {
    res.json(eCard);
  } else {
    res.status(404);
    throw new Error('ECard not found');
  }
});
// @desc    Get ecard orders
// @route   GET /api/ecard-order/list
// @access  Private/Admin
const getECardOrders = asyncHandler(async (req, res) => {
  try {
    const eCards = await ECardOrder.find({});

    if (eCards) {
      res.status(200).json(eCards);
    }
  } catch (error) {
    res.status(404);
    throw new Error('ECards not found');
  }
});

export { createECardOrder, getECardOrderById, getECardOrders };
