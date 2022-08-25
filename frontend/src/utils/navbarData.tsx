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
      title: 'Cart',
      link: '/cart',
    },
    {
      title:
        userInfo && (userInfo?.isAdmin || userInfo?.isVolunteer)
          ? 'Avatar'
          : userInfo && (!userInfo?.isAdmin || !userInfo?.isVolunteer)
          ? 'Initials'
          : 'Sign In',
      links:
        userInfo && userInfo?.isAdmin
          ? [
              { linkKey: '/admin', textKey: 'Dashboard' },
              { linkKey: '/my-orders', textKey: 'My Orders' },
              { linkKey: '/settings/profile', textKey: 'Settings' },
            ]
          : userInfo && userInfo?.isVolunteer
          ? [
              { linkKey: '/my-orders', textKey: 'My Orders' },
              { linkKey: '/settings/profile', textKey: 'Settings' },
            ]
          : userInfo && !userInfo?.isAdmin && !userInfo?.isVolunteer
          ? [
              { linkKey: '/my-orders', textKey: 'My Orders' },
              { linkKey: '/settings/profile', textKey: 'Settings' },
            ]
          : ['/login'],
      slide: 'dropdown-slide-1',
    }
  );

  return { cartAndUserMenuItems };
};
