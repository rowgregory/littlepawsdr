import cron from 'node-cron';
import { sendEmail } from './sendEmail.js';
import { updateEventStatus } from './updateEventStatus.js';
import AdoptionApplicationBypassCode from '../models/adoptionApplicationBypassCodeModel.js';
import { AuctionWinningBidder } from '../models/campaignModel.js';
import { logEvent, prepareLog } from './logHelpers.js';
import {
  findOneAndUpdateAuctionEnd,
  findOneAndUpdateAuctionStart,
  generateCode,
  handleTopBids,
  updateAuctionItemStatuses,
} from './cronHelpers.js';

export const cronJobs = (io) => {
  return {
    // Every day at 9:00 9:01 & 9:02AM
    sendEcard: cron.schedule('0-2 9 * * *', () => sendEmail({}, {}, 'ecard'), {
      scheduled: true,
      timezone: 'America/New_York',
    }),
    // Every day at 9:00AM
    updateEventStatus: cron.schedule('0 9 * * *', async () => updateEventStatus(), {
      scheduled: true,
      timezone: 'America/New_York',
    }),
    // Every 30 days
    generateAdoptionApplicationFeeBypassCode: cron.schedule(
      '0 0 */30 * *',
      async () => {
        const generatedCode = generateCode();
        let existingDocument = await AdoptionApplicationBypassCode.findOne();

        if (!existingDocument) {
          existingDocument = new AdoptionApplicationBypassCode({
            bypassCode: generatedCode,
          });
        } else {
          existingDocument.bypassCode = generatedCode;
        }

        await existingDocument.save();
        io.emit('adoption-application-fee-bypass-code', generatedCode);
      },
      {
        scheduled: true,
        timezone: 'America/New_York',
      }
    ),
    // Every day at 9:00 9:01 & 9:02AM
    updateAuctionToBegin: cron.schedule(
      '0-2 9 * * *',
      async () => {
        const log = await prepareLog('UPDATE_ACUTION_TO_BEGIN');
        logEvent(log, 'AUCTION ATTEMPTING TO BEGIN');

        const auction = await findOneAndUpdateAuctionStart();

        if (auction) {
          logEvent(log, 'AUCTION UPDATED', auction);
          await log.save();

          io.emit('auction-updated');
        } else {
          logEvent(log, 'NO AUCTION FOUND');
          await log.save();
        }
        await log.save();
      },
      {
        scheduled: true,
        timezone: 'America/New_York',
      }
    ),
    // Every day at 5:00, 5:01, and 5:02PM
    sendOutAuctionItemWinnerEmails: cron.schedule(
      '0-2 17 * * *',
      async () => {
        const log = await prepareLog('UPDATE_AUCTION_TO_END');

        logEvent(log, 'AUCTION ATTEMPTING TO END');

        const auction = await findOneAndUpdateAuctionEnd();

        if (auction) {
          await handleTopBids(auction, log);

          await updateAuctionItemStatuses(log);
        } else {
          logEvent(log, 'NO AUCTION FOUND');

          await log.save();
        }
      },
      {
        scheduled: true,
        timezone: 'America/New_York',
      }
    ),
    // Every day at 5:00, 5:01, and 5:02PM
    sendOutPaymentReminderEmailForWinningBidAuctionItem: cron.schedule(
      '0-2 17 * * *',
      async () => {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        const auctionWinningBidders = await AuctionWinningBidder.find({
          auctionPaymentNotificationEmailHasBeenSent: true,
          emailNotificationCount: 1,
          winningBidPaymentStatus: 'Awaiting Payment',
          auctionItemPaymentStatus: 'Pending',
          createdAt: { $lte: twoDaysAgo },
        }).populate([{ path: 'auctionItem', populate: [[{ path: 'photos' }]] }]);

        if (auctionWinningBidders.length > 0) {
          sendEmail(auctionWinningBidders, {}, 'REMINDER_PAYMENT_EMAIL_AUCTION_ITEM_WINNER');
        }
      },
      {
        scheduled: true,
        timezone: 'America/New_York',
      }
    ),
  };
};
