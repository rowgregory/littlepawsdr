import { logEvent } from '../logHelpers.js';

/**
 * Group top bids by user and calculate totals
 */
const groupBidsByUser = (topBids, log) => {
  const grouped = {};

  for (const bid of topBids) {
    const userId = bid.user._id.toString();

    if (!grouped[userId]) {
      grouped[userId] = {
        email: bid.email,
        user: bid.user,
        auction: bid.auction,
        bids: [],
        totalPrice: 0,
      };
    }

    const needsShipping = bid.auctionItem.requiresShipping;
    const shipping = needsShipping ? bid.auctionItem.shippingCosts : 0;
    const itemPrice = bid.bidAmount;
    const total = shipping + itemPrice;

    grouped[userId].bids.push({
      auctionItem: bid.auctionItem,
      itemPrice,
      shipping,
      total,
      _bid: bid, // keep reference to update sent flags later
    });

    grouped[userId].totalPrice += total;
  }

  logEvent(log, 'GROUPED BIDS BY USER', grouped);

  return grouped;
};

export default groupBidsByUser;
