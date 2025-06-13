import { logEvent } from '../logHelpers.js';
import sendEmail from '../sendEmail.js';

const sendEmailsAndUpdateBids = async (grouped, log) => {
  try {
    // Send one email with all winners - no loop needed
    await sendEmail(grouped, 'AUCTION_USER_WINNER_SUMMARY');
    logEvent(log, `Successfully sent winner summary email to ${Object.keys(grouped).length} users`);
  } catch (err) {
    logEvent(log, `Failed to send winner emails: ${err.message}`);
  }
};

export default sendEmailsAndUpdateBids;
