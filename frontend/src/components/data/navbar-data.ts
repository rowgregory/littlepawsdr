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
  },
  {
    linkKey: '/dachshunds/hold',
    linkText: 'Not Available For Adoption Yet',
    active: pathname === '/dachshunds/hold',
  },
  {
    linkKey: '/adopt',
    linkText: 'Adoption Application',
    active: pathname === '/adopt',
  },
  {
    linkKey: '/volunteer/foster-application',
    linkText: 'Foster Application',
    active: pathname === '/volunteer/foster-application',
  },
  {
    linkKey: '/store',
    linkText: 'Merch & Ecards',
    active: pathname === '/store',
  },
];

export { topHeaderLinks, bottomHeaderLinks };
