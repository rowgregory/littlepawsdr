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
    await log.save()
    return
  }

  logEvent(log, 'TOP BIDS UPDATED');
  await log.save()

  sendEmail(topBids, {}, 'AUCTION_ITEM_WINNER', '', false);
}

export default handleTopBids;
