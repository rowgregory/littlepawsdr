import { atIcon, shoppingCartIcon, userShieldIcon, usersIcon } from '../../icons';
import { toggleNavigationDrawer } from '../../redux/features/navbar/navbarSlice';
import { formatDateTime } from '../../utils/formatDateTime';

const topHeaderLinks = (auth: any, dispatch: any, navigate: any, cartItemsAmount: number) => {
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
    ...(auth.user?._id
      ? [
          {
            icon: userShieldIcon,
            titleKey:
              formatDateTime(auth.user?.lastLoginTime) === 'Invalid Date'
                ? 'First Time Logged In'
                : `Last login: ${formatDateTime(auth.user?.lastLoginTime)}`,
            textKey: `${auth.user?.firstName} ${auth.user?.lastName}`,
            className: 'cursor-pointer',
            onClick: () => dispatch(toggleNavigationDrawer({ navigationDrawer: true })),
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
