import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { AuctionWinningBidder } from '../../../models/auctionWinningBidderModel.js';
import { Auction } from '../../../models/auctionModel.js';
import Log from '../../../models/logModel.js';

/**
 * @desc    Record winning bid payment (PayPal)
 * @route   PUT /api/winning-bidder/record-payment
 * @access  Private
 */
const recordWinningBidPayment = asyncHandler(async (req, res) => {
  const journeyId = `RECORD_WINNING_BID_PAYMENT_${Date.now()}`;
  const session = await mongoose.startSession();
  session.startTransaction();

  const events = [];

  try {
    const { id, payPalId } = req.body;

    // Update winning bidder status
    const winningBidder = await AuctionWinningBidder.findByIdAndUpdate(
      id,
      {
        winningBidPaymentStatus: 'Paid',
        auctionItemPaymentStatus: 'Paid',
        shippingStatus: 'Pending Fulfillment',
        payPalId,
        paidOn: new Date(),
      },
      { new: true, session }
    ).populate([
      { path: 'auction', select: '_id' },
      { path: 'auctionItems' },
      { path: 'user', select: 'email' },
    ]);

    if (!winningBidder) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Winning bidder not found' });
    }

    events.push({
      message: 'WINNING_BIDDER_PAYMENT_STATUS_UPDATED',
      data: { winningBidderId: winningBidder._id, payPalId },
    });

    // Update auction
    const auction = await Auction.findById(winningBidder.auction).session(session);

    if (!auction) {
      await session.abortTransaction();
      session.endSession();
      events.push({
        message: 'WARNING_AUCTION_NOT_FOUND',
        data: { auctionId: winningBidder.auction },
      });
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Add email to supporters if new
    if (winningBidder?.user?.email && !auction.supporterEmails.includes(winningBidder.user.email)) {
      auction.supporterEmails.push(winningBidder.user.email);
      events.push({
        message: 'SUPPORTER_EMAIL_ADDED',
        data: { email: winningBidder.user.email, auctionId: auction._id },
      });
    }

    auction.supporters = auction.supporterEmails.length;
    auction.totalAuctionRevenue += winningBidder.totalPrice;

    await auction.save({ session });

    events.push({
      message: 'AUCTION_UPDATED',
      data: {
        auctionId: auction._id,
        supporters: auction.supporters,
        totalRevenue: auction.totalAuctionRevenue,
      },
    });

    // ✅ Commit transaction
    await session.commitTransaction();
    session.endSession();

    // ✅ Log after successful commit
    await Log.create({
      journey: journeyId,
      events,
    });

    res.status(200).json({ paymentSuccess: true, winningBidder });
  } catch (err) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();

    events.push({
      message: 'PAYMENT_RECORDING_FAILED',
      data: {
        error: err.message,
        name: err.name,
      },
    });

    await Log.create({
      journey: journeyId,
      events,
    });

    await Error.create({
      functionName: 'RECORD_WINNING_BID_PAYMENT',
      name: err.name,
      message: err.message,
    });

    res.status(500).json({ message: 'Error recording payment' });
  }
});

export default recordWinningBidPayment;
