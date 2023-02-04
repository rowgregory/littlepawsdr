interface UserInfoProps {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isVolunteer: boolean;
  avatar: string;
  volunteerTitle: string;
  volunteerEmail: string;
  profileCardTheme: string;
  online: boolean;
  theme: string;
  token: string;
  confirmed: boolean;
  publicId: string;
}

export const NAVBAR_DATA = (userInfo?: UserInfoProps) => {
  const cartAndUserMenuItems = [];
  cartAndUserMenuItems.push(
    {
      title: 'Donate',
      link: '/donate',
    },
    {
      title: 'Cart',
      link: '/cart',
    },
    {
      title: userInfo?.isAdmin ? 'Avatar' : userInfo ? 'Initials' : 'Sign In',
      links: userInfo?.isAdmin
        ? [
            { linkKey: '/admin', textKey: 'Dashboard' },
            { linkKey: '/my-orders', textKey: 'My Orders' },
            { linkKey: '/settings/profile', textKey: 'Settings' },
          ]
        : userInfo
        ? [
            { linkKey: '/my-orders', textKey: 'My Orders' },
            { linkKey: '/settings/profile', textKey: 'Settings' },
          ]
        : ['/login'],
    }
  );

  return { cartAndUserMenuItems };
};
