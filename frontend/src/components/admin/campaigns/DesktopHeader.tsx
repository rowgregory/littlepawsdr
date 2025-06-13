import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FC } from 'react';

const DesktopHeader: FC<{ sortedCampaigns: any; showModal: any }> = ({ sortedCampaigns, showModal }) => {
  return (
    <motion.div
      className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex items-center space-x-4 mb-4 lg:mb-0'>
        <motion.h1
          className='text-3xl font-bold text-gray-900'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Campaigns
        </motion.h1>
        <motion.span
          className='bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3, type: 'spring' }}
        >
          {sortedCampaigns.length}
        </motion.span>
      </div>
      <motion.button
        onClick={() => showModal(true)}
        className='bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200'
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Plus className='w-5 h-5' />
        <span>New Campaign</span>
      </motion.button>
    </motion.div>
  );
};

export default DesktopHeader;
