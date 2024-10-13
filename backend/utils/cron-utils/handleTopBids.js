import { Bid } from '../../models/campaignModel.js';
import { logEvent } from '../logHelpers.js';
import { sendEmail } from '../sendEmail.js';

async function handleTopBids(auction, log) {
  logEvent(log, 'HANDLE TOP BIDS');

  const topBids = await Bid.find({
    auction: auction._id,
    status: 'Top Bid',
    sentWinnerEmail: false,
    emailCount: 0,
  }).populate([
    { path: 'auction' },
    { path: 'user' },
    { path: 'auctionItem', populate: [{ path: 'photos' }] },
  ]);

  if (!topBids) {
    logEvent(log, 'No top bids', topBids);
    return
  }

  logEvent(log, 'TOP BIDS UPDATED');

  sendEmail(topBids, 'AUCTION_ITEM_WINNER');
}

export default handleTopBids;
