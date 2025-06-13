import { Bid } from '../../models/campaignModel.js';
import { logEvent } from '../logHelpers.js';

/**
 * Fetch all top bids that haven’t received winner emails yet
 */
const fetchTopBids = async (auction, log) => {
  logEvent(log, 'Fetching top bids');

  const bids = await Bid.find({
    auction: auction._id,
    status: 'Top Bid',
    sentWinnerEmail: false,
    emailCount: 0,
  }).populate([{ path: 'auction' }, { path: 'user' }, { path: 'auctionItem', populate: [{ path: 'photos' }] }]);

  if (!bids || bids.length === 0) {
    logEvent(log, 'No top bids found');
    return [];
  }

  logEvent(log, `Found ${bids.length} top bids`);
  return bids;
};

export default fetchTopBids;
