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

  const { auctionId, auctionItemId, bidAmount } = req.body;
  const bidNum = Number(bidAmount);

  // ---- input validation (before opening a session) ----
  if (!mongoose.isValidObjectId(auctionId) || !mongoose.isValidObjectId(auctionItemId)) {
    return res.status(400).json({ message: 'Invalid auction or item id' });
  }
  if (!Number.isFinite(bidNum) || bidNum <= 0) {
    return res.status(400).json({ message: 'Bid amount must be a positive number' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const auction = await Auction.findOne({ _id: auctionId, status: 'ACTIVE' }, { _id: 1 }).session(
      session,
    );

    if (!auction) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({ message: 'This auction has ended.' });
    }

    // ---- 1. Atomically claim the top-bid slot on the item ----
    // This is the "lock": the update only succeeds if bidNum meets the item's
    // current minimumBid. Combining the check and the update into one atomic
    // findOneAndUpdate closes the TOCTOU gap — if two bids race, only one
    // matches the predicate and the other gets null (and a 409).
    const claimedItem = await AuctionItem.findOneAndUpdate(
      {
        _id: auctionItemId,
        auction: auctionId,
        isAuction: true,
        minimumBid: { $lte: bidNum },
      },
      {
        currentBid: bidNum,
        minimumBid: bidNum + 1,
        $inc: { totalBids: 1 },
      },
      { new: true, session },
    );

    if (!claimedItem) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        message: 'Someone placed a higher bid — please refresh and try again',
      });
    }

    // ---- 2. Get previous top bid (for outbid email) ----
    // Done after the claim so the read reflects the pre-claim state of Bid docs.
    const previousTopBid = await Bid.findOne({
      auctionItem: auctionItemId,
      status: 'Top Bid',
    })
      .session(session)
      .populate([
        { path: 'auctionItem', populate: [{ path: 'photos' }] },
        { path: 'auction', select: 'customAuctionLink' },
      ]);

    // ---- 3. Create the new bid ----
    const [bid] = await Bid.create(
      [
        {
          auction: auctionId,
          auctionItem: auctionItemId,
          user: req.user?._id,
          bidAmount: bidNum,
          email: req.user.email,
          bidder: req.user.anonymousBidding ? 'Anonymous' : req.user?.name,
          status: 'Top Bid',
        },
      ],
      { session },
    );

    // ---- 4. Demote previous bids on this item ----
    await Bid.updateMany(
      { auctionItem: auctionItemId, _id: { $ne: bid._id }, status: 'Top Bid' },
      { status: 'Outbid' },
      { session },
    );

    // ---- 5. Attach bid to the item ----
    await AuctionItem.findByIdAndUpdate(auctionItemId, { $push: { bids: bid._id } }, { session });

    // ---- 6. Handle bidder record ----
    const existingBidder = await AuctionBidder.findOne({
      user: req.user._id,
      auction: auctionId,
    }).session(session);

    if (existingBidder) {
      await AuctionBidder.findByIdAndUpdate(
        existingBidder._id,
        { $push: { bids: bid._id } },
        { session },
      );
      await Auction.findByIdAndUpdate(auctionId, { $push: { bids: bid._id } }, { session });
    } else {
      const [newBidder] = await AuctionBidder.create(
        [{ auction: auctionId, user: req.user._id, bids: [bid._id], status: 'Bidding' }],
        { session },
      );
      await Auction.findByIdAndUpdate(
        auctionId,
        { $push: { bidders: newBidder._id, bids: bid._id } },
        { session },
      );
    }

    // ---- 7. Link auction to user ----
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { auctions: auctionId } }, { session });

    await session.commitTransaction();
    session.endSession();

    // ---- 8. Send outbid email AFTER transaction succeeds ----
    if (previousTopBid?.email && previousTopBid.email !== req.user.email) {
      try {
        await sendEmailWithRetry(
          pugEmail,
          {
            to: previousTopBid.email,
            previousTopBidId: previousTopBid._id,
            email: previousTopBid.email,
            previousTopBid: previousTopBid.bidAmount,
            topBid: bidNum,
            itemImage: previousTopBid.auctionItem.photos[0]?.url,
            itemName: previousTopBid.auctionItem.name,
            link: `https://www.littlepawsdr.org/auctions/${previousTopBid.auction.customAuctionLink}/item/${auctionItemId}`,
          },
          'outBidNotification',
        );
        await Bid.findByIdAndUpdate(previousTopBid._id, { outBidEmailSent: true });
      } catch (emailErr) {
        // Don't fail the bid if email fails — just log it
        await Error.create({
          functionName: 'CREATE_BID_OUTBID_EMAIL',
          name: emailErr.name,
          message: emailErr.message,
          user: { id: req?.user?._id, email: req?.user?.email },
        });
      }
    }

    res.status(200).json({ confirmedBidAmount: bidNum });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    await Error.create({
      functionName: 'CREATE_BID_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({ message: 'Error creating bid' });
  }
});

export default createBid;
