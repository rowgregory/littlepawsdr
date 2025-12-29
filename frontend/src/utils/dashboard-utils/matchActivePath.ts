const matchAndConvertUrl = (path: string, pathToMatch?: string) =>
  new RegExp(`^(${`/admin/${pathToMatch}`}(|$))`).test(path).toString();

const stringToBoolean = (str: string) => {
  return str === 'true';
};

const matchActivePath = (path: string) => ({
  dashboard: path === '/admin',
  auctions: stringToBoolean(matchAndConvertUrl(path, `auctions`)),
  orders: stringToBoolean(matchAndConvertUrl(path, `orders`)),
  store: stringToBoolean(matchAndConvertUrl(path, `store`)),
  adoptionApplication: stringToBoolean(matchAndConvertUrl(path, `adoption-application`)),
  people: stringToBoolean(matchAndConvertUrl(path, `contacts`)),
  oneTimeDonations: path === '/admin/donations',
});

export default matchActivePath;
