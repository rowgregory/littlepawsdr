import { Trophy } from 'lucide-react';
import { formatDateWithTimezone } from '../../utils/dateFunctions';

const getInitials = (bid: any): string => {
  // bid.bidder is the stored display name ('Anonymous' or the user's name)
  const source = bid?.bidder && bid.bidder !== 'Anonymous' ? bid.bidder : (bid?.user?.name ?? '');
  const parts = source.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'A'; // Anonymous / unknown
  if (parts.length === 1) return parts[0][0]!.toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const AuctionItemBidHistory = ({ auctionItem }: any) => {
  // Sort newest-first once, instead of map → reverse
  const bids = [...(auctionItem?.bids ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className='pt-6 border-t border-white/10'>
      <div className='space-y-2.5 max-h-96 overflow-y-auto' role='list' aria-label='Bid history'>
        {bids.length > 0 ? (
          bids.map((bid: any, i: number) => {
            const isTop = bid.status === 'Top Bid';
            const name = bid?.bidder || bid?.user?.name || 'Anonymous';
            return (
              <div
                key={bid._id ?? `${bid.bidAmount}-${bid.createdAt ?? i}`}
                role='listitem'
                className='flex items-center justify-between gap-3 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors'
              >
                <div className='flex items-center gap-3 min-w-0'>
                  <div
                    className='w-9 h-9 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0'
                    aria-hidden='true'
                  >
                    {isTop ? <Trophy className='w-4 h-4' /> : getInitials(bid)}
                  </div>
                  <div className='min-w-0'>
                    <div className='font-semibold text-white truncate'>{name}</div>
                    <div className='text-xs text-gray-300'>
                      {formatDateWithTimezone(bid?.createdAt)}
                    </div>
                  </div>
                </div>
                <div className='text-right shrink-0'>
                  <div className='text-lg font-bold text-yellow-400 tabular-nums'>
                    ${Number(bid.bidAmount).toLocaleString()}
                  </div>
                  {isTop && <div className='text-xs text-green-300 font-medium'>Current High</div>}
                </div>
              </div>
            );
          })
        ) : (
          <div className='text-center py-10 text-white/70'>
            <div className='text-3xl mb-3' aria-hidden='true'>
              📈
            </div>
            <p className='text-base font-medium'>No bids found</p>
            <p className='text-sm opacity-80'>Be the first to place a bid!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionItemBidHistory;
