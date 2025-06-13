const navbarLinksData = (id: string, auctionItemId: string) => [
  {
    title: 'Details',
    key: 'details',
    linkKey: `/admin/campaigns/${id}/details`,
  },
  {
    title: 'Schedule',
    key: '',
    linkKey: `/admin/campaigns/${id}/auction`,
  },
  {
    title: 'Notifications',
    key: 'notifications',
    linkKey: `/admin/campaigns/${id}/auction/notifications`,
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
];

export default navbarLinksData;
