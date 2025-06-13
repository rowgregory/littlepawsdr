import { logEvent } from '../logHelpers.js';
import sendEmail from '../sendEmail.ts';

interface GroupedProps {
  [x: string]: { user: any; bids: any; auction: any };
}

const sendEmailsAndUpdateBids = async (grouped: GroupedProps, log: any) => {
  try {
    // Send one email with all winners - no loop needed
    await sendEmail(grouped, 'AUCTION_USER_WINNER_SUMMARY');
    logEvent(log, `Successfully sent winner summary email to ${Object.keys(grouped).length} users`);
  } catch (err) {
    logEvent(log, `Failed to send winner emails: ${err.message}`);
  }
};

export default sendEmailsAndUpdateBids;
