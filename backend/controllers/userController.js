import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Error from '../models/errorModel.js';
import {
  AuctionDonation,
  AuctionItemInstantBuyer,
  AuctionWinningBidder,
  Bid,
} from '../models/campaignModel.js';
import AdoptionFee from '../models/adoptionFeeModel.js';
import Order from '../models/orderModel.js';
import Donation from '../models/donationModel.js';
import validateShippingAddress from '../utils/user-utils/validatieShippingAddress.js';

/**
 @desc    Get all users
 @route   GET /api/users
 @access  Private/Admin
*/
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});

    res.json({ users });
  } catch (err) {
    await Error.create({
      functionName: 'GET_ALL_USERS_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error fetching users`,
      sliceName: 'userApi',
    });
  }
});

/**
 @desc    Get user by id
 @route   GET /api/users/:id
 @access  Private/Admin
*/
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -token');

    res.json({
      isAdmin: user.isAdmin,
      name: user.name,
      email: user.email,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
      onlineStatus: user?.onlineStatus,
      online: user?.online,
    });
  } catch (err) {
    await Error.create({
      functionName: 'GET_USER_BY_ID_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error fetching user`,
      sliceName: 'userApi',
    });
  }
});

/**
 @desc    Get user shipping address
 @route   GET /api/users/shipping-address
 @access  Public
*/
const getUserShippingAddress = asyncHandler(async (req, res) => {
  try {
    if (req.params.userId === undefined) {
      return res.json({ hasShippingAddress: false });
    }
    const user = await User.findById(req.params.userId).select('shippingAddress');

    if (!user) {
      return res.json({ hasShippingAddress: false });
    }

    const isValid = validateShippingAddress(user.shippingAddress);
    if (isValid) {
      res.status(200).json({ hasShippingAddress: true });
    } else {
      res.status(200).json({ hasShippingAddress: false });
    }
  } catch (err) {
    await Error.create({
      functionName: 'GET_USER_SHIPPING_ADDRESS',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error fetching user shipping address ${err.message}`,
      sliceName: 'userApi',
    });
  }
});

/**
 @desc    Update User private
 @route   GET /api/users/:id
 @access  Private
*/
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { type, ...rest } = req.body;

    let objToUpdate = {};
    if (req.body.data.firstName || req.body.data.lastName) {
      objToUpdate = {
        ...rest.data,
        firstNameFirstInitial: req.body.data.firstName.charAt(0),
        lastNameFirstInitial: req.body.data.lastName.charAt(0),
        name: `${req.body.data.firstName} ${req.body.data.lastName}`,
      };
    } else {
      objToUpdate = { ...rest.data };
    }

    const user = await User.findByIdAndUpdate(req.params.id, objToUpdate, { new: true }).select(
      'name email shippingAddress'
    );

    await AuctionDonation.updateMany(
      { email: user.email },
      { donor: user.anonymousBidding ? 'Anonymous' : user.name }
    );

    await Bid.updateMany(
      { email: user.email },
      { bidder: user.anonymousBidding ? 'Anonymous' : user.name }
    );

    const isValid = validateShippingAddress(user.shippingAddress);
    if (isValid) {
      res.status(200).json({
        hasShippingAddress: true,
        message: 'User updated',
        type,
        sliceName: 'userApi',
      });
    } else {
      res.status(200).json({
        hasShippingAddress: false,
        message: 'User updated',
        type,
        sliceName: 'userApi',
      });
    }
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE USER',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Error updating user`,
      sliceName: 'userApi',
    });
  }
});

/**
 @desc    Update user role
 @route   PUT /api/users/role/:id
 @access  Private/Admin
*/
const updateUserRole = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isAdmin: req.body.isAdmin }, { new: true });

    res.status(200).json({ message: 'User updated', sliceName: 'userApi' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_USER_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(404).json({
      message: 'Error updating user role',
      sliceName: 'userApi',
    });
  }
});

/**
 @desc    Delete user
 @route   DELETE /api/users/:id
 @access  Private/Admin
*/
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await Userrrr.findById(req.params.id);

    await user.deleteOne();
    res.json({ message: 'User removed', sliceName: 'userApi' });
  } catch (err) {
    await Error.create({
      functionName: 'DELETE_USER_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(404).json({
      message: `Error deleting user`,
      sliceName: 'userApi',
    });
  }
});

/**
 @desc    Get my campaigns
 @route   GET /api/users/personal-data
 @access  Private
*/
const fetchPersonalData = asyncHandler(async (req, res) => {
  try {
    const bids = await Bid.find({ user: req.user._id }).populate([
      { path: 'user' },
      { path: 'auctionItem' },
      {
        path: 'auction',
        select: '-bidders -donations -items -winningBids',
        populate: [{ path: 'campaign', select: 'title customCampaignLink' }],
      },
    ]);

    const auctionDonations = await AuctionDonation.find({ email: req.user.email }).populate([
      {
        path: 'auctionId',
        select: '-bidders -donations -items -winningBids',
        populate: { path: 'campaign', select: 'title' },
      },
    ]);

    const instantBuys = await AuctionItemInstantBuyer.find({
      email: req.user.email,
    }).populate([
      {
        path: 'auctionItem',
        populate: [
          { path: 'auction', populate: [{ path: 'campaign', select: 'title' }] },
          { path: 'photos' },
        ],
      },
    ]);

    const winningBids = await AuctionWinningBidder.find({ user: req.user._id }).populate([
      { path: 'auctionItem', populate: [{ path: 'photos' }] },
      { path: 'auction', populate: [{ path: 'campaign', select: 'title customCampaignLink' }] },
    ]);

    const adoptionApplicationFees = await AdoptionFee.find({
      emailAddress: req.user.email,
    }).sort({ createdAt: -1 });

    const orders = await Order.find({ email: req.user.email })
      .sort({ createdAt: -1 })
      .populate([{ path: 'products' }, { path: 'ecards' }, { path: 'welcomeWieners' }]);

    const user = await User.findById(req.user._id);

    const donations = await Donation.find({ email: req.user.email });

    res.status(200).json({
      bids,
      auctionDonations,
      instantBuys,
      orders,
      winningBids,
      adoptionApplicationFees,
      user,
      donations,
    });
  } catch (err) {
    await Error.create({
      functionName: 'GET_MY_DATA_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: `Failed to fetch personal data: ${err.message}`,
      sliceName: 'userApi',
    });
  }
});

export {
  getUsers,
  getUser,
  getUserShippingAddress,
  updateUser,
  deleteUser,
  updateUserRole,
  fetchPersonalData,
};
