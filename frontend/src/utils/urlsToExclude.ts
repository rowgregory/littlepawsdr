const urlsToExclude = (pathname: string) =>
  [
    'admin',
    'login',
    'forgot-password',
    'register',
    'place-order',
    'cart',
    'order',
    'reset',
    'email-confirmation',
    '404',
    'auction',
    'campaigns',
  ].some((a: string) => pathname?.includes(a));

export default urlsToExclude;
