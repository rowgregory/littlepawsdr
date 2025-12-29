import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { AuctionItem } from '../../../models/auctionItemModel.js';

const getAuctionItemById = asyncHandler(async (req, res) => {
  try {
    const { auctionItemId } = req.params;

    const auctionItem = await AuctionItem.findById(auctionItemId)
      .populate([
        { path: 'photos', select: 'url name size' },
        { path: 'instantBuyers', populate: [{ path: 'user' }, { path: 'auctionItem' }] },
        { path: 'bids' },
      ])
      .lean();

    if (!auctionItem) {
      return res.status(404).json({ message: 'Auction item not found' });
    }

    // Calculate total based on selling format
    const itemPrice =
      auctionItem.sellingFormat === 'fixed'
        ? auctionItem.buyNowPrice
        : auctionItem.currentBid || auctionItem.startingPrice;

    const itemWithTotal = {
      ...auctionItem,
      total: (itemPrice || 0) + (auctionItem.shippingCosts || 0),
    };

    res.status(200).json({ auctionItem: itemWithTotal });
  } catch (err) {
    await Error.create({
      functionName: 'GET_AUCTION_ITEM_BY_ID',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({ message: 'Error fetching auction item' });
  }
});

export default getAuctionItemById;
