import { Bid } from '../../models/campaignModel.js';
import { logEvent } from '../logHelpers.js';

const updateOtherBidsStatus = async (log, auctionItemId, excludedBidId) => {
  try {
    const result = await Bid.updateMany(
      { auctionItem: auctionItemId, _id: { $ne: excludedBidId } },
      { $set: { status: 'Outbid' } }
    );

    logEvent(log, 'UPDATED STATUS OF OTHER BIDS TO OUTBID', result);

    return result;
  } catch (err) {
    logEvent(log, 'ERROR UPDATING STATUS OF OTHER BIDS', err);
  }
};

export default updateOtherBidsStatus;
