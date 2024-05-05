import {
  Auction,
  AuctionItem,
  AuctionItemFulfillment,
  AuctionItemInstantBuyer,
  AuctionItemPhoto,
  Bid,
  Campaign,
} from '../models/campaignModel.js';
import Error from '../models/errorModel.js';

export async function createAuctionDocument() {
  return await Auction.create({});
}
export async function createCampaignDocument(title, auctionId) {
  return await Campaign.create({
    auction: auctionId,
    title,
    customCampaignLink: title.substring(0, 6).toUpperCase(),
  });
}

export async function createAuctionItemDocument({
  auction,
  name,
  description,
  photos,
  sellingFormat,
  startingPrice,
  buyNowPrice,
  totalQuantity,
  requiresShipping,
  shippingCosts,
  minimumBid
}) {
  try {
    const auctionItemPhotos = await Promise.all(
      photos.map(async (photo) => {
        const auctionItemPhoto = new AuctionItemPhoto({
          name: photo.name,
          url: photo.url,
          size: photo.size,
        });

        return await auctionItemPhoto.save();
      })
    );

    let auctionItem;

    if (sellingFormat === 'fixed') {
      auctionItem = new AuctionItem({
        auction,
        photos: auctionItemPhotos.map((photo) => photo._id),
        name,
        description,
        sellingFormat: 'fixed',
        buyNowPrice,
        totalQuantity,
        requiresShipping,
        shippingCosts,
        itemBtnText: 'Buy Now',
        isFixed: true
      });
    } else {
      auctionItem = new AuctionItem({
        auction,
        name,
        description,
        photos: auctionItemPhotos.map((photo) => photo._id),
        sellingFormat: 'auction',
        startingPrice,
        totalQuantity: 1,
        requiresShipping,
        shippingCosts,
        currentBid: startingPrice,
        totalBids: 0,
        itemBtnText: 'Place Bid',
        minimumBid,
        isAuction: true
      });
    }
    return await auctionItem.save();
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_AUCTION_ITEM_DOCUMENT_FUCNTION_PRIVATE_ADMIN',
      name: err.name,
      message: err.message,
    });
  }
}

export async function createAuctionItemInstantBuyerDocument(data, user) {

  try {
    const auctionItemInstantBuyer = new AuctionItemInstantBuyer({
      auction: data.auction,
      auctionItem: data?.auctionItem,
      user: user?._id,
      name: user?.name,
      email: user?.email,
      totalPrice: data.totalPrice,

    });

    await auctionItemInstantBuyer.save();

    await auctionItemInstantBuyer.populate([{ path: 'user' }, { path: 'auctionItem' }]);

    return auctionItemInstantBuyer;
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_AUCTION_ITEM_INSTANT_BUYER_DOCUMENT_FUNCTION_PRIVATE',
      name: err.name,
      message: err.message,
      user: { id: user?._id, email: user?.email },
    });
  }
}

export async function createAuctionItemFulfillmentDocument(data, user) {
  try {
    const isFixed = data.auctionItem.sellingFormat === 'fixed';
    const auctionItemFulfillment = new AuctionItemFulfillment({
      auction: data.auction,
      auctionItem: data?.auctionItem,
      user: user?._id,
      ...data?.instantBuyer && { instantBuyer: data?.instantBuyer },
      ...data?.winningBidder && { winningBidder: data?.winningBidder },
      name: user?.name,
      email: user?.email,
      payPalId: data.payPalId,
      ...isFixed && { buyNowPrice: data.buyNowPrice },
      processingFee: data.processingFee,
      totalPrice: data.totalPrice,
      type: isFixed ? 'Fixed' : 'Auction',
      auctionItemPaymentStatus: 'Paid',
      winningBidPaymentStatus: 'Complete'
    });

    await auctionItemFulfillment.save();

    await auctionItemFulfillment.populate([{ path: 'user' }, { path: 'auctionItem' }]);

    return auctionItemFulfillment;
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_AUCTION_ITEM_FULFILLMENT_DOCUMENT_PRIVATE_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: user?._id, email: user?.email },
    });
  }
}

export async function createBidDocument(data, user) {
  try {
    const bid = new Bid({
      auction: data.auctionId,
      auctionItem: data.auctionItemId,
      user: user?._id,
      bidAmount: data.bidAmount,
      email: user.email,
      bidder: user.anonymousBidding ? 'Anonymous' : user?.name,
      status: 'Top Bid',
    });

    // // Retrieve the _id of the top bid
    const topBidId = bid._id;

    // Update status of other bids to 'Outbid' excluding the top bid
    await Bid.updateMany({ auctionItem: data.auctionItemId, _id: { $ne: topBidId } }, { $set: { status: 'Outbid' } });

    return await bid.save();
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_BID_DOCUMENT_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: user?._id, email: user?.email },
    });
  }
}
