import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Users, Gavel, Heart, Store, DollarSign, LogOut, Home, LayoutDashboard, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { persistor, RootState, useAppDispatch, useAppSelector } from '../redux/toolkitStore';
import { useLogoutMutation } from '../redux/services/authApi';
import { hydrateUserState } from '../redux/features/user/userSlice';

interface NavigationLinkProps {
  link: {
    active: boolean;
    linkKey: string | null;
    icon: React.ReactNode;
    textKey: string;
    isLogout?: boolean;
  };
  onLogout?: any;
  onNavigate?: (path: string) => void;
  onClose: () => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ link, onLogout, onNavigate, onClose }) => {
  const handleClick = () => {
    if (link.isLogout && onLogout) {
      onLogout();
    } else if (link.linkKey && onNavigate) {
      onNavigate(link.linkKey);
    }
    onClose(); // Close drawer after navigation
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`
        flex items-center px-4 py-3 text-base font-medium rounded-lg cursor-pointer transition-all duration-200 mx-3
        ${link.active ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-500' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
        ${link.isLogout ? 'text-red-600 hover:bg-red-50 hover:text-red-700' : ''}
      `}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className='flex-shrink-0 mr-4'>{link.icon}</div>
      <span className='font-medium'>{link.textKey}</span>
    </motion.div>
  );
};

interface AdminMobileNavigationDrawerProps {
  isOpen: boolean;
  onClose: any;
  currentPath?: string;
}

const AdminMobileNavigationDrawer: React.FC<AdminMobileNavigationDrawerProps> = ({ isOpen, onClose, currentPath = '/admin' }) => {
  const linkState = {
    home: currentPath === '/',
    dashboard: currentPath === '/admin',
    campaigns: currentPath.includes('/campaigns'),
    orders: currentPath.includes('/orders'),
    oneTimeDonations: currentPath.includes('/one-time-donations'),
    store: currentPath.includes('/store'),
    adoptionApplication: currentPath.includes('/adoption-application'),
    people: currentPath.includes('/contacts'),
    logout: false,
  };

  const adminNavigationLinks = (link: any) => [
    {
      active: link.home,
      linkKey: '/',
      icon: <Home className='w-6 h-6' />,
      textKey: 'Home',
    },
    {
      active: link.dashboard,
      linkKey: '/admin',
      icon: <LayoutDashboard className='w-6 h-6' />,
      textKey: 'Dashboard',
    },
    {
      active: link.campaigns,
      linkKey: '/admin/campaigns',
      icon: <Gavel className='w-6 h-6' />,
      textKey: 'Campaigns',
    },
    {
      active: link.orders,
      linkKey: '/admin/orders',
      icon: <Package className='w-6 h-6' />,
      textKey: 'Orders',
    },
    {
      active: link.oneTimeDonations,
      linkKey: '/admin/one-time-donations',
      icon: <Heart className='w-6 h-6' />,
      textKey: 'Donations',
    },
    {
      active: link.store,
      linkKey: '/admin/store/ecards',
      icon: <Store className='w-6 h-6' />,
      textKey: 'Store',
    },
    {
      active: link.adoptionApplication,
      linkKey: '/admin/adoption-application/fees',
      icon: <DollarSign className='w-6 h-6' />,
      textKey: 'Adoption Fees',
    },
    {
      active: link.people,
      linkKey: '/admin/contacts/users',
      icon: <Users className='w-6 h-6' />,
      textKey: 'Contacts',
    },
    {
      active: link.logout,
      linkKey: null,
      isLogout: true,
      icon: <LogOut className='w-6 h-6' />,
      textKey: 'Logout',
    },
  ];

  const navigationLinks = adminNavigationLinks(linkState);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { user } = useAppSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    try {
      const { loggedOut } = await logout({ _id: user?._id }).unwrap();

      if (loggedOut) {
        onClose();
        persistor.pause();
        persistor.flush().then(async () => await persistor.purge());
        dispatch(hydrateUserState({}));
        navigate('/auth/login');
      }
    } catch {}
  };
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {/* Black Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed inset-0 bg-black/50 z-40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col'
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <motion.div
              className='p-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center'>
                    <Heart className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h2 className='text-lg font-bold'>Little Paws Rescue</h2>
                    <p className='text-teal-100 text-sm'>Admin Dashboard</p>
                  </div>
                </div>

                <motion.button
                  onClick={onClose}
                  className='p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className='w-5 h-5' />
                </motion.button>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <div className='flex-1 py-6 overflow-y-auto'>
              <nav className='space-y-2'>
                {navigationLinks
                  .filter((link) => !link.isLogout)
                  .map((link, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    >
                      <NavigationLink link={link} onLogout={handleLogout} onNavigate={handleNavigate} onClose={onClose} />
                    </motion.div>
                  ))}
              </nav>
            </div>

            {/* Logout Section */}
            <div className='border-t border-gray-200 p-4'>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
                {navigationLinks
                  .filter((link) => link.isLogout)
                  .map((link, index) => (
                    <NavigationLink key={index} link={link} onLogout={handleLogout} onNavigate={handleNavigate} onClose={onClose} />
                  ))}
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              className='p-4 bg-gray-50 border-t border-gray-200'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className='text-center'>
                <p className='text-xs text-gray-500 mb-1'>Helping dachshunds find loving homes</p>
                <div className='flex items-center justify-center space-x-1'>
                  <Heart className='w-3 h-3 text-red-400' />
                  <p className='text-xs font-medium text-teal-600'>Since 2013</p>
                  <Heart className='w-3 h-3 text-red-400' />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminMobileNavigationDrawer;
