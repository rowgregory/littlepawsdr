import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { Auction, AuctionWinningBidder, Campaign } from '../../../models/campaignModel.js';
import { logEvent, prepareLog } from '../../../utils/logHelpers.js';
import createAuctionItemFulfillmentDocument from '../../../utils/campaign-utils/createAuctionItemFulfillmentDocument.js';

/**
 @desc    Update auction winning bidder
 @route   PATCH /api/campaign/auction/winning-bidder
 @access  Public
*/
const updateAuctionWinningBidder = asyncHandler(async (req, res) => {
  try {
    const log = await prepareLog('UPDATE_AUCTION_WINNING_BIDDER');
    logEvent(log, 'INITIALIZE UPATING AUCTION WINNING BIDDER', { winningBidderId: req.body.id });

    const auctionWinningBidder = await AuctionWinningBidder.findByIdAndUpdate(
      req.body.id,
      {
        winningBidPaymentStatus: 'Paid',
        auctionItemPaymentStatus: 'Paid',
        shippingStatus: 'Pending Fulfillment',
        payPalId: req.body?.payPalId,
        paidOn: new Date(),
      },
      { new: true }
    );
    logEvent(log, 'UPDATED AUCTION WINNING BIDDER', auctionWinningBidder?.user);

    const populatedAuctionWinningBidder = await AuctionWinningBidder.findById(
      auctionWinningBidder._id
    ).populate([{ path: 'auctionItem' }, { path: 'user' }]);

    logEvent(log, 'POPULATING AUCTION WINNING BIDDER', auctionWinningBidder?.user?.name);

    logEvent(log, 'INITIATE CREATE AUCTION ITEM FULFILLMENT DOCUMENT');

    const auctionItemFulfillment = await createAuctionItemFulfillmentDocument(
      {
        ...populatedAuctionWinningBidder.toObject(),
        winningBidder: populatedAuctionWinningBidder._id,
      },
      populatedAuctionWinningBidder.user
    );

    logEvent(log, 'AUCTION ITEM FULFILLMENT DOCUMENT CREATED', auctionItemFulfillment?._id);

    await Auction.findByIdAndUpdate(auctionItemFulfillment?.auction, {
      $push: { itemFulfillments: auctionItemFulfillment._id },
    });

    logEvent(log, 'AUCTION ITEM FULFILLMENT ID ADDED TO AUCTION');

    const populatedAuctionWinningBidders = await AuctionWinningBidder.find().populate([
      { path: 'auction' },
      { path: 'auctionItem' },
      { path: 'user' },
    ]);

    const uniqueWinningBidsEmails = new Set(
      populatedAuctionWinningBidders
        .filter((winningBidder) => winningBidder.user.email)
        .map((winningBidder) => winningBidder.user.email)
    );

    logEvent(log, 'UNIQUE WINNING BID EMAILS', uniqueWinningBidsEmails);

    const campaign = await Campaign.findOne({ auction: auctionWinningBidder.auction });
    logEvent(log, 'CAMPAIGN FOUND', campaign?._id);

    const existingSupporterEmails = new Set(campaign.supporterEmails);

    const newSupporterEmails = [...uniqueWinningBidsEmails].filter(
      (email) => !existingSupporterEmails.has(email)
    );

    campaign.supporterEmails.push(...newSupporterEmails);
    campaign.supporters = campaign.supporterEmails.length;
    campaign.totalCampaignRevenue += auctionWinningBidder.totalPrice;

    logEvent(log, 'CAMPAIGN DETAILS UPDATED', {
      supporterEmails: campaign?.supporterEmails,
      totalCampaignRevenue: campaign?.totalCampaignRevenue,
    });

    await campaign.save();

    logEvent(log, 'COMPLETE UPDATE AUCTION WINNING BIDDER');

    res.status(200).json({ sliceName: 'campaignApi' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_AUCTION_WINNING_BIDDER',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: `Error updating auction winning bidder`,
      sliceName: 'campaignApi',
    });
  }
});

export default updateAuctionWinningBidder;
