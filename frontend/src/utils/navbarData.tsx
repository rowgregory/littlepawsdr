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

export const NAVBAR_DATA_DESKTOP = (userInfo?: UserInfoProps) => {
  const topNavItems = [];
  const sideNavItems = [];
  topNavItems.push(
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
          : 'Sign in',
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
          : userInfo && !userInfo?.isAdmin && !userInfo.isVolunteer
          ? [
              { linkKey: '/my-orders', textKey: 'My Orders' },
              { linkKey: '/settings/profile', textKey: 'Settings' },
            ]
          : ['/login'],
      slide: 'dropdown-slide-1',
    }
  );
  sideNavItems.push(
    {
      title: 'Available',
      links: [
        { linkKey: '/available/dogs', textKey: 'Available Dogs' },
        { linkKey: '/available/senior', textKey: 'Adopt a Senior Dog' },
      ],
    },
    {
      title: 'Adopt',
      links: [
        { linkKey: '/adopt', textKey: 'Adoption' },
        { linkKey: '/adopt', textKey: 'Application' },
        { linkKey: '/adopt', textKey: 'Information' },
        { linkKey: '/adopt', textKey: 'Fees' },
        { linkKey: '/adopt', textKey: 'FAQ' },
      ],
    },
    {
      title: 'Surrender',
      link: '/surrender',
    },
    {
      title: 'Donate',
      link: '/donate',
    },
    {
      title: 'Volunteer',
      links: [
        {
          linkKey: '/volunteer/volunteer-application',
          textKey: 'Volunteer Application',
        },
        {
          linkKey: '/volunteer/foster-application',
          textKey: 'Foster Application',
        },
      ],
    },
    {
      title: 'About Us',
      links: [
        { linkKey: '/about/who-we-are', textKey: 'Who We Are' },
        { linkKey: '/about/contact-us', textKey: 'Contact Us' },
        { linkKey: '/about/education', textKey: 'Education' },
        { linkKey: '/about/sanctuary', textKey: 'Sanctuary' },
        { linkKey: '/about/hold', textKey: 'Dogs on Hold' },
        {
          linkKey: '/about/successful-adoptions',
          textKey: 'Successful Adoptions',
        },
        { linkKey: '/about/rainbow-bridge', textKey: 'Rainbow Bridge' },
        { linkKey: '/about/raffle-winners', textKey: 'Raffle Winners' },
        { linkKey: '/about/blog', textKey: 'Blog' },
      ],
    },
    {
      title: 'Events',
      link: '/events',
      num: 5,
    },
    {
      title: 'Shop',
      link: '/shop',
      num: 6,
    }
  );

  return { topNavItems, sideNavItems };
};
