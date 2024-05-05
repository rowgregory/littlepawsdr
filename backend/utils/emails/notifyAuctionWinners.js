import {
  Auction,
  AuctionBidder,
  AuctionItem,
  AuctionWinningBidder,
  Campaign,
  Bid,
} from '../../models/campaignModel.js';
import { io } from '../../server.js';
import { logEvent } from '../logHelpers.js';

export const notifyAuctionWinners = async (pugEmail, topBids, log) => {
  try {
    if (!topBids || !Array.isArray(topBids)) {
      logEvent(log, 'INVALID TOPBIDS', topBids);
      return;
    }

    topBids?.forEach(async (topBid) => {
      await AuctionBidder.findOneAndUpdate({ user: topBid.user }, { status: 'Winner' });
      logEvent(log, 'UPDATED AUCTION BIDDER TO WINNER');

      const campaign = await Campaign.findOne({ auction: topBid.auction }).populate([
        { path: 'auction' },
      ]);
      logEvent(log, 'CAMPAIGN FOUND');
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

      io.emit('auction-updated');

      await pugEmail
        .send({
          template: 'auctionItemWinningBidder',
          message: {
            from: `Little Paws Dachshund Rescue <no-reply@littlepawsdr.org`,
            to: topBid.email,
          },
          locals: {
            photo: topBid.auctionItem.photos[0].url,
            itemName: topBid.auctionItem.name,
            desc: topBid.auctionItem.description,
            subtotal: itemSoldPrice?.toFixed(2),
            processingFee: winningBidder.processingFee?.toFixed(2),
            shipping: winningBidder.shipping?.toFixed(2),
            processingFee: winningBidder.processingFee?.toFixed(2),
            totalPrice: winningBidder.totalPrice?.toFixed(2),
            id: winningBidder._id,
          },
        })
        .then(async () => {
          logEvent(log, 'AUCTION WINNING BIDDER EMAIL SENT');
          await AuctionWinningBidder.findOneAndUpdate(winningBidder?._id, {
            auctionPaymentNotificationEmailHasBeenSent: true,
            emailNotificationCount: 1,
          });
          logEvent(log, 'AUCTION WINNING BIDDER UPDATED');

          await Bid.findByIdAndUpdate(topBid?._id, {
            sentWinnerEmail: true,
            emailCount: 1,
          });
          logEvent(log, 'BID UPATED');
        });

      logEvent(log, 'ALL TASKS COMPLETE SUCCESSFULLY');
      await log.save()
    });
  } catch (err) {
    console.error('An error occurred:', err);
  }
};

export default notifyAuctionWinners;
