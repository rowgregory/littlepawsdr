import asyncHandler from 'express-async-handler';
import ECard from '../models/eCardModel.js';
import Error from '../models/errorModel.js';

/**
 @desc   Create an eCard
 @route  POST api/ecard
 @access Private/Admin
*/
const createECard = asyncHandler(async (req, res) => {
  const { category, price, image, name, thumb } = req.body;
  try {
    await ECard.create({
      category,
      price,
      image,
      name,
      thumb,
    });

    res.status(201).json({ message: 'Ecard created', sliceName: 'ecardApi' });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_ECARD_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error creating ecard',
      sliceName: 'ecardApi',
    });
  }
});

/**
 @desc    Get all eCards
 @route   GET /api/ecards
 @access  Public
*/
const getECards = asyncHandler(async (req, res) => {
  try {
    const ecards = await ECard.find({ name: { $nin: ["Valentine Alice", "Valentine Daphne"] } }).sort({ updated: -1 });

    const categories = [...new Set(ecards?.map((ecard) => ecard.category))];

    res.json({ ecards, categories });
  } catch (err) {
    await Error.create({
      functionName: 'GET_ECARDS_LIST_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching ecards',
      sliceName: 'ecardApi',
    });
  }
});

/**
 @desc    Get eCard details
 @route   GET /api/ecard/:id
 @access  Private/Admin
*/
const getECardDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const ecard = await ECard.findById(id);

    res.json({ ecard });
  } catch (err) {
    await Error.create({
      functionName: 'GET_ECARD_DETAILS_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching ecard',
      sliceName: 'ecardApi',
    });
  }
});
/**
 @desc   Update an eCard
@route  PUT api/ecard/:id
@access Private/Admin
*/
const updateECard = asyncHandler(async (req, res) => {
  try {
    await ECard.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ message: 'Ecard updated', sliceName: 'ecardApi' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_ECARD_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error updating ecard',
      sliceName: 'ecardApi',
    });
  }
});

/**
 @desc    Delete an eCard
 @route   DELETE /api/ecard/:id
 @access  Private/Admin
*/
const deleteEcard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const ecard = await ECard.findById(id);
    await ecard.deleteOne();

    res.json({ message: 'Ecard removed', sliceName: 'ecardApi' });
  } catch (err) {
    await Error.create({
      functionName: 'DELETE_ECARD_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error deleting ecard',
      sliceName: 'ecardApi',
    });
  }
});

export {
  createECard,
  getECards,
  getECardDetails,
  updateECard,
  deleteEcard,
};
