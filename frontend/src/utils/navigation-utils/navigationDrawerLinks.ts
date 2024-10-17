const navigationDrawerLinks = (campaignLinkKey: string) => {
  return [
    {
      title: 'Home',
      icon: 'fas fa-home mr-2',
      link: '/',
    },
    {
      title: 'Dachshunds',
      icon: 'fas fa-bone mr-2',
      links: [
        {
          linkKey: '/dachshunds',
          linkText: 'Available',
        },
        {
          linkKey: '/dachshunds/hold',
          linkText: 'Not Available For Adoption Yet',
        },
        {
          linkKey: '/dachshunds/surrender',
          linkText: 'Surrender to Us',
        },
      ],
    },
    {
      title: 'Adopt',
      icon: 'fas fa-heart mr-2',
      links: [
        {
          linkKey: '/adopt',
          linkText: 'Application',
        },
        {
          linkKey: '/adopt/info',
          linkText: 'Information',
        },
        {
          linkKey: '/adopt/fees',
          linkText: 'Fees',
        },
        {
          linkKey: '/adopt/senior',
          linkText: 'Adopt a Senior',
        },
        {
          linkKey: '/adopt/faq',
          linkText: 'FAQ',
        },
      ],
    },
    {
      title: 'Auctions',
      icon: 'fas fa-gavel mr-2',
      link: campaignLinkKey,
    },
    {
      title: 'Merch & Ecards',
      icon: 'fas fa-shopping-bag mr-2',
      link: '/store',
    },
    {
      title: 'Donate',
      icon: 'fas fa-dollar mr-2',
      links: [
        {
          linkKey: '/donate',
          linkText: 'One-Time/Monthly',
        },
        {
          linkKey: '/donate/welcome-wieners',
          linkText: 'Welcome Wieners',
        },
        {
          linkKey: '/donate/shop-to-help',
          linkText: 'Shop To Help',
        },
        {
          linkKey: '/donate/feed-a-foster',
          linkText: 'Feed a Foster',
        },
      ],
    },

    {
      title: 'Volunteer',
      icon: 'fa-solid fa-handshake mr-2',
      links: [
        {
          linkKey: '/volunteer/volunteer-application',
          linkText: 'Volunteer Application',
        },
        {
          linkKey: '/volunteer/foster-application',
          linkText: 'Foster Application',
        },
        {
          linkKey: '/volunteer/transport-application',
          linkText: 'Transport Application',
        },
      ],
    },
  ];
};

export default navigationDrawerLinks;
