import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, User } from 'lucide-react';
import { useState } from 'react';
import { useAuctionSelector } from '../../redux/toolkitStore';
import MotionLink from '../../components/common/MotionLink';
import FloatingParticles from '../../components/auction/FloatingParticles';

const Auctions = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'upcoming' | 'ended'>('all');
  const { auctions } = useAuctionSelector();

  const statusToFilter = (s: string) =>
    s === 'ACTIVE' ? 'active' : s === 'DRAFT' ? 'upcoming' : 'ended';

  const filteredAuctions = auctions.filter((auction: any) =>
    activeFilter === 'all' ? true : statusToFilter(auction.status) === activeFilter,
  );

  const totalRaised = auctions.reduce(
    (sum: number, a: any) => sum + (a.totalAuctionRevenue || 0),
    0,
  );
  const totalSupporters = auctions.reduce((sum: number, a: any) => sum + (a.supporters || 0), 0);

  const stats = [
    {
      label: 'Active Auctions',
      value: auctions.filter((a: any) => a.status === 'ACTIVE').length,
    },
    { label: 'Total Raised', value: `$${totalRaised.toLocaleString()}` },
    { label: 'Supporters', value: totalSupporters.toLocaleString() },
  ];

  const filters = ['all', 'active', 'upcoming', 'ended'] as const;

  return (
    <div className='min-h-dvh bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden'>
      <FloatingParticles />

      {/* Top bar */}
      <div className='relative z-20 bg-white/10 backdrop-blur-xl border-b border-white/20'>
        <div className='max-w-6xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between'>
          <Link
            to='/'
            className='text-lg font-bold text-white focus:outline-none focus-visible:underline'
          >
            Little Paws Dachshund Rescue
          </Link>
          <MotionLink to='/supporter/profile' variant='icon' aria-label='Your profile'>
            <User className='w-6 h-6 text-white' aria-hidden='true' />
          </MotionLink>
        </div>
      </div>

      {/* Header */}
      <div className='relative z-10 max-w-6xl mx-auto px-3 sm:px-6 pt-8 sm:pt-12'>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className='text-3xl sm:text-5xl font-black text-white mb-3'>Auctions</h1>
          <p className='text-base sm:text-lg text-white/70 max-w-2xl'>
            Bid on unique items and support our mission to rescue and care for dachshunds in need.
          </p>

          {/* Stats */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-8'>
            {stats.map((stat) => {
              return (
                <div
                  key={stat.label}
                  className='bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20'
                >
                  <div className='flex items-center gap-2 mb-1.5'>
                    <p className='text-xs sm:text-sm text-white/70'>{stat.label}</p>
                  </div>
                  <p className='text-2xl sm:text-3xl font-black text-white tabular-nums'>
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Main */}
      <div className='relative z-10 max-w-6xl mx-auto px-3 sm:px-6 py-10 sm:py-12'>
        <div className='flex items-end justify-between mb-6 flex-wrap gap-4'>
          <div>
            <h2 className='text-xl sm:text-2xl font-bold text-white flex items-center gap-2'>
              Available Auctions
            </h2>
            <p className='text-white/60 text-sm mt-1' aria-live='polite'>
              {filteredAuctions.length} {filteredAuctions.length === 1 ? 'auction' : 'auctions'}
            </p>
          </div>

          {/* Filters */}
          <div role='group' aria-label='Filter auctions' className='flex gap-2 flex-wrap'>
            {filters.map((filter) => (
              <button
                key={filter}
                type='button'
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`px-3.5 py-2 rounded-lg font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  activeFilter === filter
                    ? 'bg-white text-purple-900'
                    : 'bg-white/10 border border-white/20 text-white/80 hover:bg-white/20'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredAuctions.length === 0 ? (
          <div className='text-center py-16' role='status'>
            <h3 className='text-lg font-semibold text-white'>No auctions found</h3>
            <p className='text-white/60 mt-2 text-sm'>Check back soon for new auctions</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
            {filteredAuctions.map((auction: any) => {
              const goal = auction.goal || 0;
              const raised = auction.totalAuctionRevenue || 0;
              const pct = goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0;
              const isLive = auction.status === 'ACTIVE';
              const isDraft = auction.status === 'DRAFT';
              const statusLabel = isLive ? 'Live' : isDraft ? 'Upcoming' : 'Ended';

              return (
                <div
                  key={auction._id}
                  className='bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-white/70'
                >
                  {/* Card header */}
                  <div className='p-5 border-b border-white/10'>
                    <div className='flex items-start justify-between gap-2 mb-1'>
                      <h3 className='text-base font-bold text-white line-clamp-2 flex-1'>
                        {auction.title}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 ${
                          isLive
                            ? 'bg-green-500/20 text-green-200 border border-green-400/40'
                            : isDraft
                              ? 'bg-blue-500/20 text-blue-200 border border-blue-400/40'
                              : 'bg-gray-500/20 text-gray-200 border border-gray-400/40'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-300' : isDraft ? 'bg-blue-300' : 'bg-gray-300'}`}
                          aria-hidden='true'
                        />
                        {statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className='p-5 space-y-4'>
                    <div className='grid grid-cols-2 gap-2.5'>
                      <div className='bg-white/5 rounded-lg p-3'>
                        <p className='text-xs text-white/60 mb-0.5'>Goal</p>
                        <p className='text-base font-bold text-white tabular-nums'>
                          ${goal.toLocaleString()}
                        </p>
                      </div>
                      <div className='bg-white/5 rounded-lg p-3'>
                        <p className='text-xs text-white/60 mb-0.5'>Raised</p>
                        <p className='text-base font-bold text-green-300 tabular-nums'>
                          ${raised.toLocaleString()}
                        </p>
                      </div>
                      <div className='bg-white/5 rounded-lg p-3'>
                        <p className='text-xs text-white/60 mb-0.5'>Items</p>
                        <p className='text-base font-bold text-white tabular-nums'>
                          {auction.items?.length || 0}
                        </p>
                      </div>
                      <div className='bg-white/5 rounded-lg p-3'>
                        <p className='text-xs text-white/60 mb-0.5'>Supporters</p>
                        <p className='text-base font-bold text-white tabular-nums'>
                          {auction.supporters || 0}
                        </p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className='flex items-center justify-between mb-1.5'>
                        <p className='text-xs text-white/60'>Progress</p>
                        <p className='text-xs font-semibold text-white tabular-nums'>{pct}%</p>
                      </div>
                      <div
                        className='w-full bg-white/15 rounded-full h-2'
                        role='progressbar'
                        aria-valuenow={pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${auction.title} funding progress`}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className='bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full'
                        />
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/auctions/${auction.customAuctionLink}`}
                      aria-label={`View ${auction.title}`}
                      className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                    >
                      View Auction
                      <ArrowRight
                        className='w-4 h-4 group-hover:translate-x-1 transition-transform motion-reduce:transform-none'
                        aria-hidden='true'
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA section */}
      <section className='relative z-10 bg-black/30 backdrop-blur-sm border-t border-white/10 py-12 sm:py-16'>
        <div className='max-w-4xl mx-auto px-3 sm:px-6 text-center'>
          <h2 className='text-2xl sm:text-3xl font-bold text-white mb-3'>
            Help Us Make a Difference
          </h2>
          <p className='text-base text-white/70 mb-7 max-w-2xl mx-auto'>
            Every auction supports our mission to rescue and care for dachshunds in need.
          </p>
          <div className='flex flex-wrap gap-3 justify-center'>
            <Link
              to='/donate'
              className='bg-white text-purple-900 font-bold py-3 px-7 rounded-xl hover:bg-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
            >
              Donate
            </Link>
            <Link
              to='/adopt'
              className='border-2 border-white text-white font-bold py-3 px-7 rounded-xl hover:bg-white hover:text-purple-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
            >
              Adopt
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auctions;
