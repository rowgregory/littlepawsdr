import { AuctionWinningBidder } from '../../models/campaignModel.js';
import Error from '../../models/errorModel.js';
import { logEvent, prepareLog } from '../logHelpers.js';

interface PugEmailProps {
  send: (arg0: {
    template: string;
    message: { from: string; to: any };
    locals: {
      photo: any;
      itemName: any;
      desc: any;
      subtotal: any;
      shipping: any;
      totalPrice: any;
      id: any;
    };
  }) => Promise<any>;
}

const thirdAuctionItemPaymentReminderEmail = async (
  pugEmail: PugEmailProps,
  auctionWinningBidders: any[]
) => {
  const log = await prepareLog('THIRD AUCTION ITEM PAYMENT REMINDER EMAIL');
  logEvent(log, 'INITIATE THIRD AUCTION ITEM PAYMENT REMINDER EMAIL', auctionWinningBidders);

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
          shipping: winningBidder.shipping?.toFixed(2),
          totalPrice: winningBidder.totalPrice?.toFixed(2),
          id: winningBidder._id,
        },
      })
      .then(async () => {
        logEvent(
          log,
          `THIRD AUCTION ITEM PAYMENT REMINDER EMAIL SUCCESSFULLY SENT TO ${winningBidder.user.email}`
        );

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
