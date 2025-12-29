const BASE_URL = '/admin/auctions';

const navbarLinksData = (id: string) => {
  // Guard against undefined or empty id
  if (!id) {
    return [];
  }

  return [
    {
      title: 'Overview',
      key: 'overview',
      linkKey: `${BASE_URL}/${id}/overview`,
    },
    {
      title: 'Items',
      key: 'items',
      linkKey: `${BASE_URL}/${id}/items`,
    },
    {
      title: 'Participants',
      key: 'participants',
      linkKey: `${BASE_URL}/${id}/participants`,
    },
    {
      title: 'Winning bids',
      key: 'winning-bids',
      linkKey: `${BASE_URL}/${id}/winning-bids`,
    },
  ];
};

export default navbarLinksData;
