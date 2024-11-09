import { Auction, Campaign } from '../../models/campaignModel.js';
import isDaylightSavingTime from '../isDaylightSavingsTime.js';
import { logEvent } from '../logHelpers.js';

async function findOneAndUpdateAuctionStart(log) {
  logEvent(log, 'FIND ONE AND UPDATE AUCTION START');
  const now = new Date();

  const isDaylightSavings = isDaylightSavingTime(now);

  now.setUTCHours(isDaylightSavings ? 13 : 14, 0, 0, 0);

  const today = now.toISOString();
  logEvent(log, 'TODAY', today);

  const auction = await Auction.findOneAndUpdate(
    {
      'settings.startDate': { $lte: today },
      'settings.hasBegun': false,
      'settings.hasEnded': false,
      'settings.auctionStatus': 'Bidding opens',
      'settings.status': 'UPCOMING',
    },
    {
      $set: {
        'settings.hasBegun': true,
        'settings.auctionStatus': 'Bidding closes',
        'settings.status': 'LIVE',
      },
    },
    { new: true }
  );

  if (!auction) {
    logEvent(log, 'NO AUCTION FOUND');
    await log.save();
    return;
  }

  logEvent(log, 'AUCTION SETTINGS UPDATED', auction?.settings);
  await log.save();

  const campaign = await Campaign.findByIdAndUpdate(
    auction.campaign,
    { campaignStatus: 'Active Campaign' },
    { new: true }
  );

  if (!campaign) {
    logEvent(log, 'NO CAMPAIGN FOUND');
    await log.save();
    return;
  }

  logEvent(log, 'CAMPAIGN STATUS UPDATED', campaign?.campaignStatus);
  await log.save();

  return auction;
}

export default findOneAndUpdateAuctionStart;
