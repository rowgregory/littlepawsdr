import asyncHandler from 'express-async-handler';
import Donation from '../models/donationModel.js';

//@desc   Create a donation
//@route  POST api/donate
//@access Public
const createDonation = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    zipPostalCode,
    city,
    state,
    email,
    donationAmount,
    inMemoryOfWho,
    inHonorOfWho,
    addressForAcknowledgementMemory,
    addressForAcknowledgementHonor,
    donationType,
  } = req.body;

  const donation = new Donation({
    firstName,
    lastName,
    address,
    zipPostalCode,
    city,
    state,
    email,
    donationAmount,
    inMemoryOfWho,
    inHonorOfWho,
    addressForAcknowledgementMemory,
    addressForAcknowledgementHonor,
    donationType,
  });

  const createdDonation = await donation.save();

  res.status(201).json(createdDonation);
});

// @desc    Get order by ID
// @route   GET /api/donations/:id
// @access  Private/Admin
const getDonationById = asyncHandler(async (req, res) => {
  const donation = await Donation.findById(req.params.id);

  if (donation) {
    res.json(donation);
  } else {
    res.status(404);
    throw new Error('Donation not found');
  }
});

// @desc    Get all donations
// @route   GET /api/donations
// @access  Private/Admin
const getDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find({});

  res.json(donations);
});

//@desc   Update an event
//@route  PUT api/donations/:id
//@access Private/Admin
const updateDonation = asyncHandler(async (req, res) => {
  const donation = await Donation.findById(req.params.id);

  if (donation) {
    donation.hasLetterBeenSent = req.body.hasLetterBeenSent;

    const updatedDonation = await donation.save();

    res.json({
      hasLetterBeenSent: updatedDonation.hasLetterBeenSent,
    });
  } else {
    res.status(404);
    throw new Error('Donation- not found');
  }
});

// @desc    Delete donation
// @route   DELETE /api/donations/:id
// @access  Private/Admin
const deleteDonation = asyncHandler(async (req, res) => {
  const donation = await Donation.findById(req.params.id);

  if (donation) {
    await donation.deleteOne();
    res.json({ message: 'Donation removed' });
  } else {
    res.status(404);
    throw new Error('Donation not found');
  }
});

export {
  createDonation,
  getDonationById,
  getDonations,
  updateDonation,
  deleteDonation,
};
