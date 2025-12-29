import { AuctionItem } from '../../models/auctionItemModel.js';

async function resolveUnsoldAuctionItems(session) {
  await AuctionItem.collection.updateMany(
    { status: 'Unsold' },
    [
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
    ],
    { session }
  );
}

export default resolveUnsoldAuctionItems;
