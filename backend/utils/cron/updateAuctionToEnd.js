import { Auction } from '../../models/auctionModel.js';

const updateAuctionToEnd = async (session) => {
  const now = new Date(); // Current UTC time

  const auction = await Auction.findOneAndUpdate(
    {
      endDate: { $lte: now }, // Simple UTC comparison
      status: 'ACTIVE',
    },
    { $set: { status: 'ENDED' } },
    { new: true, session }
  );

  if (!auction) {
    return null;
  }

  return auction;
};

export default updateAuctionToEnd;
