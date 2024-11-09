import { Auction, Campaign } from '../../models/campaignModel.js';
import isDaylightSavingTime from '../isDaylightSavingsTime.js';
import { logEvent } from '../logHelpers.js';

async function findOneAndUpdateAuctionEnd(log) {
  logEvent(log, 'FIND ONE AND UPDATE AUCTION END');
  const now = new Date();

  const isDaylightSavings = isDaylightSavingTime(now);

  now.setUTCHours(isDaylightSavings ? 21 : 22, 0, 0, 0);

  const today = now.toISOString();
  logEvent(log, 'TODAY', today);

  const auction = await Auction.findOneAndUpdate(
    {
      'settings.endDate': { $lte: today },
      'settings.hasBegun': true,
      'settings.hasEnded': false,
      'settings.status': 'LIVE',
    },
    {
      $set: {
        'settings.hasEnded': true,
        'settings.auctionStatus': 'Bidding closed',
        'settings.status': 'CLOSED',
      },
    },
    { new: true }
  );

  if (!auction) {
    logEvent(log, 'NO AUCTION FOUND', auction);
    await log.save();
    return;
  }

  logEvent(log, 'AUCTION SETTINGS UPDATED', auction?.settings);
  await log.save();

  const campaign = await Campaign.findByIdAndUpdate(
    auction.campaign,
    { campaignStatus: 'Post-Campaign' },
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

export default findOneAndUpdateAuctionEnd;
