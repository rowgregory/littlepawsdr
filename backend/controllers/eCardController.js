import asyncHandler from 'express-async-handler';
import ECard from '../models/eCardModel.js';
import { cloudImages } from '../data/cloudImages.js';

//@desc   Create an eCard
//@route  POST api/ecard
//@access Private/Admin
const createECard = asyncHandler(async (req, res) => {
  const eCard = new ECard({
    category: 'Holiday',
    price: '10',
    image: cloudImages().upload,
    publicId: '',
  });

  const createdECard = await eCard.save();

  res.status(201).json(createdECard);
});

// @desc    Get all eCards
// @route   GET /api/ecards
// @access  Private/Admin
const getECards = asyncHandler(async (req, res) => {
  const eCards = await ECard.find({});

  res.json(eCards);
});

// @desc    Get eCard details
// @route   GET /api/ecard/:id
// @access  Private/Admin
const getECardDetails = asyncHandler(async (req, res) => {
  const eCard = await ECard.findById(req.params.id);

  if (eCard) {
    res.json(eCard);
  } else {
    res.status(404);
    throw new Error('ECard not found');
  }
});

//@desc   Update an eCard
//@route  PUT api/ecard/:id
//@access Private/Admin
const updateECard = asyncHandler(async (req, res) => {
  const { category, price, image, publicId } = req.body;

  const eCard = await ECard.findById(req.params.id);

  if (eCard) {
    eCard.category = category || eCard.category;
    eCard.price = price || eCard.price;
    eCard.image = image || eCard.image;
    eCard.publicId = publicId || eCard.publicId;

    const updatedECard = await eCard.save();

    res.json(updatedECard);
  } else {
    res.status(404);
    throw new Error('ECard not found');
  }
});

// @desc    Delete an eCard
// @route   DELETE /api/ecard/:id
// @access  Private/Admin
const deleteEcard = asyncHandler(async (req, res) => {
  const eCard = await ECard.findById(req.params.id);

  if (eCard) {
    await eCard.remove();
    res.json({ message: 'ECard removed' });
  } else {
    res.status(404);
    throw new Error('ECard not found');
  }
});

export { createECard, getECards, getECardDetails, updateECard, deleteEcard };
