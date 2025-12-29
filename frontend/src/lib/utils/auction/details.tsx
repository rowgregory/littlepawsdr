import { Bell, DollarSign, Clock } from 'lucide-react';

export const formatGoal = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

export const getNotificationIcon = (index: number) => {
  const icons = [
    <Bell className='w-5 h-5' />,
    <DollarSign className='w-5 h-5' />,
    <Clock className='w-5 h-5' />,
    <Clock className='w-5 h-5' />,
  ];
  return icons[index] || <Bell className='w-5 h-5' />;
};

export const getFrequencyStyle = (freq: string) => {
  switch (freq) {
    case 'Immediate':
      return 'bg-red-50 text-red-700';
    case '2 Days':
      return 'bg-orange-50 text-orange-700';
    case '4 Days':
      return 'bg-blue-50 text-blue-700';
    default:
      return 'bg-gray-50 text-gray-700';
  }
};
