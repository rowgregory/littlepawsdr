import { Bid } from '../../models/bidModel.js';

/**
 * Fetch all top bids that haven’t received winner emails yet
 */
const fetchTopBids = async (auctionId, session) => {
  const bids = await Bid.find({
    auction: auctionId,
    status: 'Top Bid',
    sentWinnerEmail: false,
    emailCount: 0,
  })
    .session(session)
    .populate([
      { path: 'user' },
      { path: 'auction' },
      { path: 'auctionItem', populate: [{ path: 'photos' }] },
    ]);

  return bids || [];
};

export default fetchTopBids;
