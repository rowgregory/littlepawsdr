import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingParticles from './FloatingParticles';

interface IAuctionCountdownTimer {
  startDate: string;
  endDate: string;
  title: string;
}

interface ITimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });
};

const calculateTimeLeft = (targetDate: number) => {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) return null;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const renderTitle = (status: string, title: string) => {
  switch (status) {
    case 'DRAFT':
      return `🎉 The ${title} auction starts soon!`;
    case 'ACTIVE':
      return `🔥 The ${title} auction is live!`;
    case 'ENDED':
      return `🔒 The ${title} auction has ended.`;
    default:
      return title;
  }
};

const AuctionCountdownTimer: FC<IAuctionCountdownTimer> = ({ startDate, endDate, title }) => {
  const [timeLeft, setTimeLeft] = useState<null | ITimeLeft>(null);
  const [status, setStatus] = useState<string>('DRAFT');

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();

      if (now < start) {
        setStatus('DRAFT');
        setTimeLeft(calculateTimeLeft(start));
      } else if (now >= start && now < end) {
        setStatus('ACTIVE');
        setTimeLeft(calculateTimeLeft(end));
      } else {
        setStatus('ENDED');
        setTimeLeft(null);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [startDate, endDate]);

  const dateLabel =
    status === 'DRAFT'
      ? { label: 'Starts', value: formatDate(startDate), color: 'text-yellow-400' }
      : status === 'ACTIVE'
        ? { label: 'Ends', value: formatDate(endDate), color: 'text-red-400' }
        : { label: 'Ended', value: formatDate(endDate), color: 'text-gray-400' };

  return (
    <motion.section
      aria-label='Auction countdown'
      className='text-center mb-6 sm:mb-8'
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <FloatingParticles />

      <h1 className='text-2xl sm:text-4xl md:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 mb-2 sm:mb-3 px-3 leading-tight'>
        {renderTitle(status, title)}
      </h1>

      {/* Date info — announced politely, single source */}
      <p className='text-white/80 text-xs sm:text-sm mb-4' aria-live='polite'>
        <span className={dateLabel.color}>{dateLabel.label}:</span> {dateLabel.value}
      </p>

      {timeLeft ? (
        <div
          className='flex justify-center gap-2 sm:gap-3 text-white px-3'
          role='timer'
          aria-live='off'
          aria-label={`Time ${status === 'DRAFT' ? 'until auction starts' : 'remaining in auction'}: ${Object.entries(
            timeLeft,
          )
            .map(([unit, value]) => `${value} ${unit}`)
            .join(', ')}`}
        >
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className='bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 sm:px-4 sm:py-3 min-w-[60px] sm:min-w-[72px] relative overflow-hidden'
            >
              <div
                key={value}
                className='relative text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 tabular-nums'
              >
                {value}
              </div>
              <div className='relative text-[8px] sm:text-xs uppercase tracking-wide text-white/70'>
                {unit}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-white text-base sm:text-lg font-semibold bg-white/10 backdrop-blur-xl rounded-full px-5 py-2.5 border border-white/20 inline-block'>
          🎊 Thanks for participating!
        </p>
      )}
    </motion.section>
  );
};

export default AuctionCountdownTimer;
