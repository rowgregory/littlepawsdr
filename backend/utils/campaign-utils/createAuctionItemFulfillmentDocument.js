import { AuctionItemFulfillment } from "../../models/campaignModel.js";
import Error from "../../models/errorModel.js";

async function createAuctionItemFulfillmentDocument(data, user) {
    try {
      const isFixed = data.auctionItem.sellingFormat === 'fixed';
      
      const auctionItemFulfillment = new AuctionItemFulfillment({
        auction: data.auction,
        auctionItem: data?.auctionItem,
        user: user?._id,
        ...(data?.instantBuyer && { instantBuyer: data?.instantBuyer }),
        ...(data?.winningBidder && { winningBidder: data?.winningBidder }),
        name: user?.name,
        email: user?.email,
        payPalId: data.payPalId,
        ...(isFixed && { buyNowPrice: data.buyNowPrice }),
        totalPrice: data.totalPrice,
        type: isFixed ? 'Fixed' : 'Auction',
        auctionItemPaymentStatus: 'Paid',
        winningBidPaymentStatus: 'Complete',
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

  export default createAuctionItemFulfillmentDocument