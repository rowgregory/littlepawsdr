import asyncHandler from 'express-async-handler';
import ECard from '../models/eCardModel.js';
import Error from '../models/errorModel.js';

//@desc   Create an eCard
//@route  POST api/ecard
//@access Private/Admin
const createECard = asyncHandler(async (req, res) => {
  const { category, price, image, name, thumb } = req.body;
  try {
    const eCard = new ECard({
      category,
      price,
      image,
      name,
      thumb
    });

    const createdECard = await eCard.save();

    res.status(201).json(createdECard);
  } catch (err) {
    const createdError = new Error({
      functionName: 'CREATE_ECARD_ADMIN',
      detail: err.message,
      user: {
        id: req.user._id,
        name: req.user.name,
      },
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Get all eCards
// @route   GET /api/ecard/filtered/:category
// @access  Public
const getFilteredEcards = asyncHandler(async (req, res) => {
  try {
    const eCards = await ECard.find({ category: req.params.category});

    res.json(eCards);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_FILTERED_ECARDS_LIST_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Get all eCards
// @route   GET /api/ecards
// @access  Public
const getECards = asyncHandler(async (req, res) => {
  try {
    const eCards = await ECard.find({});

    res.json(eCards);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_ECARDS_LIST_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Get eCard details
// @route   GET /api/ecard/:id
// @access  Private/Admin
const getECardDetails = asyncHandler(async (req, res) => {
  const eCard = await ECard.findById(req.params.id);

  if (eCard) {
    res.json(eCard);
  } else {
    const createdError = new Error({
      functionName: 'GET_ECARD_DETAILS_ADMIN',
      detail: err.message,
      user: {
        id: req.user._id,
        name: req.user.name,
      },
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

//@desc   Update an eCard
//@route  PUT api/ecard/:id
//@access Private/Admin
const updateECard = asyncHandler(async (req, res) => {
  const { category, price, image, name, thumb } = req.body;

  const eCard = await ECard.findById(req.params.id);

  if (eCard) {
    eCard.category = category ?? eCard.category;
    eCard.price = price ?? eCard.price;
    eCard.image = image ?? eCard.image;
    eCard.name = name ?? eCard.name;
    eCard.thumb = thumb ?? eCard.thumb;

    const updatedECard = await eCard.save();

    res.json(updatedECard);
  } else {
    const createdError = new Error({
      functionName: 'UPDATE_ECARD_ADMIN',
      detail: err.message,
      user: {
        id: req.user._id,
        name: req.user.name,
      },
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Delete an eCard
// @route   DELETE /api/ecard/:id
// @access  Private/Admin
const deleteEcard = asyncHandler(async (req, res) => {
  const eCard = await ECard.findById(req.params.id);

  if (eCard) {
    await eCard.deleteOne();
    res.json({ message: 'ECard removed' });
  } else {
    const createdError = new Error({
      functionName: 'DELETE_ECARD_ADMIN',
      detail: err.message,
      user: {
        id: req.user._id,
        name: req.user.name,
      },
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

export { createECard, getECards, getFilteredEcards, getECardDetails, updateECard, deleteEcard };
