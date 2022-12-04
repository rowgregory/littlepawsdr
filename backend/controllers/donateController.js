import asyncHandler from 'express-async-handler';
import Donation from '../models/donationModel.js';
import Error from '../models/errorModel.js';

//@desc   Create a donation
//@route  POST api/donate
//@access Public
const createDonation = asyncHandler(async (req, res) => {
  try {
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
  } catch (err) {
    const createdError = new Error({
      functionName: 'CREATE_DONATION_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Get order by ID
// @route   GET /api/donations/:id
// @access  Private/Admin
const getDonationById = asyncHandler(async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    res.json(donation);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_DONATION_BY_ID_ADMIN',
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

// @desc    Get all donations
// @route   GET /api/donations
// @access  Private/Admin
const getDonations = asyncHandler(async (req, res) => {
  try {
    const donations = await Donation.find({});

    res.json(donations);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_DONATION_LIST_ADMIN',
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

//@desc   Update donation
//@route  PUT api/donations/:id
//@access Private/Admin
const updateDonation = asyncHandler(async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    donation.hasLetterBeenSent = req.body.hasLetterBeenSent;

    const updatedDonation = await donation.save();

    res.json({
      hasLetterBeenSent: updatedDonation.hasLetterBeenSent,
    });
  } catch (err) {
    const createdError = new Error({
      functionName: 'UPDATE_DONATION_ADMIN',
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

// @desc    Delete donation
// @route   DELETE /api/donations/:id
// @access  Private/Admin
const deleteDonation = asyncHandler(async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    await donation.deleteOne();
    res.json({ message: 'Donation removed' });
  } catch (err) {
    const createdError = new Error({
      functionName: 'DELETE_DONATION_ADMIN',
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

export {
  createDonation,
  getDonationById,
  getDonations,
  updateDonation,
  deleteDonation,
};
