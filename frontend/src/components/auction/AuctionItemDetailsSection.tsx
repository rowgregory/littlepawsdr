import { FC } from 'react';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import { AuctionItemDetailsSectionProps } from '../../types/auction-types';

const AuctionItemDetailsSection: FC<AuctionItemDetailsSectionProps> = ({
  auction,
  auctionItem,
}) => {
  return (
    <div className='space-y-4 mb-8 text-white'>
      {/* Auction-specific fields */}
      {auctionItem?.isAuction && (
        <>
          <div className='flex justify-between items-center py-4 border-b border-white/10'>
            <span className='font-medium opacity-80'>Starting Price</span>
            <span className='font-semibold'>${auctionItem?.startingPrice}</span>
          </div>
          <div className='flex justify-between items-center py-4 border-b border-white/10'>
            <span className='font-medium opacity-80'>Bid Increment</span>
            <span className='font-semibold'>$1</span>
          </div>
          <div className='flex justify-between items-center py-4 border-b border-white/10'>
            <span className='font-medium opacity-80'>Total Bids</span>
            <span className='font-semibold'>{auctionItem?.bids?.length || 0} bids</span>
          </div>
        </>
      )}

      {/* Fixed price fields */}
      {auctionItem?.isFixed && (
        <>
          <div className='flex justify-between items-center py-4 border-b border-white/10'>
            <span className='font-medium opacity-80'>Instant Buy Price</span>
            <span className='font-semibold'>${auctionItem?.buyNowPrice}</span>
          </div>
          <div className='flex justify-between items-center py-4 border-b border-white/10'>
            <span className='font-medium opacity-80'>Items Remaining</span>
            <span className='font-semibold'>{auctionItem?.totalQuantity}</span>
          </div>
        </>
      )}

      <div className='flex justify-between items-center py-4 border-b border-white/10'>
        <span className='font-medium opacity-80'>Start Date</span>
        <span className='font-semibold text-xs'>{formatDateWithTimezone(auction?.startDate)}</span>
      </div>

      <div className='flex justify-between items-center py-4 border-b border-white/10'>
        <span className='font-medium opacity-80'>End Date</span>
        <span className='font-semibold text-xs'>{formatDateWithTimezone(auction?.endDate)}</span>
      </div>
      <div className='flex justify-between items-center py-4 border-b border-white/10'>
        <span className='font-medium opacity-80'>Item ID</span>
        <span className='font-semibold text-xs truncate'>{auctionItem?._id}</span>
      </div>
    </div>
  );
};

export default AuctionItemDetailsSection;
