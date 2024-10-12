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
  {
    title: 'Settings',
    key: 'settings',
    linkKey: `/admin/campaigns/${id}/settings`,
  },
];

export default navbarLinksData;
