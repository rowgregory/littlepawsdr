import {
  Auction,
  AuctionBidder,
  AuctionItem,
  AuctionWinningBidder,
  Bid,
} from '../../models/campaignModel.js';
import { logEvent, prepareLog } from '../logHelpers.js';
import { io } from '../../server.js';

const sendEmailWithRetry = async (emailOptions, pugEmail, log, retries = 3, delay = 5000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      logEvent(log, 'SENDING EMAIL', emailOptions)
      await log.save()
      await pugEmail.send(emailOptions);
      return;
    } catch (error) {
      logEvent(log, 'SENDING EMAIL ERROR', error)
      await log.save()
      
      if (attempt < retries) {
        console.warn(
          `Email send failed, retrying in ${delay}ms... (Attempt ${attempt} of ${retries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error('Email send failed after all retries:', error);
      }
    }
  }
};

export const notifyAuctionWinners = async (pugEmail, topBids) => {
  const log = await prepareLog('NOTIFY AUCTION WINNERS');
  logEvent(log, 'BEGIN NOTIFY AUCTION WINNERS', topBids);

  try {
    if (!topBids || !Array.isArray(topBids)) {
      logEvent(log, 'INVALID TOPBIDS', topBids);
      await log.save();
      return;
    }

    for (const topBid of topBids) {
     const auctionBidder = await AuctionBidder.findOneAndUpdate({ user: topBid.user }, { status: 'Winner' }, { new: true });
     logEvent(log, 'AUCTION BIDDER STATUS UPDATED', auctionBidder);

      const auctionItem = await AuctionItem.findByIdAndUpdate(
        topBid.auctionItem,
        { soldPrice: topBid.bidAmount, topBidder: topBid.bidder },
        { new: true }
      );
      logEvent(log, 'AUCTION ITEM UPDATED', auctionItem);

      const needsShipping = auctionItem?.requiresShipping;
      const itemSoldPrice = auctionItem?.soldPrice;
      const shipping = auctionItem.shippingCosts;

      const winningBidder = new AuctionWinningBidder({
        auction: topBid.auction,
        user: topBid.user,
        auctionItem: topBid.auctionItem,
        itemSoldPrice,
        shipping: needsShipping ? shipping : 0,
        totalPrice: (needsShipping ? shipping : 0) + itemSoldPrice,
      });

      await winningBidder.save();
      logEvent(log, 'AUCTION WINNING BIDDER CREATED', winningBidder);

      await Auction.findOneAndUpdate(
        { _id: winningBidder.auction._id },
        { $push: { winningBids: winningBidder?._id } }
      );
      logEvent(log, 'AUCTION SAVED WITH WINNING BIDDER IDS');

      // Send email with a delay
      await sendEmailWithRetry(
        {
          template: 'auctionItemWinningBidder',
          message: {
            from: 'Little Paws Dachshund Rescue <no-reply@littlepawsdr.org>',
            to: topBid.email,
          },
          locals: {
            photo: topBid.auctionItem.photos[0].url,
            itemName: topBid.auctionItem.name,
            desc: topBid.auctionItem.description,
            subtotal: itemSoldPrice?.toFixed(2),
            shipping: winningBidder.shipping?.toFixed(2),
            totalPrice: winningBidder.totalPrice?.toFixed(2),
            id: winningBidder._id,
          },
        },
        pugEmail,
        log
      );

      // Add a 1-second delay between emails
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update database
      const auctionWinningBidder = await AuctionWinningBidder.findOneAndUpdate(winningBidder?._id, {
        auctionPaymentNotificationEmailHasBeenSent: true,
        emailNotificationCount: 1,
      }, { new: true });
      logEvent(log, 'AUCTION WINNING BIDDER UPDATED', auctionWinningBidder);

      await Bid.findByIdAndUpdate(topBid?._id, {
        sentWinnerEmail: true,
        emailCount: 1,
      });
      logEvent(log, 'BID UPDATED');
    }
    logEvent(log, 'ALL TASKS COMPLETE SUCCESSFULLY');
    await log.save();

    io.emit('auction-updated');
  } catch (err) {
    console.error('An error occurred:', err);
  }
};

export default notifyAuctionWinners;
