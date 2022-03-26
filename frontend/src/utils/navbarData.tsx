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
  const mobileMenuItems = [];
  const desktopMenuItems = [];
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
          : 'Log On',
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
  mobileMenuItems.push(
    {
      textKey: 'Available',
      linkKey: '/available',
    },
    {
      textKey: 'Adopt',
      linkKey: '/adopt',
    },
    {
      textKey: 'Surrender',
      linkKey: '/surrender',
    },
    {
      textKey: 'Donate',
      linkKey: '/donate',
    },
    {
      textKey: 'Volunteer',
      linkKey: '/volunteer/volunteer-application',
    },
    {
      textKey: 'About Us',
      linkKey: '/about',
    },
    {
      textKey: 'Events',
      linkKey: '/events',
    },
    {
      textKey: 'Shop',
      linkKey: '/shop',
    }
  );

  desktopMenuItems.push(
    { linkText: 'AVAILABLE', linkKey: '/available' },
    { linkText: 'ADOPTION', linkKey: '/adopt' },
    { linkText: 'SURRENDER', linkKey: '/surrender' },
    { linkText: 'DONATE', linkKey: '/donate' },
    {
      linkText: 'VOLUNTEER',
      linkKey: '/volunteer/volunteer-application',
    },
    { linkText: 'ABOUT US', linkKey: '/about' },
    { linkText: 'EVENTS', linkKey: '/events' },
    { linkText: 'SHOP', linkKey: '/shop' }
  );

  return { cartAndUserMenuItems, mobileMenuItems, desktopMenuItems };
};
