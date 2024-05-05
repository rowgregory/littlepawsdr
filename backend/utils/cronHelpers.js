import { Auction, AuctionItem, Bid } from '../models/campaignModel.js';
import { io } from '../server.js';
import { logEvent } from './logHelpers.js';
import { sendEmail } from './sendEmail.js';

async function findOneAndUpdateAuctionStart() {
  const today = new Date();
  today.setUTCHours(13, 0, 0, 0);
  today.toLocaleString('en-US', { timeZone: 'America/New_York' });

  const utcDateString = today.toISOString();
  const auctionStartDate = utcDateString.replace('Z', '+00:00');

  const auction = await Auction.findOneAndUpdate(
    {
      'settings.startDate': { $lte: auctionStartDate },
      'settings.hasBegun': false,
      'settings.hasEnded': false,
      'settings.isAuctionPublished': true,
    },
    {
      $set: {
        'settings.hasBegun': true,
        'settings.auctionStatus': 'Bidding closes',
      },
    },
    { new: true }
  );

  return auction;
}

async function findOneAndUpdateAuctionEnd() {
  const today = new Date();
  today.setUTCHours(17, 0, 0, 0);
  today.toLocaleString('en-US', { timeZone: 'America/New_York' });
  const utcDateString = today.toISOString();
  const auctionEndDate = utcDateString.replace('Z', '+00:00');

  const auction = await Auction.findOneAndUpdate(
    {
      'settings.endDate': { $lte: auctionEndDate },
      'settings.hasBegun': true,
      'settings.hasEnded': false,
    },
    { $set: { 'settings.hasEnded': true } },
    { new: true }
  );

  return auction;
}

async function updateAuctionItemStatuses(log) {
  logEvent(log, 'UPDATING AUCTION ITEM STATUSES');

  const auctionItems = await AuctionItem.updateMany({ status: 'Unsold' }, [
    {
      $set: {
        status: {
          $cond: {
            if: {
              $or: [{ $ne: ['$instantBuyers', []] }, { $ne: ['$bids', []] }],
            },
            then: 'Sold',
            else: {
              $cond: {
                if: {
                  $and: [{ $eq: ['$instantBuyers', []] }, { $eq: ['$bids', []] }],
                },
                then: 'Ended',
                else: '$status',
              },
            },
          },
        },
      },
    },
  ]);

  if (auctionItems.modifiedCount > 0) {
    logEvent(log, 'AUCTION ITEM STATUSES UPDATED - EMITTING AUCTION UPDATED', {
      documentsModified: auctionItems.modifiedCount,
    });

    io.emit('auction-updated');
  } else {
    logEvent(log, 'NO AUCTION ITEM UPDATE', {
      documentsModified: auctionItems.modifiedCount,
    });
  }
  await log.save();
}

async function handleTopBids(auction, log) {
  logEvent(log, 'AUCTION FOUND - POPULATING TOP BIDS');

  const topBids = await Bid.find({
    auction: auction._id,
    status: 'Top Bid',
    sentWinnerEmail: false,
    emailCount: 0,
  }).populate([
    { path: 'auction' },
    { path: 'user' },
    { path: 'auctionItem', populate: [{ path: 'photos' }] },
  ]);

  if (!topBids) return logEvent(log, 'No top bids', topBids);

  logEvent(log, 'SENDING TOP BIDS TO NOTIFY AUCTION WINNER');

  sendEmail(topBids, {}, 'AUCTION_ITEM_WINNER', '', false, log);
}

function generateCode() {
  // Function to generate a random string of specified length
  function generateRandomString(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }

  // Function to generate a random 2-character code
  function generateRandomCode() {
    return generateRandomString(2).toUpperCase();
  }

  // Function to generate a random 3-digit number
  function generateRandomNumber() {
    return Math.floor(Math.random() * 10);
  }

  // Generate the final code
  const prefix = 'DOXIE-';
  const middlePart = `${generateRandomCode()}${generateRandomNumber()}`;
  const randomChars = generateRandomString(5);

  return `${prefix}${middlePart}${randomChars}`;
}

export {
  findOneAndUpdateAuctionStart,
  findOneAndUpdateAuctionEnd,
  updateAuctionItemStatuses,
  handleTopBids,
  generateCode,
};
