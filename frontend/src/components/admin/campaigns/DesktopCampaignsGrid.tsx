import { AnimatePresence, motion } from 'framer-motion';
import { Clock, DollarSign, Eye, MoreVertical, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCardBorder, getStatusColor, getStatusIcon } from '../../../utils/campaign-utils/campaigns-dashboard';

const DesktopCampaignsGrid = ({ filteredCampaigns }: any) => {
  const [hoveredCard, setHoveredCard] = useState(null) as any;
  return (
    <motion.div
      className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <AnimatePresence>
        {filteredCampaigns.map((campaign: any, index: number) => (
          <motion.div
            key={campaign.id}
            className={`bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer ${getCardBorder(
              campaign
            )}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onHoverStart={() => setHoveredCard(campaign.id)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            {/* Live/Priority Banner */}
            {campaign.isLive && (
              <div className='bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 text-sm font-medium flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
                  <span>LIVE AUCTION</span>
                </div>
                {campaign.timeLeft && <span className='bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs'>{campaign.timeLeft}</span>}
              </div>
            )}
            {campaign.status === 'Pre-Campaign' && campaign.timeLeft && (
              <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 text-sm font-medium flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Clock className='w-4 h-4' />
                  <span>UPCOMING</span>
                </div>
                <span className='bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs'>{campaign.timeLeft}</span>
              </div>
            )}
            {campaign.status === 'Post-Campaign' && (
              <div className='bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 text-sm font-medium flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <span>CLOSED</span>
                </div>
                <span className='bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs'>{campaign.timeLeft}</span>
              </div>
            )}

            <div className='p-6'>
              {/* Header */}
              <div className='flex items-start justify-between mb-4'>
                <div className='flex-1'>
                  <div className='flex items-center space-x-2 mb-2'>
                    {campaign.isLive && (
                      <div className='flex items-center space-x-1 text-red-600'>
                        <div className='w-2 h-2 bg-red-500 rounded-full animate-pulse'></div>
                        <span className='text-xs font-medium'>LIVE</span>
                      </div>
                    )}
                    <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>{campaign.category}</span>
                    <span className='text-xs text-gray-500'>{new Date(campaign.startDate).toLocaleDateString()}</span>
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2 line-clamp-2'>{campaign.title}</h3>
                </div>
                <motion.div className='relative' whileHover={{ scale: 1.1 }}>
                  <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
                    <MoreVertical className='w-4 h-4 text-gray-400' />
                  </button>
                  <AnimatePresence>
                    {hoveredCard === campaign.id && (
                      <motion.div
                        className='absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-[120px]'
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          to={`/admin/campaigns/${campaign.id}/details`}
                          className='flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left'
                        >
                          <Eye className='w-4 h-4' />
                          <span>View</span>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Status Badge */}
              <div
                className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border mb-4 ${getStatusColor(
                  campaign.status,
                  campaign.isLive
                )}`}
              >
                {getStatusIcon(campaign.status, campaign.isLive)}
                <span>{campaign.isLive ? 'LIVE' : campaign.status}</span>
              </div>

              {/* Progress Bar */}
              {campaign.progress !== undefined && (
                <div className='mb-4'>
                  <div className='flex items-center justify-between text-sm text-gray-600 mb-2'>
                    <span>Progress</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
                    <motion.div
                      className={`h-2 rounded-full ${
                        campaign.isLive ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${campaign.progress}%` }}
                      transition={{ delay: index * 0.1 + 1, duration: 1 }}
                    />
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='text-center p-3 bg-gray-50 rounded-xl'>
                  <div className='flex items-center justify-center mb-1'>
                    <Users className='w-4 h-4 text-blue-600 mr-1' />
                  </div>
                  <p className='text-xl font-bold text-gray-900'>{campaign.supporters}</p>
                  <p className='text-xs text-gray-600'>Supporters</p>
                </div>
                <div className='text-center p-3 bg-gray-50 rounded-xl'>
                  <div className='flex items-center justify-center mb-1'>
                    <DollarSign className='w-4 h-4 text-green-600 mr-1' />
                  </div>
                  <p className='text-xl font-bold text-gray-900'>${campaign?.raised?.toFixed(2)}</p>
                  <p className='text-xs text-gray-600'>Raised</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <motion.div
              className='px-6 py-4 bg-gray-50 border-t border-gray-100'
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredCard === campaign.id ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>
                  {campaign.isLive
                    ? `Ends: ${new Date(campaign.endDate).toLocaleDateString()}`
                    : `Last updated: ${new Date(campaign.startDate).toLocaleDateString()}`}
                </span>
                <motion.div className='text-blue-600 hover:text-blue-700 text-sm font-medium' whileHover={{ scale: 1.05 }}>
                  <Link to={`/admin/campaigns/${campaign.id}/details`}>View Details →</Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default DesktopCampaignsGrid;
