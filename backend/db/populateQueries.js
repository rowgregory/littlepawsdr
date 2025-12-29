export const auctionPopulateFields = [
  {
    path: 'items',
    populate: [
      { path: 'photos', select: 'url name size' },
      {
        path: 'instantBuyers',
        populate: [{ path: 'user' }, { path: 'auctionItem' }],
      },
      { path: 'bids', populate: [{ path: 'user' }] },
    ],
  },
  { path: 'bids', populate: [{ path: 'user' }, { path: 'auctionItem' }] },
  {
    path: 'winningBids',
    populate: [
      { path: 'user', populate: [{ path: 'addressRef' }] },
      { path: 'auctionItems', populate: [{ path: 'photos' }] },
    ],
  },
  {
    path: 'instantBuyers',
    populate: [
      { path: 'user', select: 'name email' },
      { path: 'auctionItem', populate: [{ path: 'photos' }] },
    ],
  },
  {
    path: 'bidders',
    populate: [
      {
        path: 'user',
        select: 'name email _id createdAt shippingAddress',
        populate: [{ path: 'addressRef' }],
      },
      { path: 'bids', populate: [{ path: 'auctionItem', populate: [{ path: 'photos' }] }] },
    ],
  },
];
