import { Auction } from '../../models/auctionModel.js';

async function updateAuctionToBegin(events) {
  const now = new Date(); // Current UTC time

  events.push({
    message: 'FIND_AUCTION_TO_UPDATE',
    data: { currentUTC: now.toISOString() },
  });

  const auction = await Auction.findOneAndUpdate(
    {
      startDate: { $lte: now }, // Simple UTC comparison
      status: 'DRAFT',
    },
    { $set: { status: 'ACTIVE' } },
    { new: true }
  )
    .populate([
      { path: 'items', populate: [{ path: 'photos' }] },
      { path: 'bidders', populate: [{ path: 'user' }, { path: 'bids' }] },
      { path: 'instantBuyers', populate: [{ path: 'user' }, { path: 'auctionItem' }] },
      { path: 'winningBids', populate: [{ path: 'user' }, { path: 'auctionItems' }] },
      { path: 'bids', populate: [{ path: 'user' }, { path: 'auctionItem' }] },
    ])
    .lean();

  if (!auction) {
    events.push({ message: 'NO_AUCTION_FOUND', data: {} });
    return null;
  }

  events.push({
    message: 'AUCTION_STARTED',
    data: { auctionId: auction._id, status: auction.status },
  });

  return auction;
}

export default updateAuctionToBegin;
