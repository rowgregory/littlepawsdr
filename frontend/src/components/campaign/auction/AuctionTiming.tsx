import { Award, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

const AuctionTiming = ({ startDate, endDate }: { startDate: string; endDate: string }) => {
  const [status, setStatus] = useState<string>('UPCOMING');
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const checkAuctionStatus = () => {
      const now = new Date().getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();

      if (now < start) {
        setStatus('UPCOMING');
        setDaysLeft(null);
      } else if (now >= start && now < end) {
        setStatus('LIVE');
        const remainingMs = end - now;
        const days = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
        setDaysLeft(days);
      } else {
        setStatus('CLOSED');
        setDaysLeft(null);
      }
    };

    checkAuctionStatus();
    const timer = setInterval(checkAuctionStatus, 1000 * 60); // update every minute
    return () => clearInterval(timer);
  }, [startDate, endDate]);

  const getTimeLabel = () => {
    if (status === 'UPCOMING') return 'Starts soon';
    if (status === 'LIVE' && daysLeft !== null) return `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`;
    if (status === 'CLOSED') return 'Auction ended';
  };

  return (
    <div className='flex justify-between items-center mb-4 text-white/80'>
      <span className='flex items-center'>
        <Clock className='w-4 h-4 mr-1' />
        {getTimeLabel()}
      </span>
      <span className='flex items-center'>
        <Award className='w-4 h-4 mr-1' />
        Verified
      </span>
    </div>
  );
};

export default AuctionTiming;
