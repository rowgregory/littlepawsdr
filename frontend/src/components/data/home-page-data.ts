import { dogIcon, gavelIcon, shoppingBagIcon } from '../../icons';

const hightlightCardData = [
  {
    linkKey: '/store',
    titleKey: 'Merch & Ecards',
    textKey: 'Explore our selection of merchandise designed to support our mission.',
    icon: shoppingBagIcon,
    btnText: 'Shop',
  },
  {
    linkKey: '/donate/welcome-wieners',
    titleKey: 'Welcome Wieners',
    textKey: 'Contribute to specific items that help our lovable wiener dogs thrive.',
    icon: dogIcon,
    btnText: 'Donate',
  },
  {
    linkKey: '/campaigns',
    titleKey: 'Bid in Auctions',
    textKey: 'Place bids in auctions to directly aid our rescue initiatives.',
    icon: gavelIcon,
    btnText: 'Bid',
  },
];

const aboutData = [
  'Comfortable Foster Homes',
  'Online Adoption Process',
  'Detailed Pet Profiles',
  'Becoming a Volunteer',
  'Community Connections',
  'The Heart of Rescue Work',
];

export { hightlightCardData, aboutData };
