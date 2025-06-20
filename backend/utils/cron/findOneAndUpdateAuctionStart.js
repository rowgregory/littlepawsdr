import { Auction } from '../../models/campaignModel.js';
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
    return;
  }

  logEvent(log, 'AUCTION SETTINGS UPDATED', auction?.settings);

  return auction;
}

export default findOneAndUpdateAuctionStart;
