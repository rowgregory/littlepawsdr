import { Sparkles } from 'lucide-react';
import { formatGoal } from '../../../../lib/utils/auction/details';
import { Link } from 'react-router-dom';
import { FC } from 'react';

const AuctionStats: FC<{ id: string; auction: any }> = ({ id, auction }) => {
  return (
    <div>
      <div className='flex items-center gap-3 pb-4 border-b border-gray-200 mb-4'>
        <div className='p-2 bg-gray-100 rounded-lg'>
          <Sparkles className='w-5 h-5 text-gray-700' />
        </div>
        <div>
          <h3 className='font-bold text-gray-900'>Auction Stats</h3>
          <p className='text-xs text-gray-600 mt-1'>Overview</p>
        </div>
      </div>

      {/* Stats */}
      <div className='space-y-2'>
        <div className='bg-gray-50 rounded p-2'>
          <p className='text-xs text-gray-600'>Goal</p>
          <p className='text-base font-bold text-gray-900'>{formatGoal(auction?.goal || 0)}</p>
        </div>
        <div className='bg-gray-50 rounded p-2'>
          <p className='text-xs text-gray-600'>Total Raised</p>
          <p className='text-base font-bold text-gray-900'>
            {formatGoal(auction?.totalAuctionRevenue || 0)}
          </p>
        </div>
        <div className='bg-gray-50 rounded p-2'>
          <p className='text-xs text-gray-600'>Supporters</p>
          <p className='text-base font-bold text-gray-900'>{auction?.supporters || 0}</p>
        </div>
      </div>

      {/* Items Link */}
      <Link
        to={`/admin/auctions/${id}/items`}
        className='block w-full text-center px-4 py-2 mt-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors text-sm'
      >
        Manage Items ({auction?.items?.length || 0})
      </Link>
    </div>
  );
};

export default AuctionStats;
