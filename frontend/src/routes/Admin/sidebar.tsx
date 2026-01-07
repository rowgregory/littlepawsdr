import {
  Package,
  Users,
  Gavel,
  Heart,
  Store,
  DollarSign,
  LogOut,
  Home,
  LayoutDashboard,
  History,
  Inbox,
  Bug,
  X,
  User,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminSidebar = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();

  const adminNavGroups = [
    {
      title: 'Dashboard',
      items: [
        {
          icon: Home,
          label: 'Home',
          path: '/',
        },
        {
          icon: LayoutDashboard,
          label: 'Dashboard',
          path: '/admin/dashboard',
        },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          icon: Gavel,
          label: 'Auctions',
          path: '/admin/auctions',
        },
        {
          icon: Package,
          label: 'Orders',
          path: '/admin/orders',
        },
        {
          icon: Heart,
          label: 'Donations',
          path: '/admin/donations',
        },
        {
          icon: Store,
          label: 'Store',
          path: '/admin/store',
        },
      ],
    },
    {
      title: 'Operations',
      items: [
        {
          icon: DollarSign,
          label: 'Adoption Application Fees',
          path: '/admin/adoption-fees',
        },
        {
          icon: Users,
          label: 'Contacts',
          path: '/admin/users',
        },
        {
          icon: Inbox,
          label: 'Newsletter',
          path: '/admin/newsletters',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: Bug,
          label: 'Bug Reports',
          path: '/admin/bugs',
        },
        {
          icon: History,
          label: 'Changelog',
          path: '/admin/changelog',
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile',
          path: '/supporter/profile',
        },
        {
          icon: LogOut,
          label: 'Logout',
          path: null,
          isLogout: true,
        },
      ],
    },
  ];

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className='w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto flex flex-col'>
      <div className='border-b border-gray-200'>
        <div className='h-[86px] flex items-center justify-between px-6'>
          <Link to='/' className='text-lg font-bold text-gray-900'>
            Admin Dashboard
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

      <nav className='space-y-6 px-6 py-6 flex-1'>
        {adminNavGroups.map((group) => (
          <div key={group.title}>
            <h3 className='text-xs font-semibold text-gray-500 uppercase mb-3 px-3'>
              {group.title}
            </h3>
            <div className='space-y-1'>
              {group.items.map((item) => {
                const IconComponent = item.icon;
                const isActive = item.path && location.pathname.includes(item.path.split('/')[2]);
                return (
                  <Link
                    key={item.path}
                    to={item.path || ''}
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
    </aside>
  );
};

export default AdminSidebar;
