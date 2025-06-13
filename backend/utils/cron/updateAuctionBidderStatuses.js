import { AuctionBidder } from '../../models/campaignModel.js';
import { logEvent } from '../logHelpers.js';

async function updateAuctionBidderStatuses(auctionId, log) {
  // Get all auction bidders for this auction, populating their bids
  const auctionBidders = await AuctionBidder.find({ auction: auctionId }).populate('bids');

  for (const bidder of auctionBidders) {
    // Check if any of their bids have status 'Top Bid'
    const hasWinningBid = bidder.bids.some((bid) => bid.status === 'Top Bid');

    const newStatus = hasWinningBid ? 'Winner' : 'Lost';

    if (bidder.status !== newStatus) {
      bidder.status = newStatus;
      await bidder.save();
      logEvent(log, 'AUCTION BIDDER STATUS UPDATED', {
        auctionBidderId: bidder._id,
        newStatus,
      });
    }
  }
}

export default updateAuctionBidderStatuses;
