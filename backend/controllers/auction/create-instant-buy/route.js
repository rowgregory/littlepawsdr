import { AuctionItemInstantBuyer } from '../../../models/auctionItemInstantBuyerModel.js';
import { AuctionItem } from '../../../models/auctionItemModel.js';
import { Auction } from '../../../models/auctionModel.js';
import Error from '../../../models/errorModel.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

/**
 @desc    Create auction item instant buy
 @route   POST /api/auction/auction/item/instant-buy
 @access  Private
*/
const createInstantBuy = asyncHandler(async (req, res) => {
  const { auction, auctionItem, ...data } = req.body;

  // ---- input validation (before opening a session) ----
  if (!mongoose.isValidObjectId(auction) || !mongoose.isValidObjectId(auctionItem)) {
    return res.status(400).json({ message: 'Invalid auction or item id' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // ---- 1. Ensure the auction is still live ----
    const liveAuction = await Auction.findOne(
      { _id: auction, status: 'ACTIVE' },
      { _id: 1 },
    ).session(session);

    if (!liveAuction) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({ message: 'This auction has ended.' });
    }

    // ---- 2. Create the instant buyer (rolls back if the claim fails) ----
    const [created] = await AuctionItemInstantBuyer.create(
      [
        {
          auction,
          auctionItem,
          user: req.user?._id,
          name: req.user?.name,
          email: req.user?.email,
          totalPrice: data.totalPrice,
          isDigital: data.isDigital,
          shippingStatus: data.isDigital ? 'Digital' : 'Pending Fulfillment',
        },
      ],
      { session },
    );

    const instantBuyer = await created.populate([{ path: 'user' }, { path: 'auctionItem' }]);

    // ---- 3. Atomically claim a unit of stock ----
    // Only succeeds if quantity remains. If two buyers race for the last unit,
    // one matches { totalQuantity: { $gt: 0 } } and the other gets null → 409.
    const claimedItem = await AuctionItem.findOneAndUpdate(
      {
        _id: auctionItem,
        totalQuantity: { $gt: 0 },
      },
      {
        $inc: { totalQuantity: -1 },
        $push: { instantBuyers: instantBuyer._id },
      },
      { new: true, session },
    );

    if (!claimedItem) {
      // Aborting rolls back the instant-buyer doc created in step 2 as well.
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({ message: 'This item is sold out.' });
    }

    // ---- 4. Update the auction (attach buyer, recompute supporters + revenue) ----
    const updatedAuction = await Auction.findByIdAndUpdate(
      auction,
      { $push: { instantBuyers: instantBuyer._id } },
      { new: true, session },
    );

    if (!updatedAuction) throw new Error('Auction not found');

    const newEmail = instantBuyer?.email;
    if (newEmail && !updatedAuction.supporterEmails.includes(newEmail)) {
      updatedAuction.supporterEmails.push(newEmail);
    }

    updatedAuction.supporters = updatedAuction.supporterEmails.length;
    updatedAuction.totalAuctionRevenue += instantBuyer.totalPrice;

    await updatedAuction.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ instantBuyer, instantBuySuccess: true });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    await Error.create({
      functionName: 'CREATE_AUCTION_ITEM_INSTANT_BUYER_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({ message: 'Error creating instant buy' });
  }
});

export default createInstantBuy;
