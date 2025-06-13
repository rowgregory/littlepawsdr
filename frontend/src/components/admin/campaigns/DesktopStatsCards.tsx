import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Users } from 'lucide-react';
import { FC } from 'react';

const DesktopStatsCards: FC<{ totalRaised: number; totalSupporters: number; activeCampaigns: any }> = ({
  totalRaised,
  totalSupporters,
  activeCampaigns,
}) => (
  <motion.div
    className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.5 }}
  >
    <motion.div
      className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'
      whileHover={{ y: -5 }}
    >
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-gray-600 text-sm font-medium'>Total Raised</p>
          <p className='text-3xl font-bold text-gray-900'>${totalRaised.toLocaleString()}</p>
        </div>
        <div className='bg-green-100 p-3 rounded-xl'>
          <DollarSign className='w-6 h-6 text-green-600' />
        </div>
      </div>
    </motion.div>

    <motion.div
      className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'
      whileHover={{ y: -5 }}
      transition={{ delay: 0.1 }}
    >
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-gray-600 text-sm font-medium'>Total Supporters</p>
          <p className='text-3xl font-bold text-gray-900'>{totalSupporters.toLocaleString()}</p>
        </div>
        <div className='bg-blue-100 p-3 rounded-xl'>
          <Users className='w-6 h-6 text-blue-600' />
        </div>
      </div>
    </motion.div>

    <motion.div
      className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300'
      whileHover={{ y: -5 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-gray-600 text-sm font-medium'>Active Campaigns</p>
          <p className='text-3xl font-bold text-gray-900'>{activeCampaigns}</p>
        </div>
        <div className='bg-purple-100 p-3 rounded-xl'>
          <TrendingUp className='w-6 h-6 text-purple-600' />
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default DesktopStatsCards;
