import { atIcon, shoppingCartIcon, userShieldIcon, usersIcon } from '../../icons';
import { formatDateWithTimezone } from '../../utils/dateFunctions';

const topHeaderLinks = (user: any, dispatch: any, navigate: any, cartItemsAmount: number) => {
  return [
    {
      icon: atIcon,
      titleKey: 'Email Address',
      textKey: 'lpdr@littlepawsdr.org',
    },
    {
      icon: shoppingCartIcon,
      titleKey: 'Cart Items',
      textKey: cartItemsAmount,
      className: 'cursor-pointer',
      onClick: () => navigate('/cart'),
    },
    ...(user?._id
      ? [
          {
            icon: userShieldIcon,
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
            icon: usersIcon,
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
