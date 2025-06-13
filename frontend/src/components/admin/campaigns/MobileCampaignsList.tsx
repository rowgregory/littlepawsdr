import { AnimatePresence, motion } from 'framer-motion';
import { Clock, DollarSign, Eye, MoreVertical, Users } from 'lucide-react';
import { getCardBorder, getStatusColor, getStatusIcon } from '../../../utils/campaign-utils/campaigns-dashboard';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MobileCampaignsList = ({ filteredCampaigns }: any) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  return (
    <div className='px-4 pb-6'>
      <div className='space-y-4'>
        {filteredCampaigns.map((campaign: any, index: number) => (
          <motion.div
            key={campaign.id}
            className={`bg-white rounded-xl shadow-lg border overflow-hidden ${getCardBorder(campaign)}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Mobile Live/Priority Banner */}
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

            <div className='p-4'>
              {/* Mobile Card Header */}
              <div className='flex items-start justify-between mb-3'>
                <div className='flex-1 pr-2'>
                  <div className='flex items-center space-x-2 mb-1'>
                    {campaign.isLive && (
                      <div className='flex items-center space-x-1 text-red-600'>
                        <div className='w-2 h-2 bg-red-500 rounded-full animate-pulse'></div>
                        <span className='text-xs font-medium'>LIVE</span>
                      </div>
                    )}
                    <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>{campaign.category}</span>
                    <span className='text-xs text-gray-500'>
                      {new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className='text-base font-semibold text-gray-900 mb-1 line-clamp-2'>{campaign.title}</h3>
                </div>
                <button
                  className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                  onClick={() => setShowMobileMenu(showMobileMenu === campaign.id ? null : campaign.id)}
                >
                  <MoreVertical className='w-4 h-4 text-gray-400' />
                </button>
              </div>

              {/* Mobile Menu */}
              <AnimatePresence>
                {showMobileMenu === campaign.id && (
                  <motion.div
                    className='mb-3 bg-gray-50 rounded-lg p-2'
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={`/admin/campaigns/${campaign.id}/details`}
                      className='flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-md transition-colors'
                    >
                      <Eye className='w-4 h-4' />
                      <span>View</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status Badge */}
              <div
                className={`inline-flex items-center space-x-2 px-2.5 py-1 rounded-full text-xs font-medium border mb-3 ${getStatusColor(
                  campaign.status,
                  campaign.isLive
                )}`}
              >
                {getStatusIcon(campaign.status, campaign.isLive)}
                <span>{campaign.isLive ? 'LIVE' : campaign.status}</span>
              </div>

              {/* Progress Bar for Mobile */}
              {campaign.progress > 0 && (
                <div className='mb-3'>
                  <div className='flex items-center justify-between text-xs text-gray-600 mb-1'>
                    <span>Progress</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-1.5'>
                    <motion.div
                      className={`h-1.5 rounded-full ${
                        campaign.isLive ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${campaign.progress}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    />
                  </div>
                </div>
              )}

              {/* Mobile Stats */}
              <div className='grid grid-cols-2 gap-3'>
                <div className='text-center p-3 bg-gray-50 rounded-lg'>
                  <div className='flex items-center justify-center mb-1'>
                    <Users className='w-4 h-4 text-blue-600' />
                  </div>
                  <p className='text-lg font-bold text-gray-900'>{campaign.supporters}</p>
                  <p className='text-xs text-gray-600'>Supporters</p>
                </div>
                <div className='text-center p-3 bg-gray-50 rounded-lg'>
                  <div className='flex items-center justify-center mb-1'>
                    <DollarSign className='w-4 h-4 text-green-600' />
                  </div>
                  <p className='text-lg font-bold text-gray-900'>${campaign.raised.toLocaleString()}</p>
                  <p className='text-xs text-gray-600'>Raised</p>
                </div>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className='px-4 py-3 bg-gray-50 border-t border-gray-100'>
              <div className='flex items-center justify-between'>
                <span className='text-xs text-gray-600'>
                  {campaign.isLive
                    ? `Ends ${new Date(campaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                    : `Updated ${new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                </span>
                <button className='text-blue-600 hover:text-blue-700 text-xs font-medium'>View Details →</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MobileCampaignsList;
