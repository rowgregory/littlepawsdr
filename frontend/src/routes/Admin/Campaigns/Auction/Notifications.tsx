import React, { useState } from 'react';
import { CheckCircle, Mail, Clock, DollarSign, Bell } from 'lucide-react';

const BidderNotifications = () => {
  // Mock data - replace with your actual data
  const auctionNotificationsData = [
    { textKey: 'Out Bid', freq: 'Immediate' },
    { textKey: 'First Payment Reminder', freq: 'Immediate' },
    { textKey: 'Second Payment Reminder', freq: '2 Days' },
    { textKey: 'Third Payment Reminder', freq: '4 Days' },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getNotificationIcon = (index: number) => {
    const icons = [<Bell className='w-5 h-5' />, <DollarSign className='w-5 h-5' />, <Clock className='w-5 h-5' />, <Clock className='w-5 h-5' />];
    return icons[index] || <Bell className='w-5 h-5' />;
  };

  const getIconColor = (index: number) => {
    const colors = ['text-red-600', 'text-blue-600', 'text-orange-600', 'text-purple-600'];
    return colors[index] || 'text-gray-600';
  };

  const getFrequencyStyle = (freq: string) => {
    switch (freq) {
      case 'Immediate':
        return 'bg-red-50 text-red-700 border border-red-200';
      case '2 Days':
        return 'bg-orange-50 text-orange-700 border border-orange-200';
      case '4 Days':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  return (
    <div className='p-6 rounded-2xl border border-gray-200 shadow-lg w-full bg-white'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-semibold text-gray-900 mb-2'>Bidder notifications</h1>
        <p className='text-gray-600'>Information sent to bidders regarding your auction.</p>
      </div>

      {/* Email Header */}
      <div className='border-b border-gray-100 pb-4 mb-6'>
        <div className='flex justify-end'>
          <div className='flex items-center gap-2 text-gray-600 font-medium'>
            <Mail className='w-4 h-4' />
            Email
          </div>
        </div>
      </div>

      {/* Notification Items */}
      <div className='space-y-4'>
        {auctionNotificationsData.map((obj: any, i: number) => (
          <div
            key={i}
            className={`flex items-center justify-between p-4 rounded-lg border border-gray-100 transition-all duration-200 hover:border-gray-200 hover:shadow-sm ${
              hoveredIndex === i ? 'bg-gray-50' : 'bg-white'
            }`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Notification Info */}
            <div className='flex items-center gap-4 flex-1'>
              <div className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center ${getIconColor(i)}`}>{getNotificationIcon(i)}</div>
              <div>
                <h3 className='font-medium text-gray-900'>{obj.textKey}</h3>
                <p className='text-sm text-gray-500'>
                  {i === 0 && 'Notify bidders when they have been outbid'}
                  {i === 1 && 'Initial payment reminder after auction ends'}
                  {i === 2 && 'Follow-up payment reminder'}
                  {i === 3 && 'Final payment reminder before escalation'}
                </p>
              </div>
            </div>

            {/* Frequency */}
            <div className='flex items-center gap-4'>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getFrequencyStyle(obj.freq)}`}>{obj.freq}</div>

              {/* Status Check */}
              <div className='flex items-center justify-center'>
                <CheckCircle className='w-5 h-5 text-green-600' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BidderNotifications;
