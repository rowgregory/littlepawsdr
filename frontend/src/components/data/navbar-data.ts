import { AtSignIcon, Shield, ShoppingCart, User } from 'lucide-react';
import { formatDateWithTimezone } from '../../utils/dateFunctions';

const topHeaderLinks = (user: any, navigate: any, cartItemsAmount: number) => {
  return [
    {
      icon: AtSignIcon,
      titleKey: 'Email Address',
      textKey: 'lpdr@littlepawsdr.org',
    },
    {
      icon: ShoppingCart,
      titleKey: 'Cart Items',
      textKey: cartItemsAmount,
      className: 'cursor-pointer',
      onClick: () => navigate('/cart'),
    },
    ...(user?._id
      ? [
          {
            icon: Shield,
            titleKey:
              formatDateWithTimezone(user?.lastLoginTime) === 'Invalid Date'
                ? 'First Time Logged In'
                : `Last login: ${formatDateWithTimezone(user?.lastLoginTime)}`,
            textKey: `${user?.firstName} ${user?.lastName}`,
            className: 'cursor-pointer',
            onClick: () => navigate('/supporter/overview'),
          },
        ]
      : [
          {
            icon: User,
            titleKey: 'Login',
            textKey: 'Access Your Account',
            className: 'cursor-pointer',
            onClick: () => navigate('/auth/login'),
          },
        ]),
  ];
};

const bottomHeaderLinks = (pathname: string) => [
  {
    linkKey: '/dachshunds',
    linkText: 'Available',
    active: pathname === '/dachshunds',
    className: 'hidden md:flex',
  },
  {
    linkKey: '/dachshunds/hold',
    linkText: 'Not Available For Adoption Yet',
    active: pathname === '/dachshunds/hold',
    className: 'hidden md:flex',
  },
  {
    linkKey: '/adopt',
    linkText: 'Adoption Application',
    active: pathname === '/adopt',
    className: 'hidden 880:flex',
  },
  {
    linkKey: '/volunteer/foster-application',
    linkText: 'Foster Application',
    active: pathname === '/volunteer/foster-application',
    className: 'hidden 1075:flex',
  },
  {
    linkKey: '/store',
    linkText: 'Merch & Ecards',
    active: pathname === '/store',
    className: 'hidden 1230:flex',
  },
  {
    linkKey: '/newsletter-issues',
    linkText: 'Newsletters',
    active: pathname === '/newsletter-issues',
    className: 'hidden 1360:flex',
  },
];

export { topHeaderLinks, bottomHeaderLinks };
