import { AuctionWinningBidder } from '../../models/campaignModel.js';
import Error from '../../models/errorModel.js';

const paymentRedminderWinningBidAuctionItem = async (pugEmail, auctionWinningBidders) => {
  auctionWinningBidders.forEach(async (winningBidder) => {
    await pugEmail
      .send({
        template: 'paymentreminderwinningbidauctionitem',
        message: {
          from: `Little Paws Dachshund Rescue <no-reply@littlepawsdr.org`,
          to: winningBidder.user.email,
        },
        locals: {
          photo: winningBidder.auctionItem.photos[0].url,
          itemName: winningBidder.auctionItem.name,
          desc: winningBidder.auctionItem.description,
          subtotal: winningBidder.itemSoldPrice?.toFixed(2),
          processingFee: winningBidder.processingFee?.toFixed(2),
          shipping: winningBidder.shipping?.toFixed(2),
          totalPrice: winningBidder.totalPrice?.toFixed(2),
          id: winningBidder._id,
        },
      })
      .then(async () => {
        await AuctionWinningBidder.findOneAndUpdate(winningBidder?._id, {
          emailNotificationCount: 2,
        });
      })
      .catch(
        async (err) =>
          await Error.create({
            functionName: 'AUCTION_ITEM_PAYMENT_REMINDER_EMAIL',
            name: err.name,
            message: err.message,
          })
      );
  });
};

export default paymentRedminderWinningBidAuctionItem;
