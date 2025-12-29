import { AuctionBidder } from '../../../models/auctionBidderModel.js';
import { AuctionItem } from '../../../models/auctionItemModel.js';
import { Auction } from '../../../models/auctionModel.js';
import { Bid } from '../../../models/bidModel.js';
import User from '../../../models/userModel.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Error from '../../../models/errorModel.js';
import sendEmailWithRetry from '../../../utils/cron/sendEmailWithRetry.js';
import createPugEmailClient from '../../../utils/emailClients.js';

/**
 @desc    Create bid
 @route   POST /api/auction/auction/item/place-bid
 @access  Private
*/
const createBid = asyncHandler(async (req, res) => {
  const pugEmail = await createPugEmailClient();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { auctionId, auctionItemId, bidAmount } = req.body;

    // Get previous top bid (before transaction operations)
    const previousTopBid = await Bid.findOne({ auctionItem: auctionItemId })
      .sort({ bidAmount: -1 })
      .populate([
        { path: 'auctionItem', populate: [{ path: 'photos' }] },
        { path: 'auction', select: 'customAuctionLink' },
      ]);

    // Create new bid
    const [createdBid] = await Bid.create(
      [
        {
          auction: auctionId,
          auctionItem: auctionItemId,
          user: req.user?._id,
          bidAmount,
          email: req.user.email,
          bidder: req.user.anonymousBidding ? 'Anonymous' : req.user?.name,
          status: 'Top Bid',
        },
      ],
      { session }
    );

    // Update other bids status
    await Bid.updateMany(
      { auctionItem: auctionItemId, _id: { $ne: createdBid._id } },
      { status: 'Outbid' },
      { session }
    );

    // Update auction item
    const bidsCount = await Bid.countDocuments({ auctionItem: auctionItemId }).session(session);

    await AuctionItem.findByIdAndUpdate(
      auctionItemId,
      {
        $push: { bids: createdBid._id },
        currentBid: bidAmount,
        minimumBid: bidAmount + 1,
        totalBids: bidsCount,
      },
      { session }
    );

    // Handle bidder
    const existingBidder = await AuctionBidder.findOne({
      user: req.user._id,
      auction: auctionId,
    }).session(session);

    if (existingBidder) {
      await AuctionBidder.findByIdAndUpdate(
        existingBidder._id,
        { $push: { bids: createdBid._id } },
        { session }
      );

      await Auction.findByIdAndUpdate(auctionId, { $push: { bids: createdBid._id } }, { session });
    } else {
      const [newBidder] = await AuctionBidder.create(
        [{ auction: auctionId, user: req.user._id, bids: [createdBid._id], status: 'Bidding' }],
        { session }
      );

      await Auction.findByIdAndUpdate(
        auctionId,
        { $push: { bidders: newBidder._id, bids: createdBid._id } },
        { session }
      );
    }

    // Add auction to user
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { auctions: auctionId } }, { session });

    await session.commitTransaction();
    session.endSession();

    // Send email AFTER transaction succeeds
    if (previousTopBid?.email) {
      await sendEmailWithRetry(
        pugEmail,
        {
          to: previousTopBid.email,
          previousTopBidId: previousTopBid._id,
          email: previousTopBid.email,
          previousTopBid: previousTopBid.bidAmount,
          topBid: bidAmount,
          itemImage: previousTopBid.auctionItem.photos[0]?.url,
          itemName: previousTopBid.auctionItem.name,
          link: `https://www.littlepawsdr.org/auctions/${previousTopBid.auction.customAuctionLink}/item/${auctionItemId}`,
        },
        'outBidNotification' // ✅ Template name
      );
      await Bid.findByIdAndUpdate(previousTopBid._id, { outBidEmailSent: true }, { new: true });
    }

    res.status(200).json({ confirmedBidAmount: bidAmount });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_BID_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({ message: `Error creating bid` });
  }
});

export default createBid;
