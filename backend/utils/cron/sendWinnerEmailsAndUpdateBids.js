import { AuctionWinningBidder } from '../../models/auctionWinningBidderModel.js';
import { Bid } from '../../models/bidModel.js';
import createPugEmailClient from '../emailClients.js';
import sendEmailWithRetry from './sendEmailWithRetry.js';

async function sendWinnerEmailsAndUpdateBids(winningBidders) {
  const pugEmail = await createPugEmailClient();

  for (const winnerData of winningBidders) {
    try {
      const shipping = winnerData.bids.reduce((sum, b) => sum + b.shipping, 0);
      const subtotal = winnerData.bids.reduce((sum, b) => sum + b.itemPrice, 0);
      const totalPrice = winnerData.bids.reduce((sum, b) => sum + b.total, 0);

      // ✅ Call with correct parameters: (data, template)
      await sendEmailWithRetry(
        pugEmail,
        {
          to: winnerData.email,
          subject: 'You Won!',
          template: 'auctionItemWinningBidder',
          id: winnerData.winningBidderId,
          itemCount: winnerData.bids.length,
          shipping,
          subtotal,
          totalPrice,
          auctionItems: winnerData.bids.map((b) => ({
            name: b.itemName,
            // ✅ Pass full photos array instead of just image
            photos: [{ url: b.itemImage }],
            price: b.soldPrice,
          })),
          name: winnerData.userName,
        },
        'auctionItemWinningBidder' // ✅ Template name
      );

      // ✅ After successful email, update winning bidder record
      await AuctionWinningBidder.findByIdAndUpdate(winnerData.winningBidderId, {
        auctionPaymentNotificationEmailHasBeenSent: true,
        emailNotificationCount: 1,
      });

      // ✅ Update all bids for this user to mark email as sent
      const bidIds = winnerData.bids.map((b) => b._id);
      await Bid.updateMany(
        { _id: { $in: bidIds } },
        {
          $set: {
            sentWinnerEmail: true,
            emailCount: 1,
          },
        }
      );
    } catch (error) {
      console.error(`Failed to send email to ${winnerData.email}:`, error);
    }
  }
}

export default sendWinnerEmailsAndUpdateBids;
