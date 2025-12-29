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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { auction, auctionItem, ...data } = req.body;

    // Create instant buyer
    const instantBuyer = await AuctionItemInstantBuyer.create(
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
      { session }
    ).then((docs) => docs[0].populate([{ path: 'user' }, { path: 'auctionItem' }]));

    // Update auction item
    await AuctionItem.findByIdAndUpdate(
      auctionItem,
      {
        $inc: { totalQuantity: -1 },
        $push: { instantBuyers: instantBuyer._id },
      },
      { new: false, session }
    );

    // Update auction
    const updatedAuction = await Auction.findByIdAndUpdate(
      auction,
      {
        $push: { instantBuyers: instantBuyer._id },
      },
      { new: true, session }
    );

    // Add new supporter emails
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
    await Error.create({
      functionName: 'CREATE_AUCTION_ITEM_INSTANT_BUYER_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error creating isntant buy`,
    });
  }
});

export default createInstantBuy;
