import { AuctionItem } from '../../models/auctionItemModel.js';
import { Auction } from '../../models/auctionModel.js';
import { AuctionWinningBidder } from '../../models/auctionWinningBidderModel.js';

async function createWinningBiddersForAuction(auctionId, grouped, session) {
  const winningBidders = [];

  for (const userId in grouped) {
    const { user, bids } = grouped[userId];

    try {
      if (!user?._id) {
        console.warn(`Invalid user data for userId ${userId}`);
        continue;
      }

      // ✅ Update auction items with sold price and top bidder
      for (const bid of bids) {
        await AuctionItem.findByIdAndUpdate(
          bid.auctionItemId, // Or however you're storing the auctionItem ID
          {
            soldPrice: bid.itemPrice,
            topBidder: `${user.firstName} ${user.lastName}`,
          },
          { session }
        );
      }

      // Create winning bidder record
      const subtotal = bids.reduce((sum, b) => sum + b.itemPrice, 0);
      const shipping = bids.reduce((sum, b) => sum + b.shipping, 0);
      const totalPrice = subtotal + shipping;

      const winningBidder = await AuctionWinningBidder.create(
        [
          {
            auction: auctionId,
            user: user._id,
            auctionItems: bids.map((b) => b.auctionItemId),
            subtotal,
            shipping,
            totalPrice,
            auctionPaymentNotificationEmailHasBeenSent: false,
            emailNotificationCount: 0,
          },
        ],
        { session }
      );

      // Populate auctionItems
      await winningBidder[0].populate('auctionItems');

      // Add to auction's winning bids
      await Auction.findByIdAndUpdate(
        auctionId,
        { $push: { winningBids: winningBidder[0]._id } },
        { session }
      );

      winningBidders.push({
        winningBidderId: winningBidder[0]._id,
        userId,
        email: user.email,
        userName: user.firstName + ' ' + user.lastName,
        bids, // Cleaned bid data
      });
    } catch (error) {
      console.error(`Failed to create winning bidder for user ${userId}:`, error);
      throw error;
    }
  }

  return winningBidders;
}

export default createWinningBiddersForAuction;
