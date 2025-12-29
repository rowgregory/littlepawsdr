import {
  Bug,
  FileText,
  Gavel,
  Heart,
  LayoutGrid,
  Lock,
  Shield,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { persistor, useAppDispatch, useUserSelector } from '../../redux/toolkitStore';
import { useLogoutMutation } from '../../redux/services/authApi';
import { hydrateUserState } from '../../redux/features/userSlice';
import { flushAuthState } from '../../redux/features/auth/authSlice';

const navGroups = (isAdmin: boolean) => [
  {
    title: 'Dashboard',
    items: [{ icon: LayoutGrid, label: 'Overview', path: '/supporter/overview' }],
  },
  {
    title: 'Activity',
    items: [
      { icon: Gavel, label: 'Auctions', path: '/supporter/auctions' },
      { icon: Heart, label: 'Donations', path: '/supporter/donations' },
      {
        icon: FileText,
        label: 'Adoption Applications',
        path: '/supporter/adoption-applications',
      },
      { icon: ShoppingBag, label: 'Orders', path: '/supporter/orders' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Profile', path: '/supporter/profile' },
      { icon: Lock, label: 'Security', path: '/supporter/security' },
    ],
  },
  ...(isAdmin
    ? [
        {
          title: 'Admin',
          items: [{ icon: Shield, label: 'Admin Dashboard', path: '/admin/dashboard' }],
        },
      ]
    : []),
  {
    title: 'Support',
    items: [{ icon: Bug, label: 'Report a Bug', path: '/supporter/report-bug' }],
  },
];

const SupporterSidebar = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();
  const { user } = useUserSelector();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await logout({ _id: user?._id }).unwrap();

    persistor.pause();
    persistor.flush().then(async () => await persistor.purge());
    dispatch(hydrateUserState({}));
    dispatch(flushAuthState());
    navigate('/auth/login');
  };

  return (
    <aside className='w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto flex flex-col'>
      <div className='p-6 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <Link to='/' className='text-lg font-bold text-gray-900'>
            Supporter Dashboard
          </Link>
          {onClose && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className='lg:hidden p-2 hover:bg-gray-100 rounded-lg'
            >
              <X className='w-5 h-5 text-gray-900' />
            </motion.button>
          )}
        </div>
      </div>

      <nav className='space-y-6 px-6 py-6 flex-1 pb-60'>
        {navGroups(user?.isAdmin || false).map((group) => (
          <div key={group.title}>
            <h3 className='text-xs font-semibold text-gray-500 uppercase mb-3 px-3'>
              {group.title}
            </h3>
            <div className='space-y-1'>
              {group.items.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleNavClick}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                      isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className='w-4 h-4' />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      {/* Fixed Footer - User Section */}
      {user?._id && (
        <motion.div
          className='fixed bottom-0 left-0 w-64 border-t border-r border-gray-200 bg-white px-4 py-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className='mb-4'>
            <p className='text-xs text-gray-500 uppercase tracking-wider font-semibold'>
              Signed in as
            </p>
            <p className='text-sm font-semibold text-gray-900 mt-1'>
              {user.firstName} {user.lastName}
            </p>
            <p className='text-xs text-gray-600 truncate'>{user.email}</p>
          </div>
          <motion.button
            type='button'
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg font-medium text-sm transition-colors border border-red-200 hover:border-red-300'
          >
            Logout
          </motion.button>
        </motion.div>
      )}
    </aside>
  );
};

export default SupporterSidebar;
