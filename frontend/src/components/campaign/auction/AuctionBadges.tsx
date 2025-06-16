import { CheckCircle, Clock, Flame, Gavel, Lock, ShoppingBag, TrendingUp, UserCheck, Users } from 'lucide-react';
import { FC } from 'react';
import { motion } from 'framer-motion';

export const AuctionStatusBadge = ({ status }: { status: string }) => {
  let bgClass = '';
  let accentColor = '';
  let label = '';
  let IconComponent = Flame;

  switch (status?.toUpperCase()) {
    case 'UPCOMING':
      bgClass = 'bg-white/10';
      accentColor = 'border-l-blue-400 text-blue-300';
      label = 'Upcoming Auction';
      IconComponent = Clock;
      break;
    case 'LIVE':
      bgClass = 'bg-white/15';
      accentColor = 'border-l-red-400 text-red-300';
      label = 'Live Auction';
      IconComponent = Flame;
      break;
    case 'CLOSED':
      bgClass = 'bg-white/8';
      accentColor = 'border-l-gray-400 text-gray-300';
      label = 'Closed Auction';
      IconComponent = CheckCircle;
      break;
    default:
      bgClass = 'bg-white/5';
      accentColor = 'border-l-gray-400 text-gray-400';
      label = 'Unknown Status';
      IconComponent = Clock;
  }

  const isLive = status?.toUpperCase() === 'LIVE';

  return (
    <motion.div
      className={`${bgClass} ${accentColor} backdrop-blur-sm border-l-4 px-4 py-3 relative overflow-hidden`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{
        x: 5,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
    >
      {/* Glowing effect for live status */}
      {isLive && (
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent'
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      <div className='relative z-10 flex items-center'>
        <motion.div className='mr-3' animate={isLive ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 1.5, repeat: isLive ? Infinity : 0 }}>
          <IconComponent className='w-4 h-4' />
        </motion.div>
        <div>
          <div className='text-white text-sm font-medium'>{label}</div>
          {isLive && (
            <motion.div className='text-xs text-red-200 mt-0.5' animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1, repeat: Infinity }}>
              ● ACTIVE NOW
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const MoneySecuredBadge = ({ status, moneySecured }: { status: string; moneySecured: string }) => {
  if (status === 'UPCOMING') return null;

  const isLive = status === 'LIVE';

  return (
    <motion.div
      className='bg-white/10 backdrop-blur-sm border-l-4 border-l-green-400 px-4 py-3 relative overflow-hidden'
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      whileHover={{
        x: 5,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
    >
      {isLive && (
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent'
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}

      <div className='relative z-10 flex items-center'>
        <motion.div
          className='mr-3 text-green-300'
          animate={isLive ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 2, repeat: isLive ? Infinity : 0 }}
        >
          {isLive ? <TrendingUp className='w-4 h-4' /> : <Lock className='w-4 h-4' />}
        </motion.div>
        <div>
          <motion.div
            className='text-white text-lg font-bold leading-none'
            key={moneySecured}
            initial={{ scale: isLive ? 1.1 : 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            ${moneySecured.toLocaleString()}
          </motion.div>
          <div className='text-green-200 text-xs mt-0.5'>{isLive ? 'Total Secured' : 'Final Total'}</div>
        </div>
      </div>
    </motion.div>
  );
};

export const BidderBadge = ({ status, totalBidders }: { status: string; totalBidders: number }) => {
  if (status === 'UPCOMING') return null;

  const isLive = status === 'LIVE';

  return (
    <motion.div
      className='bg-white/10 backdrop-blur-sm border-l-4 border-l-purple-400 px-4 py-3 relative overflow-hidden'
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      whileHover={{
        x: 5,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
    >
      {isLive && (
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent'
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      )}

      <div className='relative z-10 flex items-center'>
        <motion.div
          className='mr-3 text-purple-300'
          animate={isLive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1.8, repeat: isLive ? Infinity : 0 }}
        >
          {isLive ? <Users className='w-4 h-4' /> : <UserCheck className='w-4 h-4' />}
        </motion.div>
        <div>
          <motion.div
            className='text-white text-lg font-bold leading-none'
            key={totalBidders}
            initial={{ scale: isLive ? 1.1 : 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {totalBidders}
          </motion.div>
          <div className='text-purple-200 text-xs mt-0.5'>{isLive ? 'Active Bidders' : 'Total Bidders'}</div>
        </div>
      </div>
    </motion.div>
  );
};

export const FilterButtons: FC<{
  activeFilter: string;
  onFilterChange: (filter: 'auction' | 'instant' | 'all' | 'no-bids') => void;
  auctionCount?: number;
  instantCount?: number;
  noBidsCount?: number;
}> = ({ activeFilter, onFilterChange, auctionCount = 0, instantCount = 0, noBidsCount = 0 }) => {
  const getButtonClasses = (filter: string) => {
    const isActive = activeFilter === filter;

    // Color themes for each filter
    const colorMap: any = {
      all: isActive
        ? 'bg-orange-500/20 text-orange-300 border-orange-400/50'
        : 'bg-transparent text-white/70 border-orange-400/30 hover:bg-orange-500/10 hover:text-orange-300',
      auction: isActive
        ? 'bg-blue-500/20 text-blue-300 border-blue-400/50'
        : 'bg-transparent text-white/70 border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-300',
      instant: isActive
        ? 'bg-green-500/20 text-green-300 border-green-400/50'
        : 'bg-transparent text-white/70 border-green-400/30 hover:bg-green-500/10 hover:text-green-300',
      'no-bids': isActive
        ? 'bg-purple-500/20 text-purple-300 border-purple-400/50'
        : 'bg-transparent text-white/70 border-purple-400/30 hover:bg-purple-500/10 hover:text-purple-300',
    };

    return `
      px-3 py-2 rounded-md text-sm font-medium 
      transition-all duration-300 flex items-center gap-2 border 
      w-full justify-center
      ${colorMap[filter]}
    `;
  };

  const getCountBadgeClasses = (filter: string) => {
    const isActive = activeFilter === filter;
    const colorMap: any = {
      all: isActive ? 'bg-orange-400/30 text-orange-200' : 'bg-white/20 text-white/70',
      auction: isActive ? 'bg-blue-400/30 text-blue-200' : 'bg-white/20 text-white/70',
      instant: isActive ? 'bg-green-400/30 text-green-200' : 'bg-white/20 text-white/70',
      'no-bids': isActive ? 'bg-purple-400/30 text-purple-200' : 'bg-white/20 text-white/70',
    };

    return `text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center ${colorMap[filter]}`;
  };

  return (
    <motion.div
      className='flex flex-col sm:flex-row justify-center mt-4 gap-2 px-4 sm:px-0 max-w-sm sm:max-w-none mx-auto'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* All Items Button */}
      <motion.button
        onClick={() => onFilterChange('all')}
        className={getButtonClasses('all')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Flame className='w-4 h-4' />
        <span>All Items</span>
        <span className={getCountBadgeClasses('all')}>{auctionCount + instantCount}</span>
      </motion.button>

      {/* Auction Items Button */}
      <motion.button
        onClick={() => onFilterChange('auction')}
        className={getButtonClasses('auction')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Gavel className='w-4 h-4' />
        <span>Auction Items</span>
        <span className={getCountBadgeClasses('auction')}>{auctionCount}</span>
      </motion.button>

      {/* Instant Buy Button */}
      <motion.button
        onClick={() => onFilterChange('instant')}
        className={getButtonClasses('instant')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ShoppingBag className='w-4 h-4' />
        <span>Instant Buy</span>
        <span className={getCountBadgeClasses('instant')}>{instantCount}</span>
      </motion.button>

      {/* No Bids Button */}
      <motion.button
        onClick={() => onFilterChange('no-bids')}
        className={getButtonClasses('no-bids')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Clock className='w-4 h-4' />
        <span>No Bids</span>
        <span className={getCountBadgeClasses('no-bids')}>{noBidsCount}</span>
      </motion.button>
    </motion.div>
  );
};

// Live stats ticker
export const LiveStats: FC<{
  totalBidders: number;
  moneySecured: string;
  status: string;
  activeFilter: string;
  onFilterChange: (filter: 'auction' | 'instant' | 'all' | 'no-bids') => void;
  auctionCount?: number;
  instantCount?: number;
  noBidsCounts?: number;
}> = ({ totalBidders, moneySecured, status, activeFilter, onFilterChange, auctionCount = 0, instantCount = 0, noBidsCounts = 0 }) => {
  return (
    <motion.div className='max-w-4xl mx-auto mb-12 px-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* Desktop Layout */}
      <motion.div
        className={`hidden md:grid ${status !== 'UPCOMING' && 'md:grid-cols-3'} gap-1 rounded-xl overflow-hidden shadow-2xl`}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
          staggerChildren: 0.2,
          delayChildren: 0.1,
        }}
      >
        <BidderBadge status={status} totalBidders={totalBidders} />
        <MoneySecuredBadge status={status} moneySecured={moneySecured} />
        <AuctionStatusBadge status={status} />
      </motion.div>

      {/* Mobile Layout */}
      <motion.div
        className='md:hidden space-y-1 rounded-xl overflow-hidden shadow-2xl'
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
          staggerChildren: 0.15,
          delayChildren: 0.1,
        }}
      >
        <AuctionStatusBadge status={status} />
        <BidderBadge status={status} totalBidders={totalBidders} />
        <MoneySecuredBadge status={status} moneySecured={moneySecured} />
      </motion.div>
      <FilterButtons
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        auctionCount={auctionCount}
        instantCount={instantCount}
        noBidsCount={noBidsCounts}
      />
    </motion.div>
  );
};
