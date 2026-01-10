import cron from 'node-cron';
import AdoptionApplicationBypassCode from '../models/adoptionApplicationBypassCodeModel.js';
import updateAuctionToBegin from './cron/updateAuctionToBegin.js';
import resolveUnsoldAuctionItems from './cron/resolveUnsoldAuctionItems.js';
import generateAdoptionApplicationFeeBypassCode from './cron/generateAdoptionApplicationBypassCode.js';
import fetchTopBids from './cron/fetchTopBids.js';
import groupBidsByUser from './cron/groupBidsByUser.js';
import updateAuctionToEnd from './cron/updateAuctionToEnd.js';
import updateAuctionBidderStatuses from './cron/updateAuctionBidderStatuses.js';
import { AuctionWinningBidder } from '../models/auctionWinningBidderModel.js';
import { Auction } from '../models/auctionModel.js';
import mongoose from 'mongoose';
import { auctionPopulateFields } from '../db/populateQueries.js';
import Log from '../models/logModel.js';
import createWinningBiddersForAuction from './cron/createWinningBiddersForAuction.js';
import sendWinnerEmailsAndUpdateBids from './cron/sendWinnerEmailsAndUpdateBids.js';
import sendEmailWithRetry from './cron/sendEmailWithRetry.js';
import createPugEmailClient from './emailClients.js';
import Error from '../models/errorModel.js';
import AdoptionFee from '../models/adoptionFeeModel.js';

