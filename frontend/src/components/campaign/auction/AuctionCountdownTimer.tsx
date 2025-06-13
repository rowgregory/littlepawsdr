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

const AuctionCountdownTimer: FC<IAuctionCountdownTimer> = ({ startDate, endDate, title }) => {
  const [timeLeft, setTimeLeft] = useState<null | ITimeLeft>(null);
  const [status, setStatus] = useState<string>('UPCOMING');

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

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();

      if (now < start) {
        setStatus('UPCOMING');
        setTimeLeft(calculateTimeLeft(start));
      } else if (now >= start && now < end) {
        setStatus('LIVE');
        setTimeLeft(calculateTimeLeft(end));
      } else {
        setStatus('CLOSED');
        setTimeLeft(null);
      }
    };

    updateCountdown(); // initial call
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [startDate, endDate]);

  const renderTitle = () => {
    switch (status) {
      case 'UPCOMING':
        return `🎉 The ${title} auction starts soon! 🎉`;
      case 'LIVE':
        return `🔥 The ${title} auction is live! 🔥`;
      case 'CLOSED':
        return `🔒 The ${title} auction has ended.`;
    }
  };

  const renderDateInfo = () => {
    switch (status) {
      case 'UPCOMING':
        return (
          <motion.div
            className='text-white/80 text-sm mb-2'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className='text-yellow-400'>Starts:</span> {formatDate(startDate)}
          </motion.div>
        );
      case 'LIVE':
        return (
          <motion.div
            className='text-white/80 text-sm mb-2'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className='text-red-400'>Ends:</span> {formatDate(endDate)}
          </motion.div>
        );
      case 'CLOSED':
        return (
          <motion.div
            className='text-white/80 text-sm mb-2'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className='text-gray-400'>Ended:</span> {formatDate(endDate)}
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      className='text-center mb-12'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <FloatingParticles />

      <motion.h1
        className='text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r uppercase from-white via-blue-100 to-purple-200 mb-6'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        <motion.span
          animate={{
            textShadow: ['0 0 20px rgba(255,255,255,0.3)', '0 0 30px rgba(255,255,255,0.6)', '0 0 20px rgba(255,255,255,0.3)'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {renderTitle()}
        </motion.span>
      </motion.h1>

      {/* Date information positioned between title and countdown */}
      {renderDateInfo()}

      {timeLeft ? (
        <motion.div
          className='flex flex-wrap justify-center gap-3 md:gap-4 text-white px-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <motion.div
              key={unit}
              className='bg-black/30 backdrop-blur-sm border border-white/20 rounded-2xl p-3 md:p-4 min-w-[70px] md:min-w-[80px] relative overflow-hidden'
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.9 + index * 0.1,
                type: 'spring',
                stiffness: 150,
                damping: 12,
              }}
              whileHover={{
                scale: 1.05,
                y: -3,
                transition: { type: 'spring', stiffness: 400, damping: 15 },
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent'
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 4 + index * 0.5,
                }}
              />

              {/* Glowing background */}
              <motion.div
                className='absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl'
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.3,
                }}
              />

              <motion.div
                className='relative text-2xl md:text-3xl font-bold text-yellow-400'
                key={value} // This will trigger re-render when value changes
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
              >
                {value}
              </motion.div>

              <motion.div
                className='relative text-xs md:text-sm uppercase tracking-wide'
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.2,
                }}
              >
                {unit}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          className='text-white text-lg md:text-xl font-semibold bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 inline-block'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 150 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 30px rgba(255,255,255,0.3)',
          }}
        >
          🎊 Thanks for participating!
        </motion.p>
      )}
    </motion.div>
  );
};

export default AuctionCountdownTimer;
