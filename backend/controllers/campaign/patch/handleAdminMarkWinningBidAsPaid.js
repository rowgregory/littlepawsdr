import asyncHandler from 'express-async-handler';
import Error from '../../../models/errorModel.js';
import { AuctionWinningBidder, Campaign } from '../../../models/campaignModel.js';
import { logEvent, prepareLog } from '../../../utils/logHelpers.js';

/**
 * Update statuses for winning bidder document (admin manual payment)
 */
async function updateWinningBidderStatusManual(id, paymentMethod) {
  return AuctionWinningBidder.findByIdAndUpdate(
    id,
    {
      winningBidPaymentStatus: 'Paid',
      auctionItemPaymentStatus: 'Paid',
      shippingStatus: 'Pending Fulfillment',
      paymentMethod, // Store the payment method instead of PayPal ID
      paidOn: new Date(),
      manualPayment: true, // Flag to indicate this was manually marked by admin
    },
    { new: true }
  ).populate([{ path: 'auction', select: '_id' }, { path: 'auctionItems' }, { path: 'user', select: 'email' }]);
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
 * Admin controller to manually mark winning bid as paid
 */
const handleAdminMarkWinningBidAsPaid = asyncHandler(async (req, res) => {
  try {
    const log = await prepareLog('ADMIN_MARK_WINNING_BID_PAID');

    const { id, paymentMethod } = req.body;

    // Validate payment method
    const validPaymentMethods = ['venmo', 'cash', 'check', 'zelle', 'bank_transfer', 'cash_app', 'wire_transfer', 'other'];

    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        message: 'Invalid payment method',
        sliceName: 'campaignApi',
      });
    }

    logEvent(log, 'MARKING WINNING BID AS PAID', { id, paymentMethod });

    const auctionWinningBidder = await updateWinningBidderStatusManual(id, paymentMethod);

    if (!auctionWinningBidder) {
      return res.status(404).json({
        message: 'Winning bidder not found',
        sliceName: 'campaignApi',
      });
    }

    logEvent(log, 'UPDATED AUCTION WINNING BIDDER (MANUAL)', auctionWinningBidder);

    const campaign = await Campaign.findOne({ auction: auctionWinningBidder.auction });

    if (!campaign) {
      logEvent(log, 'WARNING: Campaign not found for auction', auctionWinningBidder.auction);
      return res.status(200).json({
        paymentSuccess: true,
        message: 'Payment marked but campaign not found',
        sliceName: 'campaignApi',
      });
    }

    logEvent(log, 'CAMPAIGN FOUND', campaign?._id);

    const updatedCampaign = await updateCampaignWithNewSupporters(campaign, auctionWinningBidder?.user?.email, auctionWinningBidder.totalPrice);

    logEvent(log, 'CAMPAIGN DETAILS UPDATED', {
      supporterEmails: updatedCampaign.supporterEmails,
      totalCampaignRevenue: updatedCampaign.totalCampaignRevenue,
    });

    logEvent(log, 'ADMIN MARK WINNING BID PAID FINISH');

    res.status(200).json({
      paymentSuccess: true,
      winningBidder: auctionWinningBidder,
      sliceName: 'campaignApi',
    });
  } catch (err) {
    await Error.create({
      functionName: 'ADMIN_MARK_WINNING_BID_PAID',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error marking winning bid as paid',
      error: err.message,
      sliceName: 'campaignApi',
    });
  }
});

export default handleAdminMarkWinningBidAsPaid;
