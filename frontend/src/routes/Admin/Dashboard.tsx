import {
  Heart,
  ShoppingBag,
  Gavel,
  FileText,
  Gift,
  Users,
  Mail,
  TrendingUp,
  TrendingDown,
  Eye,
  Hammer,
  CreditCard,
  Dog,
  ShoppingCart,
  DollarSign,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate, formatDateWithTimezone } from '../../utils/dateFunctions';
import CopyClipboardButton from '../../components/admin/dashboard/CopyClipBoardButton';
import { useFetchDashboardDataQuery } from '../../redux/services/dashboardApi';

const statConfigMap: any = {
  Orders: { icon: ShoppingBag },
  Auctions: { icon: Gavel },
  'One Time Donations': { icon: Heart },
  'Adoption Fees': { icon: FileText },
  'Welcome Wiener Orders': { icon: Gift },
  Users: { icon: Users },
  'Newsletter Subscribers': { icon: Mail },
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'approved':
    case 'shipped':
      return 'bg-green-500/15 text-green-600 dark:text-green-400';
    case 'processing':
    case 'under review':
    case 'interview scheduled':
      return 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400';
    case 'pending':
    case 'pending documents':
      return 'bg-orange-500/15 text-orange-700 dark:text-orange-400';
    default:
      return 'bg-muted-light/15 dark:bg-muted-dark/15 text-muted-light dark:text-muted-dark';
  }
};

const quickActions = [
  { linkKey: '/admin/store', label: 'Create Product', icon: ShoppingBag },
  { linkKey: '/admin/auctions', label: 'Create Auction', icon: Hammer },
  { linkKey: '/admin/store', label: 'Create Ecard', icon: CreditCard },
  { linkKey: '/admin/store', label: 'Create Welcome Wiener', icon: Dog },
  { linkKey: '/admin/donations', label: 'View Donations', icon: Heart },
  { linkKey: '/admin/orders', label: 'View Orders', icon: ShoppingCart },
  { linkKey: '/admin/adoption-fees', label: 'View Adopt Fees', icon: DollarSign },
];

