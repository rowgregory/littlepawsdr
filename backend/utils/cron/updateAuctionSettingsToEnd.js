import { Auction } from '../../models/campaignModel.js';
import isDaylightSavingTime from '../isDaylightSavingsTime.js';
import { logEvent } from '../logHelpers.js';

function getAuctionClosingTime(log) {
  const now = new Date();
  const isDST = isDaylightSavingTime(now);
  now.setUTCHours(isDST ? 21 : 22, 0, 0, 0);
  const closingTime = now.toISOString();

  logEvent(log, 'CALCULATED CLOSING TIME', closingTime);
  return closingTime;
}

const updateAuctionSettingsToEnd = async (log) => {
  const closingTime = getAuctionClosingTime(log);

  const auction = await Auction.findOneAndUpdate(
    {
      'settings.endDate': { $lte: closingTime },
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

  if (auction) {
    logEvent(log, 'AUCTION SETTINGS UPDATED', auction.settings);
  } else {
    logEvent(log, 'NO AUCTION FOUND', auction);
  }

  return auction;
};

export default updateAuctionSettingsToEnd;
