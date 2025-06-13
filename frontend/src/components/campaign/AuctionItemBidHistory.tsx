import { Trophy } from 'lucide-react';
import { formatDateWithTimezone } from '../../utils/dateFunctions';

const AuctionItemBidHistory = ({ auctionItem }: any) => {
  return (
    <div className='pt-8 border-t border-white/10'>
      <div className='space-y-3 max-h-96 overflow-y-auto'>
        {auctionItem?.bids?.length > 0 ? (
          auctionItem?.bids
            ?.map((bid: any) => (
              <div
                key={bid._id}
                className='flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-lg text-white'>
                    {bid.status === 'Top Bid' ? (
                      <Trophy className='text-white w-4 h-4' />
                    ) : (
                      `${bid?.user?.firstNameFirstInitial} ${bid?.user?.lastNameFirstInitial}`
                    )}
                  </div>
                  <div>
                    <div className='font-semibold text-white'>{bid.bidder}</div>
                    <div className='text-sm opacity-70 text-gray-200'>{formatDateWithTimezone(bid?.createdAt)}</div>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-xl font-bold text-yellow-400'>${bid.bidAmount}</div>
                  {bid.status === 'Top Bid' && <div className='text-xs text-green-400 font-medium'>Current High</div>}
                </div>
              </div>
            ))
            ?.reverse()
        ) : (
          <div className='text-center py-12 opacity-60'>
            <div className='text-4xl mb-4'>📈</div>
            <p className='text-lg'>No bids found</p>
            <p className='text-sm opacity-80'>Be the first to place a bid!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionItemBidHistory;
