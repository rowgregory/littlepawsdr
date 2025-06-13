import Error from '../models/errorModel.js';
import createPugEmailClient from './emailClients.js';
import adoptionFeeConfirmation from './emails/adoptionFeeConfirmation.js';
import forgotPassword from './emails/forgotPassword.js';
import notifyAuctionWinners from './emails/notifyAuctionWinners.js';
import orderNotification from './emails/orderNotification.js';
import outBidNotification from './emails/outBidNotification.js';
import paymentRedminderWinningBidAuctionItem from './emails/paymentReminderWinningBidAuctionItem.js';
import sendEcard from './emails/sendEcard.js';
import thirdAuctionItemPaymentReminderEmail from './emails/thirdAuctionItemPaymentReminderEmail.js';
import { logEvent, prepareLog } from './logHelpers.js';

const sendEmail = async (body, type) => {
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
