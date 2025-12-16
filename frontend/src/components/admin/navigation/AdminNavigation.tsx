import { Package, Users, Gavel, Heart, Store, DollarSign, LogOut, Home, LayoutDashboard, History } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import NavigationLink from './NavigationLink';

const AdminNavigation = () => {
  const { pathname } = useLocation();

  const linkState = {
    home: pathname === '/',
    dashboard: pathname === '/admin',
    campaigns: pathname.includes('/campaigns'),
    orders: pathname.includes('/orders'),
    oneTimeDonations: pathname.includes('/one-time-donations'),
    store: pathname.includes('/store'),
    adoptionApplication: pathname.includes('/adoption-application'),
    people: pathname.includes('/contacts'),
    changelog: pathname.includes('/changelog'),
    logout: false,
  };

  const adminNavigationLinks = (link: any) => [
    {
      active: link.home,
      linkKey: '/',
      icon: <Home className='w-5 h-5' />,
      textKey: 'Home',
    },
    {
      active: link.dashboard,
      linkKey: '/admin',
      icon: <LayoutDashboard className='w-5 h-5' />,
      textKey: 'Dashboard',
    },
    {
      active: link.campaigns,
      linkKey: '/admin/campaigns',
      icon: <Gavel className='w-5 h-5' />,
      textKey: 'Campaigns',
    },
    {
      active: link.orders,
      linkKey: '/admin/orders',
      icon: <Package className='w-5 h-5' />,
      textKey: 'Orders',
    },
    {
      active: link.oneTimeDonations,
      linkKey: '/admin/one-time-donations',
      icon: <Heart className='w-5 h-5' />,
      textKey: 'Donations',
    },
    {
      active: link.store,
      linkKey: '/admin/store/ecards',
      icon: <Store className='w-5 h-5' />,
      textKey: 'Store',
    },
    {
      active: link.adoptionApplication,
      linkKey: '/admin/adoption-application/fees',
      icon: <DollarSign className='w-5 h-5' />,
      textKey: 'Adoption Application',
    },
    {
      active: link.people,
      linkKey: '/admin/contacts/users',
      icon: <Users className='w-5 h-5' />,
      textKey: 'Contacts',
    },
    {
      active: link.changelog,
      linkKey: '/admin/changelog',
      icon: <History className='w-5 h-5' />,
      textKey: 'Changelog',
    },
    {
      active: link.logout,
      linkKey: null,
      isLogout: true,
      icon: <LogOut className='w-5 h-5' />,
      textKey: 'Logout',
    },
  ];

  const navigationLinks = adminNavigationLinks(linkState);

  return (
    <div className='w-16 border-r border-gray-200 h-screen overflow-y-auto transition-all duration-300 group pt-3'>
      <div className='p-2'>
        {/* Navigation Menu */}
        <nav className='space-y-1'>
          <div className='mb-4'>
            <div className='space-y-1'>
              {navigationLinks
                .filter((link) => !link.isLogout)
                .map((link, index) => (
                  <NavigationLink key={index} link={link} />
                ))}
            </div>
          </div>

          <div className='pt-2 border-t border-gray-200'>
            <div className='space-y-1'>
              {navigationLinks
                .filter((link) => link.isLogout)
                .map((link, index) => (
                  <NavigationLink key={index} link={link} />
                ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminNavigation;
