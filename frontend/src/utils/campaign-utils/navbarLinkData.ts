const navbarLinksData = (id: string) => [
  {
    title: 'Details',
    key: 'details',
    linkKey: `/admin/campaigns/${id}/details`,
  },
  {
    title: 'Sharing',
    key: 'sharing',
    linkKey: `/admin/campaigns/${id}/sharing`,
  },
  {
    title: 'Auction',
    key: 'auction',
    linkKey: `/admin/campaigns/${id}/auction`,
  },
];

export default navbarLinksData;
