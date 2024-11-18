const auctionSidebarLinksData = (id: any, auctionItemId: string) => [
  {
    title: 'Auction settings',
    key: '',
    linkKey: `/admin/campaigns/${id}/auction`,
  },
  {
    title: 'Notifications',
    key: 'notifications',
    linkKey: `/admin/campaigns/${id}/auction/notifications`,
  },
  {
    title: 'Donations',
    key: 'donations',
    linkKey: `/admin/campaigns/${id}/auction/donations`,
  },
  {
    title: 'Items',
    key: 'items',
    key2: `items/${auctionItemId}/bids`,
    linkKey: `/admin/campaigns/${id}/auction/items`,
  },
  {
    title: 'Instant Buyers',
    key: 'instant-buyers',
    linkKey: `/admin/campaigns/${id}/auction/instant-buyers`,
  },
  {
    title: 'Bidders',
    key: 'bidders',
    linkKey: `/admin/campaigns/${id}/auction/bidders`,
  },
  {
    title: 'Winning bids',
    key: 'winning-bids',
    linkKey: `/admin/campaigns/${id}/auction/winning-bids`,
  },
  {
    title: 'Item fulfillment',
    key: 'item-fulfillment',
    linkKey: `/admin/campaigns/${id}/auction/item-fulfillment`,
  },
];

export default auctionSidebarLinksData;
