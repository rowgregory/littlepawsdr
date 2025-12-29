/**
 * Group top bids by user and calculate totals
 */
const groupBidsByUser = (topBids) => {
  const grouped = {};

  for (const bid of topBids) {
    const userId = bid.user._id.toString();

    if (!grouped[userId]) {
      grouped[userId] = {
        user: bid.user,
        email: bid.user.email,
        userName: `${bid.user.firstName} ${bid.user.lastName}`,
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
      _id: bid._id, // ✅ Add this - the actual Bid document ID
      bidId: bid._id, // Keep this too for clarity
      auctionItemId: bid.auctionItem._id,
      itemName: bid.auctionItem?.name || 'Unknown Item',
      itemImage: bid.auctionItem?.photos?.[0]?.url || null,
      itemPrice,
      shipping,
      total,
    });

    grouped[userId].totalPrice += total;
  }

  return grouped;
};

export default groupBidsByUser;
