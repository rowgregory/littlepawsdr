import { formatDistanceToNow } from 'date-fns';
import { Heart, Minus } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// // Live activity feed
const LiveActivity: FC<{ latestBids: any; status: string; customCampaignLink: string; lastestInstantBuyers: any }> = ({
  latestBids,
  status,
  customCampaignLink,
  lastestInstantBuyers,
}) => {
  const [activities, setActivities] = useState([]);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    if (latestBids?.length > 0 || lastestInstantBuyers?.length > 0) {
      // Map and tag bids
      const mappedBids = (latestBids || []).map((activity: any) => ({
        user: activity?.bidder || 'Anonymous',
        action: `placed a bid of $${activity.bidAmount} on `,
        item: activity.auctionItem?.name || 'Unknown Item',
        time: formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true }),
        auctionItemId: activity?.auctionItem?._id,
        createdAt: activity.createdAt,
        type: 'bid',
        isInstantBuy: false,
      }));

      // Map and tag instant buyers
      const mappedInstantBuyers = (lastestInstantBuyers || []).map((activity: any) => ({
        user: activity?.name || 'Anonymous',
        action: `instantly bought `,
        item: activity.auctionItem?.name || 'Unknown Item',
        time: formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true }),
        auctionItemId: activity?.auctionItem?._id,
        createdAt: activity.createdAt,
        type: 'instant_buy',
        isInstantBuy: true,
      }));

      // Combine and sort by newest first
      const combined = [...mappedBids, ...mappedInstantBuyers];
      const sortedActivities: any = combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setActivities(sortedActivities);
    }
  }, [latestBids, lastestInstantBuyers]);

  if (status === 'UPCOMING' || status === 'CLOSED') return null;

  return (
    <div className='fixed bottom-6 left-6 z-50 '>
      <div className={`relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-4 max-w-sm`}>
        {/* Minimize button */}
        <button
          onClick={() => setMinimized(!minimized)}
          className='absolute top-2 right-2 w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-yellow-300 transition'
          title={minimized ? 'Expand' : 'Minimize'}
        >
          <Minus className='w-3 h-3 text-black' />
        </button>

        {/* Header */}
        <h3 className='text-white font-bold flex items-center justify-between'>
          <div className='flex items-center'>
            <Heart className='w-4 h-4 mr-2 text-red-500 animate-pulse' />
            Live Activity
          </div>
          <span className='text-xs bg-white/10 px-2 py-1 rounded-full text-white/70'>{activities?.length} actions</span>
        </h3>

        {/* Activity list */}
        {!minimized && (
          <div className='h-80 lg:h-96 overflow-y-auto space-y-2 mt-3'>
            {activities.map((activity: any, index) => (
              <Link
                to={`/campaigns/${customCampaignLink}/auction/item/${activity?.auctionItemId}`}
                key={index}
                className={`block text-white/80 text-sm p-3 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                  activity.isInstantBuy
                    ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/40 shadow-lg shadow-emerald-500/20 animate-pulse'
                    : 'bg-white/5 hover:bg-white/10'
                } ${index === 0 ? 'animate-fade-in' : ''}`}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <div className='mt-1'>
                      <span className='font-semibold text-blue-400'>{activity.user}</span> {activity.action}
                      <span className={`font-semibold ${activity.isInstantBuy ? 'text-emerald-300' : 'text-purple-400'}`}>{activity.item}</span>
                    </div>
                    <div className='text-white/50 text-xs mt-1'>{activity.time}</div>
                  </div>
                  {activity.isInstantBuy && (
                    <div className='flex-shrink-0 ml-2'>
                      <div className='w-8 h-8 rounded-full bg-emerald-500/30 flex items-center justify-center'>
                        <span className='text-emerald-300 text-lg'>⚡</span>
                      </div>
                    </div>
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
