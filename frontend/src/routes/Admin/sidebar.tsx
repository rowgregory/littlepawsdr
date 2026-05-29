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
  Inbox,
  X,
  User,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();

  const adminNavGroups = [
    {
      title: 'Dashboard',
      items: [
        { icon: Home, label: 'Home', path: '/' },
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
      ],
    },
    {
      title: 'Management',
      items: [
        { icon: Gavel, label: 'Auctions', path: '/admin/auctions' },
        { icon: Package, label: 'Orders', path: '/admin/orders' },
        { icon: Heart, label: 'Donations', path: '/admin/donations' },
        { icon: Store, label: 'Store', path: '/admin/store' },
      ],
    },
    {
      title: 'Operations',
      items: [
        { icon: DollarSign, label: 'Adoption Fees', path: '/admin/adoption-fees' },
        { icon: Users, label: 'Contacts', path: '/admin/users' },
        { icon: Inbox, label: 'Newsletter', path: '/admin/newsletters' },
      ],
    },
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile', path: '/supporter/profile' },
        { icon: LogOut, label: 'Logout', path: null, isLogout: true },
      ],
    },
  ];

  const handleNavClick = () => onClose?.();

  return (
    <aside className='w-56 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark h-screen overflow-y-auto flex flex-col'>
      {/* Header */}
      <div className='h-14 flex items-center justify-between px-4 border-b border-border-light dark:border-border-dark shrink-0'>
        <Link
          to='/'
          className='font-mono text-xs uppercase tracking-[0.15em] text-text-light dark:text-text-dark'
        >
          Little Paws
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            aria-label='Close menu'
            className='lg:hidden p-1.5 text-text-light dark:text-text-dark hover:bg-bg-light dark:hover:bg-bg-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
          >
            <X className='w-4 h-4' aria-hidden='true' />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className='flex-1 px-2 py-3 space-y-4'>
        {adminNavGroups.map((group) => (
          <div key={group.title}>
            <h3 className='font-mono text-[10px] uppercase tracking-[0.15em] text-muted-light dark:text-muted-dark mb-1.5 px-2'>
              {group.title}
            </h3>
            <div className='space-y-0.5'>
              {group.items.map((item) => {
                const IconComponent = item.icon;
                const isActive =
                  !!item.path && item.path !== '/' && location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.label}
                    to={item.path || ''}
                    onClick={handleNavClick}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center gap-2.5 px-2 py-1.5 text-[13px] transition-colors ${
                      isActive
                        ? 'bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark'
                        : 'text-muted-light dark:text-muted-dark hover:bg-bg-light dark:hover:bg-bg-dark hover:text-text-light dark:hover:text-text-dark'
                    }`}
                  >
                    <IconComponent className='w-4 h-4 shrink-0' aria-hidden='true' />
                    <span className='truncate'>{item.label}</span>
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
