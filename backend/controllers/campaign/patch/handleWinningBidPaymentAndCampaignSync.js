import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { AuctionWinningBidder, Campaign } from '../../../models/campaignModel.js';
import { logEvent, prepareLog } from '../../../utils/logHelpers.js';

/**
 * Update statuses for winning bidder document
 */
async function updateWinningBidderStatus(id, payPalId) {
  return AuctionWinningBidder.findByIdAndUpdate(
    id,
    {
      winningBidPaymentStatus: 'Paid',
      auctionItemPaymentStatus: 'Paid',
      shippingStatus: 'Pending Fulfillment',
      payPalId,
      paidOn: new Date(),
    },
    { new: true }
  ).populate([
    { path: 'auction', select: '_id' },
    { path: 'auctionItems' }, // <-- changed to auctionItems array
    { path: 'user', select: 'email' },
  ]);
}

/**
 * Update campaign's supporter emails and revenue
 */
async function updateCampaignWithNewSupporters(campaign, email, totalPrice) {
  if (email && !campaign.supporterEmails.includes(email)) {
    campaign.supporterEmails.push(email);
  }

  campaign.supporters = campaign.supporterEmails.length;
  campaign.totalCampaignRevenue += totalPrice;

  await campaign.save();
  return campaign;
}

/**
 * Main controller handler
 */
const handleWinningBidPaymentAndCampaignSync = asyncHandler(async (req, res) => {
  try {
    const log = await prepareLog('UPDATE_AUCTION_WINNING_BIDDER');

    const auctionWinningBidder = await updateWinningBidderStatus(req.body.id, req.body?.payPalId);
    logEvent(log, 'UPDATED AUCTION WINNING BIDDER', auctionWinningBidder);

    const campaign = await Campaign.findOne({ auction: auctionWinningBidder.auction });
    logEvent(log, 'CAMPAIGN FOUND', campaign?._id);

    const updatedCampaign = await updateCampaignWithNewSupporters(campaign, auctionWinningBidder?.user?.email, auctionWinningBidder.totalPrice);
    logEvent(log, 'CAMPAIGN DETAILS UPDATED', {
      supporterEmails: updatedCampaign.supporterEmails,
      totalCampaignRevenue: updatedCampaign.totalCampaignRevenue,
    });

    logEvent(log, 'HANDLE WINNING BID PAYMENT AND CAMPAIGN SYNC FINISH');
    res.status(200).json({ paymentSuccess: true, sliceName: 'campaignApi' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_AUCTION_WINNING_BIDDER',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error updating auction winning bidder',
      sliceName: 'campaignApi',
    });
  }
});

export default handleWinningBidPaymentAndCampaignSync;
