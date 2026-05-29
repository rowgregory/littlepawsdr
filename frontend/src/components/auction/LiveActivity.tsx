import { formatDistanceToNow } from 'date-fns';
import { ChevronDown, ChevronUp, Heart, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuctionSelector } from '../../redux/toolkitStore';

const LiveActivity = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [minimized, setMinimized] = useState(true); // start minimized
  const { auction } = useAuctionSelector();
  const bids = auction?.bids;
  const instantBuyers = auction?.instantBuyers;
  const customAuctionLink = auction?.customAuctionLink;

  useEffect(() => {
    const mappedBids = (bids || []).map((activity: any) => ({
      user: activity?.bidder || 'Anonymous',
      action: 'placed a bid of',
      amount: activity?.bidAmount,
      item: activity?.auctionItem?.name || 'an item',
      time: activity?.createdAt
        ? formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })
        : 'Recently',
      auctionItemId: activity?.auctionItem?._id,
      createdAt: activity?.createdAt || new Date(),
      isInstantBuy: false,
    }));

    const mappedInstantBuyers = (instantBuyers || []).map((activity: any) => ({
      user: activity?.user?.name || activity?.name || 'Anonymous',
      action: 'instantly bought',
      amount: null,
      item: activity?.auctionItem?.name || 'an item',
      time: activity?.createdAt
        ? formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })
        : 'Recently',
      auctionItemId: activity?.auctionItem?._id,
      createdAt: activity?.createdAt || new Date(),
      isInstantBuy: true,
    }));

    const combined = [...mappedBids, ...mappedInstantBuyers].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    setActivities(combined);
  }, [bids, instantBuyers]);

  if (activities.length === 0 || auction?.status !== 'ACTIVE') return null;

  return (
    <div className='fixed bottom-4 left-4 right-4 sm:right-auto z-50 sm:max-w-sm'>
      <div className='relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl'>
        {/* Header — toggles minimize */}
        <button
          type='button'
          onClick={() => setMinimized((m) => !m)}
          aria-expanded={!minimized}
          aria-controls='live-activity-list'
          className='w-full flex items-center justify-between gap-2 p-3 sm:p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-2xl'
        >
          <span className='flex items-center gap-2 text-white font-bold text-sm'>
            <Heart className='w-4 h-4 text-red-400 motion-safe:animate-pulse' aria-hidden='true' />
            Live Activity
          </span>
          <span className='flex items-center gap-2'>
            <span className='text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/70 tabular-nums'>
              {activities.length} {activities.length === 1 ? 'action' : 'actions'}
            </span>
            {minimized ? (
              <ChevronUp className='w-4 h-4 text-white/70' aria-hidden='true' />
            ) : (
              <ChevronDown className='w-4 h-4 text-white/70' aria-hidden='true' />
            )}
          </span>
        </button>

        {/* Activity list */}
        {!minimized && (
          <div
            id='live-activity-list'
            className='max-h-[50dvh] sm:max-h-96 overflow-y-auto space-y-2 px-3 sm:px-4 pb-3 sm:pb-4'
            role='list'
            aria-label='Recent auction activity'
          >
            {activities.map((activity: any, index) => (
              <Link
                key={`${activity.auctionItemId}-${activity.createdAt}-${index}`}
                to={`/auctions/${customAuctionLink}/item/${activity?.auctionItemId}`}
                role='listitem'
                className={`block text-sm p-3 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                  activity.isInstantBuy
                    ? 'bg-emerald-500/15 border border-emerald-400/40 hover:bg-emerald-500/25'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
              >
                <div className='flex items-start justify-between gap-2'>
                  <p className='flex-1 text-white/80 leading-snug min-w-0'>
                    <span className='font-semibold text-blue-300'>{activity.user}</span>{' '}
                    {activity.action}
                    {activity.amount != null && (
                      <span className='font-semibold text-yellow-300 tabular-nums'>
                        {' '}
                        ${Number(activity.amount).toLocaleString()}
                      </span>
                    )}{' '}
                    <span className='text-white/60'>on</span>{' '}
                    <span
                      className={`font-semibold ${activity.isInstantBuy ? 'text-emerald-300' : 'text-purple-300'}`}
                    >
                      {activity.item}
                    </span>
                    <span className='block text-white/40 text-xs mt-1'>{activity.time}</span>
                  </p>
                  {activity.isInstantBuy && (
                    <span
                      className='shrink-0 w-7 h-7 rounded-full bg-emerald-500/30 flex items-center justify-center'
                      aria-hidden='true'
                    >
                      <Zap className='w-4 h-4 text-emerald-300' />
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveActivity;
