import { Auction, AuctionItem, AuctionWinningBidder, Bid } from '../../models/campaignModel.js';
import { logEvent, prepareLog } from '../logHelpers.js';
import { io } from '../../server.js';

/**
 * Update AuctionItem with sold price and top bidder info
 */
async function updateAuctionItemSoldPriceAndTopBidder(bid, log) {
  try {
    const updated = await AuctionItem.findByIdAndUpdate(
      bid.auctionItem._id,
      { soldPrice: bid._bid.bidAmount, topBidder: bid._bid.bidder },
      { new: true }
    );
    logEvent(log, 'SUCCESS UPDATE AUCTION ITEM SOLD PRICE AND TOB BIDDER', updated);
    return updated;
  } catch (err) {
    logEvent(log, 'FAILED TO UPDATE AUCTION ITEM SOLD PRICE AND TOP BIDDER', JSON.stringify(err));
  }
}

async function createWinningBidder({ bids, auctionId, userId, log }) {
  try {
    const auctionItemsIds = bids.map((b) => b.auctionItem._id);
    const shippingTotal = bids.reduce((sum, b) => sum + (b.auctionItem.shippingCosts || 0), 0);
    const subtotal = bids.reduce((sum, b) => sum + b._bid.bidAmount, 0);

    const winningBidder = new AuctionWinningBidder({
      auction: auctionId,
      user: userId,
      auctionItems: auctionItemsIds,
      subtotal,
      totalPrice: shippingTotal + subtotal,
      shipping: shippingTotal,
    });

    await winningBidder.save();

    await winningBidder.populate([{ path: 'auctionItems', populate: [{ path: 'photos' }] }, { path: 'user' }]);

    logEvent(log, 'SUCCESS CREATE AUCTION WINNING BIDDER', winningBidder);
    return winningBidder;
  } catch (err) {
    logEvent(log, 'FAILED TO CREATE WINNING BIDDER', JSON.stringify(err));
  }
}

async function updateAuctionWithWinningBidder(auctionId, winningBidderId, log) {
  await Auction.findByIdAndUpdate(auctionId, {
    $push: { winningBids: winningBidderId },
  });

  logEvent(log, 'AUCTION UPDATED WITH WINNING BIDDER ID', winningBidderId);
}

/**
 * Send notification email about auction winning bidder
 */
async function notifyWinnerEmail(
  winningBidder, // AuctionWinningBidder document
  pugEmail,
  log
) {
  await sendEmailWithRetry(
    {
      template: 'auctionItemWinningBidder',
      message: {
        from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org>',
        to: winningBidder.user.email,
      },
      locals: {
        itemCount: winningBidder.auctionItems.length,
        shipping: winningBidder.shipping,
        subtotal: winningBidder.subtotal,
        totalPrice: winningBidder.totalPrice,
        auctionItems: winningBidder.auctionItems,
        id: winningBidder._id,
        name: winningBidder.user.name,
      },
    },
    pugEmail,
    log
  );

  await delay(1000); // Optional 1s pause

  return true; // Indicate success
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendEmailWithRetry(emailOptions, pugEmail, log, retries = 3, delayMs = 5000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      logEvent(log, 'SENDING EMAIL', emailOptions);

      await pugEmail.send(emailOptions);
      return;
    } catch (error) {
      logEvent(log, 'SENDING EMAIL ERROR', error);

      if (attempt < retries) {
        console.warn(`Retry ${attempt}/${retries} in ${delayMs}ms...`);
        await delay(delayMs);
      } else {
        console.error('All retries failed:', error);
      }
    }
  }
}

/**
 * Update AuctionWinningBidder after email sent
 */
async function updateWinningBidderAfterEmail(winningBidder, log) {
  const updated = await AuctionWinningBidder.findByIdAndUpdate(
    winningBidder._id,
    {
      auctionPaymentNotificationEmailHasBeenSent: true,
      emailNotificationCount: 1,
    },
    { new: true }
  );

  logEvent(log, 'AUCTION WINNING BIDDER UPDATED AFTER EMAIL', updated);
  return updated;
}

export const notifyAuctionWinners = async (pugEmail, grouped) => {
  const log = await prepareLog('NOTIFY AUCTION WINNERS');
  try {
    for (const userId in grouped) {
      const { user, bids, auction } = grouped[userId];

      // Make sure bids is iterable
      if (!Array.isArray(bids)) {
        console.error(`Bids for user ${userId} is not an array`, bids);
        continue; // skip this user if bids is invalid
      }

      // Check if we've already sent an email to this user for this auction
      const alreadySentEmail = bids.some((item) => item._bid?.sentWinnerEmail === true);
      if (alreadySentEmail) {
        logEvent(log, `Email already sent to user ${user.email}, skipping.`);
        continue;
      }

      // Now bids are your winning items
      for (const winningItem of bids) {
        await updateAuctionItemSoldPriceAndTopBidder(winningItem, log);
      }

      const winningBidder = await createWinningBidder({
        bids,
        auctionId: auction._id,
        userId: user._id,
        log,
      });

      await updateAuctionWithWinningBidder(auction, winningBidder._id, log);

      // Send ONE email per user (not per bid)
      const emailSent = await notifyWinnerEmail(winningBidder, pugEmail, log);

      if (emailSent) {
        // Update ALL bids for this user to mark email as sent
        for (const item of bids) {
          const bid = await Bid.findById(item._bid._id);
          if (bid) {
            bid.sentWinnerEmail = true;
            bid.emailCount = (bid.emailCount || 0) + 1;
            await bid.save();
            logEvent(log, `Updated bid ${bid._id} for user ${user.email}`);
          }
        }

        await updateWinningBidderAfterEmail(winningBidder, log);
        logEvent(log, `Successfully sent winner email to ${user.email}`);
      } else {
        logEvent(log, `Email sending failed for user ${user.email}, skipping bid updates.`);
      }
    }

    logEvent(log, 'ALL TASKS COMPLETE SUCCESSFULLY');
    io.emit('auction-updated');
  } catch (err) {
    logEvent(log, 'ERROR OCCURRED', { error: err.message || err });
  }
};

export default notifyAuctionWinners;
