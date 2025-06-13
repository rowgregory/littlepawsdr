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
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import CopyClipboardButton from '../../components/admin/dashboard/CopyClipBoardButton';

const statConfigMap: any = {
  Orders: {
    icon: ShoppingBag,
    color: 'bg-blue-500',
  },
  Auctions: {
    icon: Gavel,
    color: 'bg-purple-500',
  },
  'One Time Donations': {
    icon: Heart,
    color: 'bg-red-500',
  },
  'Adoption Fees': {
    icon: FileText,
    color: 'bg-green-500',
  },
  'Welcome Wiener Orders': {
    icon: Gift,
    color: 'bg-orange-500',
  },
  Users: {
    icon: Users,
    color: 'bg-indigo-500',
  },
  'Newsletter Subscribers': {
    icon: Mail,
    color: 'bg-pink-500',
  },
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'approved':
    case 'shipped':
      return 'bg-green-100 text-green-800';
    case 'processing':
    case 'under review':
    case 'interview scheduled':
      return 'bg-yellow-100 text-yellow-800';
    case 'pending':
    case 'pending documents':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Dashboard = ({ data }: any) => {
  const dashboardData = data?.data;
  const recentOrders = dashboardData?.recentOrders;

  const enhancedStats =
    dashboardData?.stats?.map((stat: any) => {
      const config = statConfigMap[stat.title] || statConfigMap[stat.type];

      return {
        ...stat,
        icon: config?.icon,
        color: config?.color,
      };
    }) || [];

  return (
    <div className='min-h-dvh'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200'>
        <div className='px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-y-3 lg:gap-y-0'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center'>
                <Heart className='w-6 h-6 text-white' />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>Little Paws Dachshund Rescue</h1>
                <p className='text-sm text-gray-600'>Dashboard Overview</p>
              </div>
            </div>
            <CopyClipboardButton code={dashboardData?.bypassCode} />
          </div>
        </div>
      </div>

      <div className='px-4 sm:px-6 lg:px-8 py-6'>
        {/* Stats Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {enhancedStats.map((stat: any, index: number) => {
            const Icon = stat.icon;
            return (
              <div key={index} className='bg-white rounded-lg border border-gray-200 p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className='w-6 h-6 text-white' />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? <TrendingUp className='w-4 h-4' /> : <TrendingDown className='w-4 h-4' />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-1'>{stat.value}</h3>
                  <p className='text-sm text-gray-600 mb-1'>{stat.title}</p>
                  {stat.amount && <p className='text-lg font-semibold text-green-600'>{stat.amount}</p>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Recent Orders */}
          <div className='lg:col-span-2 bg-white rounded-lg border border-gray-200'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold text-gray-900'>Recent Orders</h2>
                <Link to='/admin/orders' className='text-blue-600 hover:text-blue-700 text-sm font-medium'>
                  View all
                </Link>
              </div>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Order</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Customer</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>View</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {recentOrders?.map((order: any, index: number) => (
                    <tr key={index} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='font-medium text-gray-900'>#{order.id?.slice(-5)}</div>
                        <div className='text-[13px] text-gray-500'>{formatDateWithTimezone(order.date)}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{order.customer}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{order.type}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{order.amount}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        <div className='flex items-center justify-center gap-2'>
                          <Link to={`/admin/orders?orderId=${order.id}`} className='text-blue-600 hover:text-blue-700'>
                            <Eye className='w-4 h-4' />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Adoption Applications */}
          <div className='bg-white rounded-lg border border-gray-200'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold text-gray-900'>Recent Applications</h2>
                <Link to='/admin/adoption-application/fees' className='text-blue-600 hover:text-blue-700 text-sm font-medium'>
                  View all
                </Link>
              </div>
            </div>
            <div className='p-6'>
              <div className='space-y-4'>
                {data?.data?.recentApplications.map((app: any, index: number) => (
                  <div key={index} className='border border-gray-200 rounded-lg p-4'>
                    <div className='flex items-start justify-between mb-2'>
                      <div className='font-medium text-gray-900'>{app.id}</div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.state)}`}>{app.state}</span>
                    </div>
                    <div className='text-sm text-gray-600 mb-1'>{app.applicant}</div>
                    <div className='text-sm text-gray-500 mb-2'>{app.dog}</div>
                    <div className='text-xs text-gray-400'>{app.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='mt-8'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>Quick Actions</h2>
          <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4'>
            {[
              { linkKey: '/admin/store/products/create', label: 'Create Product', icon: ShoppingBag, color: 'bg-blue-500' },
              { linkKey: '/admin/campaigns', label: 'Create Auction', icon: Hammer, color: 'bg-purple-500' },
              { linkKey: '/admin/store/ecards/create', label: 'Create Ecard', icon: CreditCard, color: 'bg-red-500' },
              { linkKey: '/admin/store/welcome-wieners/create', label: 'Create Welcome Wiener', icon: Dog, color: 'bg-green-500' },
              { linkKey: '/admin/one-time-donations', label: 'View Donations', icon: Heart, color: 'bg-orange-500' },
              { linkKey: '/admin/orders', label: 'View Orders', icon: ShoppingCart, color: 'bg-indigo-500' },
              { linkKey: '/admin/adoption-application/fees', label: 'View Adopt Fees', icon: DollarSign, color: 'bg-pink-500' },
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  to={action.linkKey}
                  key={index}
                  className='bg-white flex items-center justify-center flex-col border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center group'
                >
                  <div
                    className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className='w-6 h-6 text-white' />
                  </div>
                  <div className='text-sm font-medium text-gray-900'>{action.label}</div>
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
