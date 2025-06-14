import { formatDistanceToNow } from 'date-fns';
import { Heart, Minus } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// // Live activity feed
const LiveActivity: FC<{ latestBids: any; status: string; customCampaignLink: string }> = ({ latestBids, status, customCampaignLink }) => {
  const [activities, setActivities] = useState([]);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    if (latestBids?.length > 0) {
      const newActivities = latestBids
        .map((bid: any) => ({
          user: bid?.bidder || 'Anonymous',
          action: `placed a bid of $${bid.bidAmount}`,
          item: bid.auctionItem?.name || 'Unknown Item',
          time: formatDistanceToNow(new Date(bid.createdAt), { addSuffix: true }),
          auctionItemId: bid?.auctionItem?._id,
        }))
        .reverse();
      setActivities(newActivities);
    }
  }, [latestBids]);

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
        <h3 className='text-white font-bold flex items-center'>
          <Heart className='w-4 h-4 mr-2 text-red-500 animate-pulse' />
          Live Activity
        </h3>

        {/* Activity list */}
        {!minimized && (
          <div className='h-80 lg:h-96 overflow-y-auto space-y-2 mt-3'>
            {activities.map((activity: any, index) => (
              <Link
                to={`/campaigns/${customCampaignLink}/auction/item/${activity?.auctionItemId}`}
                key={index}
                className={`block text-white/80 text-sm p-2 rounded-lg bg-white/5 ${index === 0 ? 'animate-fade-in border border-green-400/30' : ''}`}
              >
                <span className='font-semibold text-blue-400'>{activity.user}</span> {activity.action} on{' '}
                <span className='font-semibold text-purple-400'>{activity.item}</span>
                <div className='text-white/50 text-xs mt-1'>{activity.time}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveActivity;
