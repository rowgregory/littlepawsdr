import { Activity, CheckCircle, Clock } from 'lucide-react';

export const getStatusIcon = (status: string, isLive: boolean) => {
  if (isLive) {
    return <div className='w-2 h-2 bg-red-500 rounded-full animate-pulse' />;
  }
  switch (status) {
    case 'Pre-Campaign':
      return <Clock className='w-4 h-4' />;
    case 'Active':
      return <Activity className='w-4 h-4' />;
    case 'Post-Campaign':
      return <CheckCircle className='w-4 h-4' />;
    default:
      return <Clock className='w-4 h-4' />;
  }
};

export const getStatusColor = (status: string, isLive: boolean) => {
  if (isLive) {
    return 'bg-red-50 text-red-700 border-red-200 ring-2 ring-red-200';
  }
  switch (status) {
    case 'Pre-Campaign':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Active':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Post-Campaign':
      return 'bg-gray-100 text-gray-700 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getCardBorder = (campaign: any) => {
  if (campaign.isLive) {
    return 'border-red-200 ring-2 ring-red-100 shadow-red-100';
  }
  if (campaign.status === 'Pre-Campaign') {
    return 'border-blue-200 ring-1 ring-blue-100 shadow-blue-50';
  }
  return 'border-gray-100';
};
