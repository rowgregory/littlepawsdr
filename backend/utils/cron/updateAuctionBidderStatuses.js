import { AuctionBidder } from '../../models/auctionBidderModel.js';

async function updateAuctionBidderStatuses(auctionId, session) {
  // Get bidders with winning bids
  const auctionBidders = await AuctionBidder.find({ auction: auctionId })
    .populate('bids')
    .session(session);

  const winnerIds = auctionBidders
    .filter((bidder) => bidder.bids.some((bid) => bid.status === 'Top Bid'))
    .map((bidder) => bidder._id);

  const loserIds = auctionBidders
    .filter((bidder) => !bidder.bids.some((bid) => bid.status === 'Top Bid'))
    .map((bidder) => bidder._id);

  // ✅ Update all at once with session
  if (winnerIds.length > 0) {
    await AuctionBidder.updateMany(
      { _id: { $in: winnerIds } },
      { $set: { status: 'Winner' } },
      { session }
    );
  }

  if (loserIds.length > 0) {
    await AuctionBidder.updateMany(
      { _id: { $in: loserIds } },
      { $set: { status: 'Lost' } },
      { session }
    );
  }
}

export default updateAuctionBidderStatuses;
