import asyncHandler from 'express-async-handler';
import { AuctionItemInstantBuyer, AuctionWinningBidder, Bid } from '../../../models/campaignModel.js';
import AdoptionFee from '../../../models/adoptionFeeModel.js';
import Order from '../../../models/orderModel.js';
import User from '../../../models/userModel.js';
import Donation from '../../../models/donationModel.js';
import Error from '../../../models/errorModel.js';

/**
 @desc    Get my campaigns
 @route   GET /api/users/profile
 @access  Private
*/
const fetchUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('addressRef')
      .select(
        'firstName lastName email isAdmin firstNameFirstInitial lastNameFirstInitial shippingAddress hasAddress name anonymousBidding lastLoginTime'
      );

    const bids = await Bid.find({ user: req.user._id }).populate([
      { path: 'user' },
      { path: 'auctionItem' },
      {
        path: 'auction',
        select: '-bidders -items -winningBids',
        populate: [{ path: 'campaign', select: 'title customCampaignLink' }],
      },
    ]);

    const instantBuys = await AuctionItemInstantBuyer.find({
      email: req.user.email,
    }).populate([
      {
        path: 'auctionItem',
        populate: [{ path: 'auction', populate: [{ path: 'campaign', select: 'title' }] }, { path: 'photos' }],
      },
    ]);

    const winningBids = await AuctionWinningBidder.find({ user: req.user._id }).populate([
      { path: 'auctionItems', populate: [{ path: 'photos' }] },
      { path: 'auction', populate: [{ path: 'campaign', select: 'title customCampaignLink' }] },
    ]);

    const adoptionApplicationFees = await AdoptionFee.find({
      emailAddress: req.user.email,
    }).sort({ createdAt: -1 });

    const orders = await Order.find({ email: req.user.email })
      .sort({ createdAt: -1 })
      .populate([{ path: 'products' }, { path: 'ecards' }, { path: 'welcomeWieners' }]);

    const donations = await Donation.find({ email: req.user.email });

    res.status(200).json({
      bids,
      instantBuys,
      orders,
      winningBids,
      adoptionApplicationFees,
      user,
      donations,
      isAuthenticated: true,
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

export default fetchUserProfile;
