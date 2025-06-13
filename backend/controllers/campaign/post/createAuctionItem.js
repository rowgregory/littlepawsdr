import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import createAuctionItemDocument from '../../../utils/campaign/createAuctionItemDocument.js';
import findAuctionByIdAndUpdate from '../../../utils/campaign/findAuctionByIdAndUpdate.js';
import { logEvent, prepareLog } from '../../../utils/logHelpers.js';

/**
 @desc    Create auction item
 @route   POST /api/campaign/auction/item
 @access  Private/Admin
*/
const createAuctionItem = asyncHandler(async (req, res) => {
  const log = await prepareLog('CREATE AUCTION ITEM');

  try {
    const { auction } = req.body;
    const auctionItem = await createAuctionItemDocument(log, req.body);

    await findAuctionByIdAndUpdate(log, auction, {
      ...req.body,
      $push: { items: auctionItem._id },
    });

    logEvent(log, 'END CREATE AUCTION ITEM');

    res.status(201).json({ auctionItem, message: 'Auction item created', sliceName: 'campaignApi' });
  } catch (err) {
    await Error.create({
      functionName: 'ERROR_CREATE_AUCTION_ITEM_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error creating auction item',
      sliceName: 'campaignApi',
    });
  }
});

export default createAuctionItem;
