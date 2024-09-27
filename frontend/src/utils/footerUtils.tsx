export const quickLinks = () => {
  return [
    {
      linkKey: 'Available Dachshunds',
      linkPath: '/available',
    },
    {
      linkKey: 'Adoption Information',
      linkPath: '/adopt/info',
      path: 'Information',
    },
    {
      linkKey: 'Adoption Fees',
      linkPath: '/adopt/fees',
      path: 'Fees',
    },
    {
      linkKey: 'Volunteer Information',
      linkPath: '/volunteer/volunteer-application',
      path: 'Volunteer application',
    },
    {
      linkKey: 'Foster Information',
      linkPath: '/volunteer/foster-application',
      path: 'Foster application',
    },
    {
      linkKey: 'Merch',
      linkPath: '/merch',
    },
    {
      linkKey: 'Contact Us',
      linkPath: '/contact-us',
    },
  ];
};

export const pagesToExclude = (pathname: string) =>
  [
    '/login',
    '/admin',
    '/settings',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/cart',
    '/order',
    '/email-confirmation',
    '/404',
    '/campaigns',
    '/auction-items',
  ].some((a: string) => pathname.includes(a));

export const privacyPolicyLinkKey =
  'https://www.privacypolicies.com/live/c37902bc-11cd-430e-a925-2b82ce905c88';

export const termsOfServiceLinkKey =
  'https://www.termsandconditionsgenerator.com/live.php?token=K9R7fXZjABJKZhIWlXr43oY6qca6jjVn';
