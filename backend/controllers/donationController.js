import asyncHandler from 'express-async-handler';
import Error from '../models/errorModel.js';
import Donation from '../models/donationModel.js';

/**
 @desc    Get all donations
 @route   GET /api/donation
 @access  Private/Admin
 */
const getDonations = asyncHandler(async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });

    res.json({ donations });
  } catch (err) {
    await Error.create({
      functionName: 'GET_DONATIONS_LIST_PRIVATE_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching donations',
      sliceName: 'donationApi',
    });
  }
});

/**
 @desc   Create a donation
 @route  POST api/donation
 @access Public
*/
const createDonation = asyncHandler(async (req, res) => {
  try {
    await Donation.create(req.body);

    res.status(201).json({ message: 'Donation created', sliceName: 'donationApi' });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_A_DONATION_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error creating donation',
      sliceName: 'donationApi',
    });
  }
});

export {
  getDonations,
  createDonation,
}