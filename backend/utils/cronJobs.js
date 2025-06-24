import cron from 'node-cron';
import sendEmail from './sendEmail.js';
import AdoptionApplicationBypassCode from '../models/adoptionApplicationBypassCodeModel.js';
import { AuctionWinningBidder, Campaign } from '../models/campaignModel.js';
import { logEvent, prepareLog } from './logHelpers.js';
import findOneAndUpdateAuctionStart from './cron/findOneAndUpdateAuctionStart.js';
import updateAuctionSettingsToEnd from './cron/updateAuctionSettingsToEnd.js';
import resolveUnsoldAuctionItems from './cron/resolveUnsoldAuctionItems.js';
import generateAdoptionApplicationFeeBypassCode from './cron/generateAdoptionApplicationBypassCode.js';
import fetchTopBids from './cron/fetchTopBids.js';
import groupBidsByUser from './cron/groupBidsByUser.js';
import sendEmailsAndUpdateBids from './cron/sendEmailsAndUpdateBids.js';
import updateCampaignStatusToEnd from './cron/updateCampaignStatusToEnd.js';
import updateAuctionBidderStatuses from './cron/updateAuctionBidderStatuses.js';

const cronJobs = (io) => {
  return {
    // Every day at 9:00AM
    sendEcard: cron.schedule('0 9 * * *', () => sendEmail({}, 'ECARD'), {
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
        timezone: 'America/New_York',
      }
    ),
    // Every day at 9:00AM
    updateAuctionToBegin: cron.schedule(
      '0 9 * * *',
      async () => {
        const log = await prepareLog('UPDATE_ACUTION_TO_BEGIN');

        const auction = await findOneAndUpdateAuctionStart(log);

        const campaign = await Campaign.findOneAndUpdate(auction.campaign, { campaignStatus: 'Active Campaign' }, { new: true }).populate([
          {
            path: 'auction',
            populate: [
              {
                path: 'items',
                populate: {
                  path: 'photos',
                },
              },
              { path: 'settings', select: 'endDate startDate status' },
              {
                path: 'bidders',
                populate: [
                  { path: 'user', select: 'name email _id createdAt shippingAddress' },
                  { path: 'bids', populate: [{ path: 'auctionItem' }] },
                ],
              },
            ],
          },
        ]);

        if (!campaign) {
          logEvent(log, 'NO CAMPAIGN FOUND');
          return;
        }

        logEvent(log, 'CAMPAIGN STATUS UPDATED', campaign?.campaignStatus);

        if (auction && campaign) {
          io.emit('auction-updated', campaign);
        }
      },
      {
        timezone: 'America/New_York',
      }
    ),
    // Every day at 5:00PM
    finalizeAuctionEvent: cron.schedule(
      '0 17 * * *',
      async () => {
        const log = await prepareLog('UPDATE_AUCTION_TO_END');

        const auction = await updateAuctionSettingsToEnd(log);

        await updateCampaignStatusToEnd(auction, log);

        if (auction) {
          const topBids = await fetchTopBids(auction, log);
          if (topBids.length === 0) return;

          await updateAuctionBidderStatuses(auction._id, log);

          const grouped = groupBidsByUser(topBids, log);

          await sendEmailsAndUpdateBids(grouped, log);

          await resolveUnsoldAuctionItems(log);

          io.emit('auction-updated');
        }
      },
      {
        timezone: 'America/New_York',
      }
    ),
    // Every day at 9:00AM
    sendOutPaymentReminderEmailForWinningBidAuctionItem: cron.schedule(
      '0 9 * * *',
      async () => {
        const log = await prepareLog('SECOND AUCION ITEM PAYMENT REMINDER EMAIL');

        const now = new Date();

        // Calculate 24 hours ago from the current time
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        logEvent(log, '24 HOURS AGO', twentyFourHoursAgo);

        const auctionWinningBidders = await AuctionWinningBidder.find({
          auctionPaymentNotificationEmailHasBeenSent: true,
          emailNotificationCount: 1,
          winningBidPaymentStatus: 'Awaiting Payment',
          auctionItemPaymentStatus: 'Pending',
          createdAt: { $gte: twentyFourHoursAgo },
        }).populate([{ path: 'auctionItems', populate: [[{ path: 'photos' }]] }, { path: 'user' }]);

        if (auctionWinningBidders.length > 0) {
          logEvent(log, 'EMAILS TO SEND');
          sendEmail(auctionWinningBidders, 'REMINDER_PAYMENT_EMAIL_AUCTION_ITEM_WINNER');
        } else {
          logEvent(log, 'NO EMAILS TO SEND');
        }
      },
      {
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

        // Calculate 72 hours ago from the current time
        const seventyTwoHoursAgo = new Date(now.getTime() - 72 * 60 * 60 * 1000); // Subtract 72 hours from now

        logEvent(log, '72 HOURS AGO', seventyTwoHoursAgo);

        const auctionWinningBidders = await AuctionWinningBidder.find({
          auctionPaymentNotificationEmailHasBeenSent: true,
          emailNotificationCount: 2,
          winningBidPaymentStatus: 'Awaiting Payment',
          auctionItemPaymentStatus: 'Pending',
          createdAt: { $gte: seventyTwoHoursAgo },
        }).populate([{ path: 'auctionItems', populate: [[{ path: 'photos' }]] }, { path: 'user' }]);

        if (auctionWinningBidders.length > 0) {
          logEvent(log, 'EMAILS TO SEND');
          sendEmail(auctionWinningBidders, 'THIRD_AUCTION_ITEM_PAYMENT_REMINDER_EMAIL');
        } else {
          logEvent(log, 'NO EMAILS TO SEND');
        }
      },
      {
        timezone: 'America/New_York',
      }
    ),
  };
};

export default cronJobs;
