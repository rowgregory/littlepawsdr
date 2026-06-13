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
  { linkKey: '/dachshunds', linkText: 'Available', active: pathname === '/dachshunds' },
  { linkKey: '/adopt', linkText: 'Adopt', active: pathname === '/adopt' },
  { linkKey: '/store', linkText: 'Merch', active: pathname === '/store' },
  {
    linkKey: '/newsletter-issues',
    linkText: 'Newsletters',
    active: pathname === '/newsletter-issues',
  },
];

export { topHeaderLinks, bottomHeaderLinks };
