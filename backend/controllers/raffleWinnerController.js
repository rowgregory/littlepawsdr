import asyncHandler from 'express-async-handler';
import RaffleWinner from '../models/raffleWinnerModel.js';
import { cloudImages } from '../data/cloudImages.js';

// @desc    Get all raffle winners
// @route   GET /api/raffle-winners
// @access  Public
const getRaffleWinners = asyncHandler(async (req, res) => {
  const raffleWinners = await RaffleWinner.find({});

  res.json(raffleWinners);
});

// @desc    Get raffle winner details
// @route   GET /api/raffle-winner/:id
// @access  Public
const getRaffleWinnerDetails = asyncHandler(async (req, res) => {
  const raffleWinner = await RaffleWinner.findById(req.params.id);

  if (raffleWinner) {
    res.json(raffleWinner);
  } else {
    res.status(404);
    throw new Error('Raffle winner not found');
  }
});

// @desc    Create a raffle winner
// @route   POST /api/raffle-winner
// @access  Private/Admin
const createRaffleWinner = asyncHandler(async (req, res) => {
  const raffleWinner = new RaffleWinner({
    name: 'Sample name',
    image: cloudImages().upload,
    publicId: '',
    message: 'Sample message',
    month: new Date().toISOString().split('T')[0].substring(0, 7),
  });

  const createdRaffleWinner = await raffleWinner.save();

  res.status(201).json(createdRaffleWinner);
});

// @desc    Update a raffle winner
// @route   PUT /api/raffle-winner/:id
// @access  Private/Admin
const updateRaffleWinner = asyncHandler(async (req, res) => {
  const { name, image, publicId, message, month } = req.body;

  const raffleWinner = await RaffleWinner.findById(req.params.id);

  if (raffleWinner) {
    raffleWinner.name = name || raffleWinner.name;
    raffleWinner.image = image || raffleWinner.image;
    raffleWinner.publicId = publicId || raffleWinner.publicId;
    raffleWinner.message = message || raffleWinner.message;
    raffleWinner.month = month || raffleWinner.month;

    const updatedRaffleWinner = await raffleWinner.save();

    res.json(updatedRaffleWinner);
  } else {
    res.status(404);
    throw new Error('Raffle Winner not found');
  }
});

// @desc    Delete a raffle winner
// @route   DELETE /api/raffle-winner/:id
// @access  Private/Admin
const deleteRaffleWinner = asyncHandler(async (req, res) => {
  const raffleWinner = await RaffleWinner.findOne({ _id: req.params.id });

  if (raffleWinner) {
    await raffleWinner.remove();
    res.json({ message: 'Raffle winner removed' });
  } else {
    res.status(404);
    throw new Error('Raffle winner not found');
  }
});

export {
  getRaffleWinners,
  getRaffleWinnerDetails,
  createRaffleWinner,
  updateRaffleWinner,
  deleteRaffleWinner,
};
