import User from '../../../models/userModel.js';
import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import semver from 'semver';
import { CURRENT_VERSION } from '../../../appVersion.js';
import Order from '../../../models/orderModel.js';

/**
 @desc    Get user profile with all related data
 @route   GET /api/users/profile
 @access  Private
*/
export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate([
        { path: 'addressRef' },
        { path: 'bugs' },
        {
          path: 'bids',
          options: { sort: { createdAt: -1 } },
          populate: [
            { path: 'user' },
            { path: 'auctionItem' },
            { path: 'auction', select: '-bidders -items -winningBids' },
          ],
        },
        {
          path: 'instantBuys',
          options: { sort: { createdAt: -1 } },
          populate: {
            path: 'auctionItem',
            populate: [{ path: 'auction' }, { path: 'photos' }],
          },
        },
        {
          path: 'winningBids',
          options: { sort: { createdAt: -1 } },
          populate: [{ path: 'auctionItems', populate: { path: 'photos' } }, { path: 'auction' }],
        },
        { path: 'adoptionFees', options: { sort: { createdAt: -1 } } },
        { path: 'donations', options: { sort: { createdAt: -1 } } },
      ])
      .select(
        'firstName lastName email jobTitle workSchedule isPublic isAdmin anonymousBidding lastLoginTime lastSeenChangelogVersion yourHome dachshundPreferences hasAddress profileGradient firstNameFirstInitial lastNameFirstInitial'
      );

    const showChangelog = semver.gt(CURRENT_VERSION, user?.lastSeenChangelogVersion || '0.0.0');

    // Fetch orders by email and populate items
    const orders = await Order.find({ email: user.email })
      .populate('user', 'name email')
      .populate('items')
      .sort({ createdAt: -1 });

    // Convert to object but keep virtuals
    const userObj = user.toObject({ virtuals: true });

    res.status(200).json({
      user: {
        ...userObj,
        orders,
      },
      showChangelog,
      currentVersion: CURRENT_VERSION,
    });
  } catch (err) {
    await Error.create({
      functionName: 'FETCH_USER_PROFILE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({ message: 'Error fetching user profile' });
  }
});
