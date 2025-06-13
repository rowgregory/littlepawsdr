import { AuctionItem } from '../../models/campaignModel.js';
import { logEvent } from '../logHelpers.js';

async function resolveUnsoldAuctionItems(log) {
  logEvent(log, 'UPDATING AUCTION ITEM STATUSES');

  const auctionItems = await AuctionItem.updateMany({ status: 'Unsold' }, [
    {
      $set: {
        status: {
          $cond: {
            if: {
              $or: [{ $ne: ['$instantBuyers', []] }, { $ne: ['$bids', []] }],
            },
            then: 'Sold',
            else: {
              $cond: {
                if: {
                  $and: [{ $eq: ['$instantBuyers', []] }, { $eq: ['$bids', []] }],
                },
                then: 'Ended',
                else: '$status',
              },
            },
          },
        },
      },
    },
  ]);

  if (auctionItems.modifiedCount > 0) {
    logEvent(log, 'AUCTION ITEM STATUSES UPDATED - EMITTING AUCTION UPDATED', {
      documentsModified: auctionItems.modifiedCount,
    });
  } else {
    logEvent(log, 'NO AUCTION ITEM UPDATE', {
      documentsModified: auctionItems.modifiedCount,
    });
  }
}

export default resolveUnsoldAuctionItems;
