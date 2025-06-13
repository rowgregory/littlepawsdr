import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Users } from 'lucide-react';
import { FC } from 'react';

const MobileStats: FC<{ totalRaised: number; totalSupporters: number; activeCampaigns: any }> = ({
  totalRaised,
  totalSupporters,
  activeCampaigns,
}) => {
  return (
    <div className='px-4 py-6'>
      <div className='flex space-x-4 overflow-x-auto scrollbar-hide pb-2'>
        <motion.div
          className='bg-white rounded-xl p-4 shadow-lg border border-gray-100 min-w-[140px] flex-shrink-0'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className='flex items-center justify-between mb-2'>
            <DollarSign className='w-5 h-5 text-green-600' />
          </div>
          <p className='text-lg font-bold text-gray-900'>${totalRaised.toLocaleString()}</p>
          <p className='text-xs text-gray-600'>Total Raised</p>
        </motion.div>

        <motion.div
          className='bg-white rounded-xl p-4 shadow-lg border border-gray-100 min-w-[140px] flex-shrink-0'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className='flex items-center justify-between mb-2'>
            <Users className='w-5 h-5 text-blue-600' />
          </div>
          <p className='text-lg font-bold text-gray-900'>{totalSupporters}</p>
          <p className='text-xs text-gray-600'>Supporters</p>
        </motion.div>

        <motion.div
          className='bg-white rounded-xl p-4 shadow-lg border border-gray-100 min-w-[140px] flex-shrink-0'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className='flex items-center justify-between mb-2'>
            <TrendingUp className='w-5 h-5 text-purple-600' />
          </div>
          <p className='text-lg font-bold text-gray-900'>{activeCampaigns}</p>
          <p className='text-xs text-gray-600'>Active</p>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileStats;
