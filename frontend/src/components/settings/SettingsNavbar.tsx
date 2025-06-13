import { Link, useParams } from 'react-router-dom';
import { Package, Settings, Shield, User } from 'lucide-react';

const tabs = (params: any) => [
  { id: 'profile', label: 'Profile', icon: User, linkKey: '/settings/profile', active: params['*'] === 'profile' },
  { id: 'security', label: 'Security', icon: Shield, linkKey: '/settings/security', active: params['*'] === 'security' },
  {
    id: 'campaign',
    label: 'Campaign',
    icon: Settings,
    linkKey: '/settings/campaign/settings',
    active:
      params['*'] === 'campaign/settings' ||
      params['*'] === 'campaign/bids' ||
      params['*'] === 'campaign/winning-bids' ||
      params['*'] === 'campaign/instant-buys',
  },
  {
    id: 'purchases',
    label: 'Digital Goods',
    icon: Package,
    linkKey: '/settings/digital-goods-and-merch/adoption-application-fees',
    active:
      params['*'] === 'digital-goods-and-merch/adoption-application-fees' ||
      params['*'] === 'digital-goods-and-merch/donations' ||
      params['*'] === 'digital-goods-and-merch/purchases',
  },
];

const SettingsNavbar = () => {
  const params = useParams();

  return (
    <div className='bg-white max-w-4xl mx-auto rounded-2xl shadow-lg border border-gray-100 mb-8 overflow-hidden'>
      <div className='flex overflow-x-auto'>
        {tabs(params).map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              to={tab.linkKey}
              key={tab.id}
              className={`flex items-center space-x-3 px-8 py-4 font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                tab.active ? 'text-teal-600 border-teal-600 bg-teal-50' : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className='w-5 h-5' />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsNavbar;
