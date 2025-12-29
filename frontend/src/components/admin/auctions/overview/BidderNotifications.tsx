import { Bell, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import auctionNotificationsData from '../../../data/auction/auction-notification-data';
import { getFrequencyStyle, getNotificationIcon } from '../../../../lib/utils/auction/details';

const BidderNotifications = () => {
  return (
    <div className='border-t border-gray-200 pt-6'>
      <div className='flex items-center gap-3 pb-4 border-b border-gray-200 mb-4'>
        <div className='p-2 bg-gray-100 rounded-lg'>
          <Bell className='w-5 h-5 text-gray-700' />
        </div>
        <div>
          <h3 className='font-bold text-gray-900'>Bidder Notifications</h3>
          <p className='text-xs text-gray-600 mt-1'>Email updates</p>
        </div>
      </div>

      {/* Notification Items */}
      <div className='space-y-3'>
        {auctionNotificationsData.map((obj: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className='p-4 bg-gray-50 rounded-lg border border-gray-200'
          >
            {/* Header: Icon + Title */}
            <div className='flex items-start gap-3 mb-3'>
              <div className='p-2 bg-gray-100 rounded-lg flex-shrink-0'>
                {getNotificationIcon(i)}
              </div>
              <div className='flex-1'>
                <h4 className='text-sm font-semibold text-gray-900'>{obj.textKey}</h4>
                <p className='text-xs text-gray-600 mt-1'>
                  {i === 0 && 'Outbid notification'}
                  {i === 1 && 'Initial reminder'}
                  {i === 2 && 'Follow-up reminder'}
                  {i === 3 && 'Final reminder'}
                </p>
              </div>
            </div>

            {/* Footer: Frequency + Status */}
            <div className='flex items-center justify-between pt-3 border-t border-gray-200'>
              <span
                className={`px-2.5 py-1 rounded text-xs font-semibold ${getFrequencyStyle(
                  obj.freq
                )}`}
              >
                {obj.freq}
              </span>
              <div className='flex items-center gap-1'>
                <span className='text-xs text-gray-600'>Active</span>
                <CheckCircle className='w-4 h-4 text-green-600' />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BidderNotifications;
