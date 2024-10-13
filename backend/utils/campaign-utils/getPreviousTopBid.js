import { Bid } from '../../models/campaignModel.js';
import { logEvent } from '../logHelpers.js';

const getPreviousTopBid = async (log, auctionItemId) => {
  try {
    const previousTopBid = await Bid.findOne({ auctionItem: auctionItemId })
      .sort({ bidAmount: -1 }) // Sort by the highest bid amount
      .populate([
        { path: 'auctionItem', populate: [{ path: 'photos' }] },
        { path: 'auction', populate: [{ path: 'campaign' }] },
      ])
      .exec();

    logEvent(log, 'RETREIVE THE CURRENT TOP BID FOR THE AUCTION ITEM', previousTopBid);

    return previousTopBid;
  } catch (err) {
    logEvent(log, 'ERROR RETRIEVING PREVIOUS TOP BID', err);
  }
};

export default getPreviousTopBid;
