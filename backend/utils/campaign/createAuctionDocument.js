import { Auction } from '../../models/campaignModel.js';
import { logEvent } from '../logHelpers.js';

async function createAuctionDocument(log) {
  try {
    const auction = await Auction.create({});
    logEvent(log, 'AUCTION DOCUMENT CREATED', auction);

    return auction;
  } catch (err) {
    logEvent(log, 'ERROR CREATING AUCTION DOCUMENT');
  }
}

export default createAuctionDocument;
