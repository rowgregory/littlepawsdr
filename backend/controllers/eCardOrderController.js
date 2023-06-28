import asyncHandler from 'express-async-handler';
import ECardOrder from '../models/eCardOrderModel.js';
import Error from '../models/errorModel.js';

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

export { getECardOrderById };