const cronJobs = (io) => {
  return {
    // Every day at 9:00AM
    sendEcard: cron.schedule(
      '0 9 * * *',
      async () =>
        await sendEmailWithRetry(
          _,
          {},
          'ecard' // ✅ Template name
        ),
      {
        timezone: 'America/New_York',
      }
    ),
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
    // Runs every hour from 6 AM to 9 PM (6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9 PM)
    beginAuctionEvent: cron.schedule(
      '0 6-21 * * *',
      async () => {
        const journeyId = `CRON_UPDATE_AUCTION_${Date.now()}`;
        const events = [];

        try {
          events.push({
            message: 'CRON_STARTED',
            data: { cronName: 'updateAuctionToBegin' },
          });

          const auction = await updateAuctionToBegin(events);

          if (auction) {
            events.push({
              message: 'AUCTION_UPDATED',
              data: {
                auctionId: auction._id,
                status: auction.status,
              },
            });

            io.emit('auction:active', auction);
          } else {
            events.push({
              message: 'NO_AUCTION_FOUND',
              data: {},
            });
          }

          await Log.create({ journey: journeyId, events });
        } catch (err) {
          events.push({
            message: 'CRON_ERROR',
            data: { error: err.message },
          });

          await Log.create({ journey: journeyId, events });

          await Error.create({
            functionName: 'CRON_UPDATE_AUCTION_TO_BEGIN',
            detail: 'Failed to update auction status',
            state: 'cron_update_auction',
            status: 500,
            name: err.name,
            message: err.message,
          });
        }
      },
      {
        timezone: 'America/New_York',
      }
    ),
    // Runs every hour from 6 AM to 9 PM (6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9 PM)
    finalizeAuctionEvent: cron.schedule(
      '0 6-21 * * *',
      async () => {
        const journeyId = `FINALIZE_AUCTION_${Date.now()}`;
        const session = await mongoose.startSession();
        session.startTransaction();

        let auctionId, topBids, grouped, winningBidders;

        try {
          const auction = await updateAuctionToEnd(session);

          if (!auction) {
            await session.abortTransaction();
            session.endSession();
            return;
          }

          auctionId = auction._id;
          await updateAuctionBidderStatuses(auctionId, session);
          await resolveUnsoldAuctionItems(session);

          topBids = await fetchTopBids(auctionId, session);

          if (topBids.length > 0) {
            grouped = groupBidsByUser(topBids);
            winningBidders = await createWinningBiddersForAuction(auctionId, grouped, session);
          }

          // ✅ Commit transaction FIRST
          await session.commitTransaction();
          session.endSession();

          // ✅ THEN send emails OUTSIDE transaction
          if (winningBidders && winningBidders.length > 0) {
            await sendWinnerEmailsAndUpdateBids(winningBidders);
          }

          // Clean up references
          const topBidsCount = topBids?.length || 0;
          topBids = null;
          grouped = null;
          winningBidders = null;

          // Force GC
          if (global.gc) global.gc();

          // Log success
          await Log.create({
            journey: journeyId,
            events: [
              {
                message: 'AUCTION_FINALIZED',
                data: { auctionId, topBidsCount },
              },
              {
                message: 'STATUSES_UPDATED',
                data: { auctionId },
              },
              {
                message: 'UNSOLD_ITEMS_RESOLVED',
                data: { auctionId },
              },
              ...(topBidsCount > 0
                ? [
                    {
                      message: 'EMAILS_SENT',
                      data: { auctionId, emailCount: topBidsCount },
                    },
                  ]
                : []),
            ],
          });

          // Fetch and emit
          const populatedAuction = await Auction.findById(auctionId).populate(
            auctionPopulateFields
          );

          io.emit('auction:ended', populatedAuction);
        } catch (error) {
          // ✅ Only abort if transaction is still active
          if (session.inTransaction()) {
            await session.abortTransaction();
          }
          session.endSession();

          // Log failure
          try {
            await Log.create({
              journey: journeyId,
              events: [
                {
                  message: 'AUCTION_FINALIZATION_FAILED',
                  data: {
                    error: error.message,
                    stack: error.stack,
                    name: error.name,
                  },
                },
              ],
            });
          } catch (logError) {
            console.error('Failed to log error:', logError);
          }

          console.error('❌ Cron job failed:', error);
        }
      },
      { timezone: 'America/New_York' }
    ),
    // Every day at 9:00AM
    sendOutPaymentReminderEmailForWinningBidAuctionItem: cron.schedule(
      '0 9 * * *',
      async () => {
        const journeyId = `PAYMENT_REMINDER_${Date.now()}`;
        const events = [];

        try {
          const pugEmail = await createPugEmailClient();
          const now = new Date();
          const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

          events.push({
            message: 'CRON_STARTED',
            data: { cronName: 'sendOutFirstPaymentReminderEmailForWinningBidAuctionItem' },
          });

          const auctionWinningBidders = await AuctionWinningBidder.find({
            auctionPaymentNotificationEmailHasBeenSent: true,
            emailNotificationCount: 1,
            winningBidPaymentStatus: 'Awaiting Payment',
            auctionItemPaymentStatus: 'Pending',
            createdAt: { $gte: twentyFourHoursAgo },
          }).populate([
            { path: 'auctionItems', populate: [{ path: 'photos' }] },
            { path: 'user', select: 'email name firstName lastName' },
          ]);

          events.push({
            message: 'WINNING_BIDDERS_FOUND',
            data: { count: auctionWinningBidders.length },
          });

          if (auctionWinningBidders.length > 0) {
            for (const bidder of auctionWinningBidders) {
              try {
                await sendEmailWithRetry(
                  pugEmail,
                  {
                    to: bidder.user.email,
                    userName: bidder.user.firstName,
                    totalPrice: bidder.totalPrice,
                    itemCount: bidder.auctionItems.length,
                    items: bidder.auctionItems,
                    paymentLink: `https://www.littlepawsdr.org/orders/${bidder._id}/payment`,
                  },
                  'auctionItemPaymentReminder'
                );

                await AuctionWinningBidder.findByIdAndUpdate(bidder._id, {
                  emailNotificationCount: 2,
                });

                events.push({
                  message: 'REMINDER_EMAIL_SENT',
                  data: { bidderId: bidder._id, email: bidder.user.email },
                });
              } catch (emailError) {
                events.push({
                  message: 'EMAIL_SEND_FAILED',
                  data: { bidderId: bidder._id, error: emailError.message },
                });
              }
            }
          } else {
            events.push({
              message: 'NO_BIDDERS_FOUND',
              data: {},
            });
          }

          await Log.create({ journey: journeyId, events });
        } catch (err) {
          events.push({
            message: 'CRON_FAILED',
            data: { error: err.message },
          });

          await Log.create({ journey: journeyId, events });

          await Error.create({
            functionName: 'CRON_PAYMENT_REMINDER',
            detail: 'Failed to send payment reminder emails',
            state: 'cron_payment_reminder',
            status: 500,
            name: err.name,
            message: err.message,
          });
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
        const journeyId = `PAYMENT_REMINDER_${Date.now()}`;
        const events = [];

        try {
          const pugEmail = await createPugEmailClient();
          const now = new Date();
          const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

          events.push({
            message: 'CRON_STARTED',
            data: { cronName: 'sendOutFirstPaymentReminderEmailForWinningBidAuctionItem' },
          });

          const auctionWinningBidders = await AuctionWinningBidder.find({
            auctionPaymentNotificationEmailHasBeenSent: true,
            emailNotificationCount: 2,
            winningBidPaymentStatus: 'Awaiting Payment',
            auctionItemPaymentStatus: 'Pending',
            createdAt: { $gte: fortyEightHoursAgo },
          }).populate([
            { path: 'auctionItems', populate: [{ path: 'photos' }] },
            { path: 'user', select: 'email name firstName lastName' },
          ]);

          events.push({
            message: 'WINNING_BIDDERS_FOUND',
            data: { count: auctionWinningBidders.length },
          });

          if (auctionWinningBidders.length > 0) {
            for (const bidder of auctionWinningBidders) {
              try {
                await sendEmailWithRetry(
                  pugEmail,
                  {
                    to: bidder.user.email,
                    userName: bidder.user.firstName,
                    totalPrice: bidder.totalPrice,
                    itemCount: bidder.auctionItems.length,
                    items: bidder.auctionItems,
                    paymentLink: `https://www.littlepawsdr.org/orders/${bidder._id}/payment`,
                  },
                  'auctionItemPaymentReminder'
                );

                await AuctionWinningBidder.findByIdAndUpdate(bidder._id, {
                  emailNotificationCount: 2,
                });

                events.push({
                  message: 'REMINDER_EMAIL_SENT',
                  data: { bidderId: bidder._id, email: bidder.user.email },
                });
              } catch (emailError) {
                events.push({
                  message: 'EMAIL_SEND_FAILED',
                  data: { bidderId: bidder._id, error: emailError.message },
                });
              }
            }
          } else {
            events.push({
              message: 'NO_BIDDERS_FOUND',
              data: {},
            });
          }

          await Log.create({ journey: journeyId, events });
        } catch (err) {
          events.push({
            message: 'CRON_FAILED',
            data: { error: err.message },
          });

          await Log.create({ journey: journeyId, events });

          await Error.create({
            functionName: 'CRON_PAYMENT_REMINDER',
            detail: 'Failed to send payment reminder emails',
            state: 'cron_payment_reminder',
            status: 500,
            name: err.name,
            message: err.message,
          });
        }
      },
      {
        timezone: 'America/New_York',
      }
    ),
    // Every day at 9:00AM
    startExpireAdoptionFeesJob: cron.schedule('0 9 * * *', async () => {
      const journeyId = `CRON_EXPIRE_ADOPTION_FEES_${Date.now()}`;
      const events = [];

      try {
        events.push({
          message: 'CRON_STARTED',
          data: { cronName: 'expireAdoptionFees' },
        });

        const now = new Date();
        const nowUnix = Math.floor(now.getTime() / 1000);

        // Update old format (exp field - Unix timestamp in seconds)
        const oldFormatResult = await AdoptionFee.updateMany(
          {
            exp: { $lt: nowUnix },
            applicationStatus: 'Active',
          },
          {
            $set: {
              applicationStatus: 'Inactive',
              tokenStatus: 'Invalid',
            },
          }
        );

        events.push({
          message: 'OLD_FORMAT_ADOPTION_FEES_EXPIRED',
          data: {
            modifiedCount: oldFormatResult.modifiedCount,
            matchedCount: oldFormatResult.matchedCount,
            format: 'exp (Unix timestamp)',
          },
        });

        // Update new format (expiresAt field - Date object)
        const newFormatResult = await AdoptionFee.updateMany(
          {
            expiresAt: { $lt: now },
            applicationStatus: 'Active',
          },
          {
            $set: {
              applicationStatus: 'Inactive',
              tokenStatus: 'Invalid',
            },
          }
        );

        events.push({
          message: 'NEW_FORMAT_ADOPTION_FEES_EXPIRED',
          data: {
            modifiedCount: newFormatResult.modifiedCount,
            matchedCount: newFormatResult.matchedCount,
            format: 'expiresAt (Date)',
          },
        });

        events.push({
          message: 'CRON_COMPLETED',
          data: { status: 'success' },
        });

        await Log.create({ journey: journeyId, events });
      } catch (error) {
        events.push({
          message: 'CRON_ERROR',
          data: {
            error: error.message,
            stack: error.stack,
          },
        });

        events.push({
          message: 'CRON_FAILED',
          data: { status: 'failed' },
        });

        await Log.create({ journey: journeyId, events });
      }
    }),
  };
};

export default cronJobs;
