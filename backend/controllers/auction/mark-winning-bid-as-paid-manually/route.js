import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { logEvent, prepareLog } from '../../../utils/logHelpers.js';
import { AuctionWinningBidder } from '../../../models/auctionWinningBidderModel.js';
import { Auction } from '../../../models/auctionModel.js';
import mongoose from 'mongoose';

const VALID_PAYMENT_METHODS = [
  'venmo',
  'cash',
  'check',
  'zelle',
  'bank_transfer',
  'cash_app',
  'wire_transfer',
  'other',
];

/**
 * @desc    Admin manually mark winning bid as paid (offline payment)
 * @route   PUT /api/winning-bidder/mark-paid-manual
 * @access  Private/Admin
 */
const markWinningBidAsPaidManually = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const log = await prepareLog('MARK_WINNING_BID_PAID_MANUAL');

  try {
    const { id, paymentMethod } = req.body;

    // Validate payment method
    if (!VALID_PAYMENT_METHODS.includes(paymentMethod)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    // Update winning bidder status
    const winningBidder = await AuctionWinningBidder.findByIdAndUpdate(
      id,
      {
        winningBidPaymentStatus: 'Paid',
        auctionItemPaymentStatus: 'Paid',
        shippingStatus: 'Pending Fulfillment',
        paymentMethod,
        paidOn: new Date(),
        manualPayment: true,
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

    // Update auction
    const auction = await Auction.findById(winningBidder.auction).session(session);

    if (!auction) {
      await session.abortTransaction();
      session.endSession();
      logEvent(log, 'WARNING: Auction not found', winningBidder.auction);
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Add email to supporters if new
    if (winningBidder?.user?.email && !auction.supporterEmails.includes(winningBidder.user.email)) {
      auction.supporterEmails.push(winningBidder.user.email);
    }

    auction.supporters = auction.supporterEmails.length;
    auction.totalAuctionRevenue += winningBidder.totalPrice;

    await auction.save({ session });

    await session.commitTransaction();
    session.endSession();

    logEvent(log, 'PAYMENT RECORDED', { winningBidderId: id, auctionId: auction._id });

    res.status(200).json({ paymentSuccess: true, winningBidder });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    await Error.create({
      functionName: 'MARK_WINNING_BID_PAID_MANUAL',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({ message: 'Error marking winning bid as paid' });
  }
});

export default markWinningBidAsPaidManually;
