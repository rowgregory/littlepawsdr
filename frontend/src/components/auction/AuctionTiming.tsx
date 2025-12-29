import { Award, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

const AuctionTiming = ({ startDate, endDate }: { startDate: string; endDate: string }) => {
  const [status, setStatus] = useState<string>('DRAFT');
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const checkAuctionStatus = () => {
      const now = new Date().getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();

      if (now < start) {
        setStatus('DRAFT');
        setDaysLeft(null);
      } else if (now >= start && now < end) {
        setStatus('ACTIVE');
        const remainingMs = end - now;
        const days = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
        setDaysLeft(days);
      } else {
        setStatus('ENDED');
        setDaysLeft(null);
      }
    };

    checkAuctionStatus();
    const timer = setInterval(checkAuctionStatus, 1000 * 60); // update every minute
    return () => clearInterval(timer);
  }, [startDate, endDate]);

  const getTimeLabel = () => {
    if (status === 'DRAFT') return 'Starts soon';
    if (status === 'ACTIVE' && daysLeft !== null)
      return `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`;
    if (status === 'ENDED') return 'Auction ended';
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
