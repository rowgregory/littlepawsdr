import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { Auction, AuctionBidder, AuctionItem, Bid } from '../../../models/campaignModel.js';
import createBidDocument from '../../../utils/campaign-utils/createBidDocument.js';
import { logEvent, prepareLog } from '../../../utils/logHelpers.js';
import { sendEmail } from '../../../utils/sendEmail.js';
import getPreviousTopBid from '../../../utils/campaign-utils/getPreviousTopBid.js';
import updateOtherBidsStatus from '../../../utils/campaign-utils/updateOtherBidsStatus.js';

/**
 @desc    Create bid
 @route   POST /api/campaign/auction/item/place-bid
 @access  Private
*/
const createBid = asyncHandler(async (req, res) => {
  const log = await prepareLog('INITIATE CREATE BID');
  logEvent(log, 'CREATE BID');
  try {
    // Retrieve the current top bid for the auction item
    const previousTopBid = await getPreviousTopBid(log, req.body.auctionItemId)

    const createdBid = await createBidDocument(log, req.body, req.user);

    updateOtherBidsStatus(log, req.body.auctionItemId, createdBid._id)

    // Send email notification to the previous top bidder if they exist and were outbid
    if (previousTopBid && previousTopBid.email) {
      const objToSendToEmail = {
        previousTopBidId: previousTopBid._id,
        email: previousTopBid.email,
        previousTopBid: previousTopBid.bidAmount,
        topBid: req.body.bidAmount,
        itemImage: previousTopBid.auctionItem.photos[0].url,
        itemName: previousTopBid.auctionItem.name,
        link: `https://www.littlepawsdr.org/campaigns/${previousTopBid.auction.campaign.customCampaignLink}/auction/item/${previousTopBid.auctionItem._id}`,
      };

      sendEmail(objToSendToEmail, 'OUT_BID_NOTIFICATION');
    }

    const bids = await Bid.find({ auctionItem: req.body.auctionItemId });

    logEvent(log, 'RETREIVE BIDS BY AUCTION ITEM', bids);

    const auctionItem = await AuctionItem.findByIdAndUpdate(
      req.body.auctionItemId,
      {
        $push: { bids: createdBid?._id },
        currentBid: req.body.bidAmount,
        minimumBid: Number(req.body.bidAmount) + 1,
        totalBids: bids.length,
      },
      { new: true }
    );

    logEvent(log, 'UPDATE AUCTION ITEM BY AUCTION ITEM ID', auctionItem);

    const auction = await Auction.findById(req.body.auctionId);

    logEvent(log, 'RETREIVE AUCTION BY AUCTION ID', auction);

    const bidderExists = await AuctionBidder.findOne({
      user: req.user._id,
      auction: auction._id,
    }).populate('bids');

    logEvent(log, 'RETREIVE AUCTION BIDDER', bidderExists);

    if (!bidderExists) {
      const auctionBidder = new AuctionBidder({
        auction: auction._id,
        user: req.user._id,
        status: 'Bidding',
      });
      logEvent(log, 'CREATE AUCTION BIDDER', auctionBidder);

      auctionBidder.bids.push(createdBid._id);

      logEvent(log, 'PUSH CREATED BID INTO AUCTION BIDDERS', auctionBidder);

      await auctionBidder.save();

      auction.bidders.push(auctionBidder?._id);

      logEvent(log, 'PUSH AUCTION_BIDDER INTO AUCTION BIDDERS', auctionBidder);

      await auction.save();
    } else {
      await AuctionBidder.findByIdAndUpdate(bidderExists._id, {
        bids: [...bidderExists.bids, createdBid._id],
      });

      logEvent(log, 'PUSH CREATED BID INTO EXISTING BIDS');
    }

    res.status(200).json({ confirmedBidAmount: auctionItem.currentBid });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_BID_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error creating bid`,
      sliceName: 'campaignApi',
    });
  }
});

export default createBid;
