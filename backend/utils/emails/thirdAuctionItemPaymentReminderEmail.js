import { AuctionWinningBidder } from '../../models/campaignModel.js';
import Error from '../../models/errorModel.js';
import { logEvent, prepareLog } from '../logHelpers.js';

const thirdAuctionItemPaymentReminderEmail = async (pugEmail, auctionWinningBidders) => {
  const log = await prepareLog('THIRD AUCTION ITEM PAYMENT REMINDER EMAIL');
  logEvent(log, 'INITIATE THIRD AUCTION ITEM PAYMENT REMINDER EMAIL', auctionWinningBidders);

  auctionWinningBidders.forEach(async (winningBidder) => {
    await pugEmail
      .send({
        template: 'auctionItemWinningBidder',
        message: {
          from: `Little Paws Dachshund Rescue <no-reply@littlepawsdr.org`,
          to: winningBidder.user.email,
        },
        locals: {
          itemCount: winningBidder.auctionItems.length,
          shipping: winningBidder.shipping,
          subtotal: winningBidder.subtotal,
          totalPrice: winningBidder.totalPrice,
          auctionItems: winningBidder.auctionItems,
          id: winningBidder._id,
          name: winningBidder.user.name,
        },
      })
      .then(async () => {
        logEvent(log, `THIRD AUCTION ITEM PAYMENT REMINDER EMAIL SUCCESSFULLY SENT TO ${winningBidder.user.email}`);

        await AuctionWinningBidder.findOneAndUpdate(winningBidder?._id, {
          emailNotificationCount: 3,
        });

        logEvent(log, 'AUCTION WINNING BIDDER EMAIL NOTIFICATION COUNT UPDATED');
      })
      .catch(async (err) => {
        logEvent(log, 'ERROR SENDING THIRD AUCTION ITEM PAYMENT REMINDER EMAIL');
        await Error.create({
          functionName: 'ERROR_THIRD_AUCTION_ITEM_PAYMENT_REMINDER_EMAIL',
          name: err.name,
          message: err.message,
        });
      });
  });
};

export default thirdAuctionItemPaymentReminderEmail;
