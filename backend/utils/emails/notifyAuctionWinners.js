import {
  Auction,
  AuctionBidder,
  AuctionItem,
  AuctionWinningBidder,
  Campaign,
  Bid,
} from '../../models/campaignModel.js';
import { logEvent } from '../logHelpers.js';
import { io } from '../../server.js';

const sendEmailWithRetry = async (emailOptions, pugEmail, log, retries = 3, delay = 5000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await pugEmail.send(emailOptions);
      logEvent(log, 'AUCTION WINNING BIDDER EMAIL SENT');
      return;
    } catch (error) {
      if (attempt < retries) {
        console.warn(
          `Email send failed, retrying in ${delay}ms... (Attempt ${attempt} of ${retries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error('Email send failed after all retries:', error);
        logEvent(log, 'AUCTION WINNING BIDDER EMAIL FAILED', error);
      }
    }
  }
};

export const notifyAuctionWinners = async (pugEmail, topBids, log) => {
  try {
    if (!topBids || !Array.isArray(topBids)) {
      logEvent(log, 'INVALID TOPBIDS', topBids);
      return;
    }
    logEvent(log, 'ABOUT TO LOOP THROUGH TOP BIDS');

    for (const topBid of topBids) {
      await AuctionBidder.findOneAndUpdate({ user: topBid.user }, { status: 'Winner' });

      const campaign = await Campaign.findOne({ auction: topBid.auction }).populate([
        { path: 'auction' },
      ]);
      const auctionItem = await AuctionItem.findByIdAndUpdate(
        topBid.auctionItem,
        { soldPrice: topBid.bidAmount, topBidder: topBid.bidder },
        { new: true }
      );
      logEvent(log, 'AUCTION ITEM UPDATED WITH SOLD PRICE', auctionItem);

      const isFeesRequired = campaign?.feesRequired;
      const feesAmount = campaign?.feesAmount;
      const needsShipping = auctionItem?.requiresShipping;
      const itemSoldPrice = auctionItem?.soldPrice;
      const shipping = auctionItem.shippingCosts;
      const fee = itemSoldPrice * feesAmount;

      const winningBidder = new AuctionWinningBidder({
        auction: topBid.auction,
        user: topBid.user,
        auctionItem: topBid.auctionItem,
        itemSoldPrice,
        processingFee: isFeesRequired ? fee : 0,
        shipping: needsShipping ? shipping : 0,
        totalPrice: (isFeesRequired ? fee : 0) + (needsShipping ? shipping : 0) + itemSoldPrice,
      });

      await winningBidder.save();
      logEvent(log, 'AUCTION WINNING BIDDER CREATED', winningBidder);

      await Auction.findOneAndUpdate(
        { _id: winningBidder.auction._id },
        { $push: { winningBids: winningBidder?._id } }
      );
      logEvent(log, 'AUCTION SAVED WITH WINNING BIDDER IDS - EMITTING AUCTION UPDATED');

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
            processingFee: winningBidder.processingFee?.toFixed(2),
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
      await AuctionWinningBidder.findOneAndUpdate(winningBidder?._id, {
        auctionPaymentNotificationEmailHasBeenSent: true,
        emailNotificationCount: 1,
      });
      logEvent(log, 'AUCTION WINNING BIDDER UPDATED');

      await Bid.findByIdAndUpdate(topBid?._id, {
        sentWinnerEmail: true,
        emailCount: 1,
      });
      logEvent(log, 'BID UPDATED');
    }
    logEvent(log, 'ALL TASKS COMPLETE SUCCESSFULLY');

    io.emit('auction-updated');
    await log.save();
  } catch (err) {
    console.error('An error occurred:', err);
  }
};

export default notifyAuctionWinners;
