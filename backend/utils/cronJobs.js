import cron from 'node-cron';
import { sendEmail } from './sendEmail.js';
import AdoptionApplicationBypassCode from '../models/adoptionApplicationBypassCodeModel.js';
import { AuctionWinningBidder } from '../models/campaignModel.js';
import { logEvent, prepareLog } from './logHelpers.js';
import findOneAndUpdateAuctionStart from './cron-utils/findOneAndUpdateAuctionStart.js';
import findOneAndUpdateAuctionEnd from './cron-utils/findOneAndUpdateAuctionEnd.js';
import updateAuctionItemStatuses from './cron-utils/updateAuctionItemStatuses.js';
import generateAdoptionApplicationFeeBypassCode from './cron-utils/generateAdoptionApplicationBypassCode.js';
import handleTopBids from './cron-utils/handleTopBids.js';

export const cronJobs = (io) => {
  return {
    // Every day at 9:00AM
    sendEcard: cron.schedule('0 9 * * *', () => sendEmail({}, 'ECARD'), {
      scheduled: true,
      timezone: 'America/New_York',
    }),
    // Every 30 days
    generateAdoptionApplicationFeeBypassCode: cron.schedule(
      '0 0 */30 * *',
      async () => {
        const generatedCode = generateAdoptionApplicationFeeBypassCode();
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
    // Every day at 9:00AM
    updateAuctionToBegin: cron.schedule(
      '0 9 * * *',
      async () => {
        const log = await prepareLog('UPDATE_ACUTION_TO_BEGIN');
        logEvent(log, 'AUCTION ATTEMPTING TO BEGIN');

        const auction = await findOneAndUpdateAuctionStart(log);

        if (auction) {
          io.emit('auction-updated');
        }
      },
      {
        scheduled: true,
        timezone: 'America/New_York',
      }
    ),
    // Every day at 5:00PM
    sendOutAuctionItemWinnerEmails: cron.schedule(
      '0 17 * * *',
      async () => {
        const log = await prepareLog('UPDATE_AUCTION_TO_END');
        logEvent(log, 'AUCTION ATTEMPTING TO END');

        const auction = await findOneAndUpdateAuctionEnd(log);

        if (auction) {
          await handleTopBids(auction, log);

          await updateAuctionItemStatuses(log);

          io.emit('auction-updated');
        }
      },
      {
        scheduled: true,
        timezone: 'America/New_York',
      }
    ),
    // Every day at 9:00AM
    sendOutPaymentReminderEmailForWinningBidAuctionItem: cron.schedule(
      '0 9 * * *',
      async () => {
        const log = await prepareLog('SECOND AUCION ITEM PAYMENT REMINDER EMAIL');
        logEvent(log, 'INITIATE SECOND AUCTION ITEM PAYMENT REMINDER EMAIL');

        const now = new Date();

        // Calculate 24 hours ago from the current time
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(now.getHours() - 24); // Subtract 24 hours from now

        logEvent(log, '24 HOURS AGO', twentyFourHoursAgo);

        const auctionWinningBidders = await AuctionWinningBidder.find({
          auctionPaymentNotificationEmailHasBeenSent: true,
          emailNotificationCount: 1,
          winningBidPaymentStatus: 'Awaiting Payment',
          auctionItemPaymentStatus: 'Pending',
          createdAt: { $gte: twentyFourHoursAgo },
        }).populate([{ path: 'auctionItem', populate: [[{ path: 'photos' }]] }, { path: 'user' }]);

        if (auctionWinningBidders.length > 0) {
          logEvent(log, 'EMAILS TO SEND');
          sendEmail(auctionWinningBidders, 'REMINDER_PAYMENT_EMAIL_AUCTION_ITEM_WINNER');
        } else {
          logEvent(log, 'NO EMAILS TO SEND');
        }
      },
      {
        scheduled: true,
        timezone: 'America/New_York',
      }
    ),
    // Every day at 9:00AM
    sendOutThirdPaymentReminderEmailForWinningBidAuctionItem: cron.schedule(
      '0 9 * * *',
      async () => {
        const log = await prepareLog('THIRD_AUCTION_ITEM_PAYMENT_REMINDER_EMAIL');
        logEvent(log, 'INITIATE THIRD AUCTION ITEM PAYMENT REMINDER');

        const now = new Date();

        // Calculate 24 hours ago from the current time
        const seventyTwoHoursAgo = new Date();
        seventyTwoHoursAgo.setHours(now.getHours() - 72); // Subtract 72 hours from now

        logEvent(log, '72 HOURS AGO', seventyTwoHoursAgo);

        const auctionWinningBidders = await AuctionWinningBidder.find({
          auctionPaymentNotificationEmailHasBeenSent: true,
          emailNotificationCount: 2,
          winningBidPaymentStatus: 'Awaiting Payment',
          auctionItemPaymentStatus: 'Pending',
          createdAt: { $gte: seventyTwoHoursAgo },
        }).populate([{ path: 'auctionItem', populate: [[{ path: 'photos' }]] }, { path: 'user' }]);

        if (auctionWinningBidders.length > 0) {
          logEvent(log, 'EMAILS TO SEND');
          sendEmail(auctionWinningBidders, 'THIRD_AUCTION_ITEM_PAYMENT_REMINDER_EMAIL');
        } else {
          logEvent(log, 'NO EMAILS TO SEND');
        }
      },
      {
        scheduled: true,
        timezone: 'America/New_York',
      }
    ),
  };
};
