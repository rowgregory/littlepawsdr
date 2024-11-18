import { AuctionItemInstantBuyer } from '../../models/campaignModel.js';
import Error from '../../models/errorModel.js';

async function createAuctionItemInstantBuyerDocument(data, user) {
  try {
    const auctionItemInstantBuyer = new AuctionItemInstantBuyer({
      auction: data.auction,
      auctionItem: data?.auctionItem,
      user: user?._id,
      name: user?.name,
      email: user?.email,
      totalPrice: data.totalPrice,
      isDigital: data.isDigital,
      shippingStatus: data.isDigital ? 'Digital' : 'Pending Fulfillment',
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

export default createAuctionItemInstantBuyerDocument;