const Dashboard = () => {
  const { data } = useFetchDashboardDataQuery();
  const dashboardData = data?.data;
  const recentOrders = dashboardData?.recentOrders ?? [];
  const recentApplications = dashboardData?.recentApplications ?? [];

  const enhancedStats =
    dashboardData?.stats?.map((stat: any) => {
      const config = statConfigMap[stat.title] || statConfigMap[stat.type];
      return { ...stat, icon: config?.icon };
    }) || [];

  return (
    <div className='min-h-dvh bg-bg-light dark:bg-bg-dark'>
      {/* Header */}
      <div className='h-14 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark'>
        <div className='h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3'>
          <div className='flex items-center gap-2 min-w-0'>
            <span
              className='block w-6 h-px bg-primary-light dark:bg-primary-dark shrink-0'
              aria-hidden='true'
            />
            <span className='font-mono text-[11px] uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark shrink-0'>
              Dashboard
            </span>
          </div>
          <CopyClipboardButton code={dashboardData?.bypassCode} />
        </div>
      </div>

      <div className='px-4 sm:px-6 lg:px-8 py-6'>
        {/* Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          {enhancedStats.map((stat: any, index: number) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title || index}
                className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-5'
              >
                <div className='flex items-center justify-between mb-4'>
                  <div className='w-10 h-10 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark flex items-center justify-center'>
                    {Icon && (
                      <Icon
                        className='w-5 h-5 text-primary-light dark:text-primary-dark'
                        aria-hidden='true'
                      />
                    )}
                  </div>
                  {stat.change && (
                    <div
                      className={`flex items-center gap-1 font-mono text-[11px] ${
                        stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-500'
                      }`}
                    >
                      {stat.trend === 'up' ? (
                        <TrendingUp className='w-3.5 h-3.5' aria-hidden='true' />
                      ) : (
                        <TrendingDown className='w-3.5 h-3.5' aria-hidden='true' />
                      )}
                      {stat.change}
                    </div>
                  )}
                </div>
                <h3 className='text-2xl font-bold text-text-light dark:text-text-dark tabular-nums'>
                  {stat.value}
                </h3>
                <p className='font-mono text-[11px] uppercase tracking-wide text-muted-light dark:text-muted-dark mt-1'>
                  {stat.title}
                </p>
                {stat.amount && (
                  <p className='text-base font-semibold text-primary-light dark:text-primary-dark mt-1 tabular-nums'>
                    {stat.amount}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Main grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Recent Orders */}
          <div className='lg:col-span-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark'>
            <div className='px-5 py-4 border-b border-border-light dark:border-border-dark flex items-center justify-between'>
              <h2 className='font-bold text-text-light dark:text-text-dark'>Recent Orders</h2>
              <Link
                to='/admin/orders'
                className='font-mono text-[11px] uppercase tracking-wide text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark'
              >
                View all
              </Link>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-bg-light dark:bg-bg-dark'>
                  <tr>
                    {['Order', 'Customer', 'Type', 'Amount', 'Status', 'View'].map((h) => (
                      <th
                        key={h}
                        className='px-5 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-light dark:text-muted-dark'
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='divide-y divide-border-light dark:divide-border-dark'>
                  {recentOrders.map((order: any, index: number) => (
                    <tr key={order.id || index} className='hover:bg-bg-light dark:hover:bg-bg-dark'>
                      <td className='px-5 py-3 whitespace-nowrap'>
                        <div className='font-medium text-text-light dark:text-text-dark tabular-nums'>
                          #{order.id?.slice(-5)}
                        </div>
                        <div className='text-[11px] text-muted-light dark:text-muted-dark'>
                          {formatDateWithTimezone(order.date)}
                        </div>
                      </td>
                      <td className='px-5 py-3 whitespace-nowrap text-sm text-text-light dark:text-text-dark'>
                        {order.customer}
                      </td>
                      <td className='px-5 py-3 whitespace-nowrap text-sm text-muted-light dark:text-muted-dark'>
                        {order.type}
                      </td>
                      <td className='px-5 py-3 whitespace-nowrap text-sm font-medium text-text-light dark:text-text-dark tabular-nums'>
                        {order.amount}
                      </td>
                      <td className='px-5 py-3 whitespace-nowrap'>
                        <span
                          className={`inline-flex px-2 py-1 font-mono text-[10px] uppercase tracking-wide ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className='px-5 py-3 whitespace-nowrap'>
                        <Link
                          to={`/admin/orders?orderId=${order.id}`}
                          aria-label={`View order #${order.id?.slice(-5)}`}
                          className='inline-flex text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark'
                        >
                          <Eye className='w-4 h-4' aria-hidden='true' />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Applications */}
          <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark'>
            <div className='px-5 py-4 border-b border-border-light dark:border-border-dark flex items-center justify-between'>
              <h2 className='font-bold text-text-light dark:text-text-dark'>Recent Applications</h2>
              <Link
                to='/admin/adoption-application/fees'
                className='font-mono text-[11px] uppercase tracking-wide text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark'
              >
                View all
              </Link>
            </div>
            <div className='p-5 space-y-3'>
              {recentApplications.map((app: any, index: number) => (
                <div
                  key={app.id || index}
                  className='border border-border-light dark:border-border-dark p-3'
                >
                  <div className='flex items-start justify-between mb-2 gap-2'>
                    <div className='font-medium text-text-light dark:text-text-dark text-sm'>
                      {app.id}
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 font-mono text-[10px] uppercase tracking-wide shrink-0 ${getStatusColor(app.state)}`}
                    >
                      {app.state}
                    </span>
                  </div>
                  <div className='text-sm text-muted-light dark:text-muted-dark'>
                    {app.applicant}
                  </div>
                  <div className='text-sm text-muted-light dark:text-muted-dark'>{app.dog}</div>
                  <div className='text-[11px] text-muted-light dark:text-muted-dark/70 mt-1'>
                    {formatDate(app.date)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='mt-8'>
          <h2 className='font-mono text-[11px] uppercase tracking-[0.2em] text-primary-light dark:text-primary-dark mb-4'>
            Quick Actions
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3'>
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  to={action.linkKey}
                  key={action.linkKey}
                  className='group flex flex-col items-center justify-center text-center p-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark'
                >
                  <Icon
                    className='w-6 h-6 text-primary-light dark:text-primary-dark mb-2 group-hover:scale-110 transition-transform motion-reduce:transform-none'
                    aria-hidden='true'
                  />
                  <div className='font-mono text-[11px] uppercase tracking-wide text-text-light dark:text-text-dark'>
                    {action.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
