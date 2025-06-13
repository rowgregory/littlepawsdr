import { Bid } from '../../models/campaignModel.js';
import Error from '../../models/errorModel.js';
import { logEvent } from '../logHelpers.js';

async function createBidDocument(log, data, user) {
  logEvent(log, 'INITIATE CREATE BID DOCUMENT');
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
    const savedBidDocument = await bid.save();
    logEvent(log, 'BID DOCUMENT SAVED', savedBidDocument);
    return savedBidDocument;
  } catch (err) {
    logEvent(log, 'ERROR CREATE BID DOCUMENT', savedBidDocument);
    await Error.create({
      functionName: 'CREATE_BID_DOCUMENT_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: user?._id, email: user?.email },
    });
  }
}

export default createBidDocument;
