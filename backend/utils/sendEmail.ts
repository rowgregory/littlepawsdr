import Error from '../models/errorModel.js';
import createPugEmailClient from './emailClients.ts';
import adoptionFeeConfirmation from './emails/adoptionFeeConfirmation.ts';
import forgotPassword from './emails/forgotPassword.ts';
import notifyAuctionWinners from './emails/notifyAuctionWinners.ts';
import orderNotification from './emails/orderNotification.ts';
import outBidNotification from './emails/outBidNotification.ts';
import paymentRedminderWinningBidAuctionItem from './emails/paymentReminderWinningBidAuctionItem.ts';
import sendEcard from './emails/sendEcard.ts';
import thirdAuctionItemPaymentReminderEmail from './emails/thirdAuctionItemPaymentReminderEmail.ts';
import { logEvent, prepareLog } from './logHelpers.js';

const sendEmail = async (body: any, type: any) => {
  const pugEmail = await createPugEmailClient();

  try {
    switch (type) {
      case 'FORGOT_PASSWORD':
        return await forgotPassword(pugEmail, body);
      case 'ECARD':
        return await sendEcard(pugEmail);
      case 'SEND_ADOPTION_FEE_CONFIRMATION':
        return await adoptionFeeConfirmation(pugEmail, body);
      case 'AUCTION_USER_WINNER_SUMMARY':
        return await notifyAuctionWinners(pugEmail, body);
      case 'REMINDER_PAYMENT_EMAIL_AUCTION_ITEM_WINNER':
        return await paymentRedminderWinningBidAuctionItem(pugEmail, body);
      case 'ADMIN_ORDER_NOTIFICATION':
        return await orderNotification(pugEmail);
      case 'OUT_BID_NOTIFICATION':
        return await outBidNotification(pugEmail, body);
      case 'THIRD_AUCTION_ITEM_PAYMENT_REMINDER_EMAIL':
        return await thirdAuctionItemPaymentReminderEmail(pugEmail, body);
      default:
        throw new Error(`Unknown email type: ${type}`);
    }
  } catch (err) {
    const log = await prepareLog(`${type}_EMAIL_ERROR`);
    logEvent(log, `EMAIL ERROR: ${type}`, err);

    await Error.create({
      functionName: `${type}_EMAIL_ERROR`,
      name: err.name,
      message: err.message,
    });

    throw err;
  }
};

export default sendEmail;
