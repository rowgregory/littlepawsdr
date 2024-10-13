import { Auction } from '../../models/campaignModel.js';
import { logEvent } from '../logHelpers.js';

async function findAuctionByIdAndUpdate(log, id, data) {
  try {
    const auction = await Auction.findByIdAndUpdate(id, data, { new: true});
    logEvent(log, 'AUCTION FOUND AND UPDATED', auction);
    return auction
  } catch (err) {
    logEvent(log, 'ERROR UPDATING AUCTION DOCUMENT');
  }
}

export default findAuctionByIdAndUpdate;
