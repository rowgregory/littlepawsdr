import {
  CheckCircle,
  Clock,
  Flame,
  Gavel,
  Lock,
  ShoppingBag,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import { FC } from 'react';
import { motion } from 'framer-motion';

export const AuctionStatusBadge = ({ status }: { status: string }) => {
  let bgClass = '';
  let accentColor = '';
  let label = '';
  let IconComponent = Flame;

  switch (status?.toUpperCase()) {
    case 'DRAFT':
      bgClass = 'bg-white/10';
      accentColor = 'border-l-blue-400 text-blue-200';
      label = 'Upcoming Auction';
      IconComponent = Clock;
      break;
    case 'ACTIVE':
      bgClass = 'bg-white/15';
      accentColor = 'border-l-red-400 text-red-200';
      label = 'Live Auction';
      IconComponent = Flame;
      break;
    case 'ENDED':
      bgClass = 'bg-white/10';
      accentColor = 'border-l-gray-400 text-gray-200';
      label = 'Closed Auction';
      IconComponent = CheckCircle;
      break;
    default:
      bgClass = 'bg-white/5';
      accentColor = 'border-l-gray-400 text-gray-300';
      label = 'Unknown Status';
      IconComponent = Clock;
  }

  const isLive = status?.toUpperCase() === 'ACTIVE';

  return (
    <div
      className={`${bgClass} ${accentColor} backdrop-blur-sm border-l-4 px-3 py-2.5 sm:px-4 sm:py-3 relative overflow-hidden`}
    >
      <div className='relative z-10 flex items-center gap-2.5'>
        <IconComponent className='w-4 h-4 shrink-0' aria-hidden='true' />
        <div className='min-w-0'>
          <div className='text-white text-sm font-medium truncate'>{label}</div>
          {isLive && (
            <div className='text-xs text-red-200 mt-0.5 flex items-center gap-1'>
              <span aria-hidden='true'>●</span> Active now
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const MoneySecuredBadge = ({
  status,
  moneySecured,
}: {
  status: string;
  moneySecured: string;
}) => {
  if (status === 'DRAFT') return null;

  const isLive = status === 'ACTIVE';

  // moneySecured may arrive as a string; coerce safely for display formatting
  const amount = Number(moneySecured);
  const display = Number.isFinite(amount) ? amount.toLocaleString() : moneySecured;

  return (
    <div className='bg-white/10 backdrop-blur-sm border-l-4 border-l-green-400 px-3 py-2.5 sm:px-4 sm:py-3 relative overflow-hidden'>
      <div className='relative z-10 flex items-center gap-2.5'>
        <span className='text-green-200 shrink-0' aria-hidden='true'>
          {isLive ? <TrendingUp className='w-4 h-4' /> : <Lock className='w-4 h-4' />}
        </span>
        <div className='min-w-0'>
          <div className='text-white text-lg font-bold leading-none tabular-nums truncate'>
            ${display}
          </div>
          <div className='text-green-200 text-xs mt-0.5'>
            {isLive ? 'Total Secured' : 'Final Total'}
          </div>
        </div>
      </div>
    </div>
  );
};

export const BidderBadge = ({ status, totalBidders }: { status: string; totalBidders: number }) => {
  if (status === 'DRAFT') return null;

  const isLive = status === 'ACTIVE';

  return (
    <div className='bg-white/10 backdrop-blur-sm border-l-4 border-l-purple-400 px-3 py-2.5 sm:px-4 sm:py-3 relative overflow-hidden'>
      <div className='relative z-10 flex items-center gap-2.5'>
        <span className='text-purple-200 shrink-0' aria-hidden='true'>
          {isLive ? <Users className='w-4 h-4' /> : <UserCheck className='w-4 h-4' />}
        </span>
        <div className='min-w-0'>
          <div className='text-white text-lg font-bold leading-none tabular-nums'>
            {totalBidders}
          </div>
          <div className='text-purple-200 text-xs mt-0.5'>
            {isLive ? 'Active Bidders' : 'Total Bidders'}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FilterButtons: FC<{
  activeFilter: string;
  onFilterChange: (filter: 'auction' | 'instant' | 'all' | 'no-bids') => void;
  auctionCount?: number;
  instantCount?: number;
  noBidsCount?: number;
}> = ({ activeFilter, onFilterChange, auctionCount = 0, instantCount = 0, noBidsCount = 0 }) => {
  const colorMap: Record<
    string,
    { active: string; idle: string; badge: string; badgeIdle: string }
  > = {
    all: {
      active: 'bg-orange-500/20 text-orange-200 border-orange-400/50',
      idle: 'bg-transparent text-white/70 border-orange-400/30 hover:bg-orange-500/10 hover:text-orange-200',
      badge: 'bg-orange-400/30 text-orange-100',
      badgeIdle: 'bg-white/20 text-white/70',
    },
    auction: {
      active: 'bg-blue-500/20 text-blue-200 border-blue-400/50',
      idle: 'bg-transparent text-white/70 border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-200',
      badge: 'bg-blue-400/30 text-blue-100',
      badgeIdle: 'bg-white/20 text-white/70',
    },
    instant: {
      active: 'bg-green-500/20 text-green-200 border-green-400/50',
      idle: 'bg-transparent text-white/70 border-green-400/30 hover:bg-green-500/10 hover:text-green-200',
      badge: 'bg-green-400/30 text-green-100',
      badgeIdle: 'bg-white/20 text-white/70',
    },
    'no-bids': {
      active: 'bg-purple-500/20 text-purple-200 border-purple-400/50',
      idle: 'bg-transparent text-white/70 border-purple-400/30 hover:bg-purple-500/10 hover:text-purple-200',
      badge: 'bg-purple-400/30 text-purple-100',
      badgeIdle: 'bg-white/20 text-white/70',
    },
  };

  const buttonClasses = (filter: string) => {
    const isActive = activeFilter === filter;
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 border w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
      isActive ? colorMap[filter].active : colorMap[filter].idle
    }`;
  };

  const badgeClasses = (filter: string) => {
    const isActive = activeFilter === filter;
    return `text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center ${
      isActive ? colorMap[filter].badge : colorMap[filter].badgeIdle
    }`;
  };

  const filters = [
    { key: 'all' as const, label: 'All Items', Icon: Flame, count: auctionCount + instantCount },
    { key: 'auction' as const, label: 'Auction Items', Icon: Gavel, count: auctionCount },
    { key: 'instant' as const, label: 'Instant Buy', Icon: ShoppingBag, count: instantCount },
    { key: 'no-bids' as const, label: 'No Bids', Icon: Clock, count: noBidsCount },
  ];

  return (
    <div
      role='group'
      aria-label='Filter auction items'
      className='grid grid-cols-2 sm:flex sm:flex-row justify-center mt-4 gap-2 px-3 sm:px-0 max-w-md sm:max-w-none mx-auto'
    >
      {filters.map(({ key, label, Icon, count }) => (
        <button
          key={key}
          type='button'
          onClick={() => onFilterChange(key)}
          aria-pressed={activeFilter === key}
          className={buttonClasses(key)}
        >
          <Icon className='w-4 h-4 shrink-0' aria-hidden='true' />
          <span className='truncate'>{label}</span>
          <span className={badgeClasses(key)} aria-label={`${count} items`}>
            {count}
          </span>
        </button>
      ))}
    </div>
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
}> = ({
  totalBidders,
  moneySecured,
  status,
  activeFilter,
  onFilterChange,
  auctionCount = 0,
  instantCount = 0,
  noBidsCounts = 0,
}) => {
  return (
    <motion.section
      aria-label='Auction stats and filters'
      className='max-w-4xl mx-auto mb-6 sm:mb-8 px-3 sm:px-4'
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Desktop */}
      <div
        className={`hidden md:grid ${
          status !== 'DRAFT' ? 'md:grid-cols-3' : 'md:grid-cols-1'
        } gap-1 rounded-xl overflow-hidden shadow-xl`}
      >
        <BidderBadge status={status} totalBidders={totalBidders} />
        <MoneySecuredBadge status={status} moneySecured={moneySecured} />
        <AuctionStatusBadge status={status} />
      </div>

      {/* Mobile */}
      <div className='md:hidden space-y-1 rounded-xl overflow-hidden shadow-xl'>
        <AuctionStatusBadge status={status} />
        <BidderBadge status={status} totalBidders={totalBidders} />
        <MoneySecuredBadge status={status} moneySecured={moneySecured} />
      </div>

      <FilterButtons
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        auctionCount={auctionCount}
        instantCount={instantCount}
        noBidsCount={noBidsCounts}
      />
    </motion.section>
  );
};
