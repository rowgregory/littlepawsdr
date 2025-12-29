import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Trophy, User, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { useAuctionSelector } from '../../redux/toolkitStore';
import MotionLink from '../../components/common/MotionLink';

const Auctions = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'upcoming' | 'ended'>('all');
  const { auctions } = useAuctionSelector();

  const filteredAuctions = auctions.filter((auction: any) => {
    if (activeFilter === 'all') return true;
    return auction.status?.toLowerCase() === activeFilter;
  });

  const stats = [
    {
      label: 'Active Auctions',
      value: auctions.filter((a: any) => a.status === 'ACTIVE').length,
      icon: Heart,
    },
    {
      label: 'Total Raised',
      value: `$${auctions
        .reduce((sum: number, a: any) => sum + (a.totalAuctionRevenue || 0), 0)
        .toLocaleString()}`,
      icon: Zap,
    },
    {
      label: 'Supporters',
      value: auctions
        .reduce((sum: number, a: any) => sum + (a.supporters || 0), 0)
        .toLocaleString(),
      icon: Users,
    },
  ];
  return (
    <div className='bg-gray-50'>
      {/* Top Navigation Bar */}
      <div className='bg-white border-b border-gray-200 sticky top-0 z-50'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between'>
          <Link to='/'>
            <span className='text-xl font-bold text-gray-900'>Little Paws</span>
          </Link>

          <MotionLink to='/supporter/profile' variant='icon'>
            <User className='w-6 h-6' />
          </MotionLink>
        </div>
      </div>
      {/* Header */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 py-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className='text-4xl sm:text-5xl font-bold text-gray-900 mb-4'>Auctions</h1>
            <p className='text-lg text-gray-600 max-w-2xl'>
              Bid on unique items and support our mission to rescue and care for dachshunds in need.
            </p>

            {/* Stats */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10'>
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className='bg-gray-50 rounded-lg p-6 border border-gray-200'
                  >
                    <div className='flex items-center gap-3 mb-2'>
                      <Icon className='w-5 h-5 text-gray-700' />
                      <p className='text-sm text-gray-600'>{stat.label}</p>
                    </div>
                    <p className='text-3xl font-bold text-gray-900'>{stat.value}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-12 min-h-[calc(100vh-(401px+371px))]'>
        {/* Filter & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='flex items-center justify-between mb-8 flex-wrap gap-4'
        >
          <div>
            <h2 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
              <Sparkles className='w-6 h-6 text-gray-700' />
              Available Auctions
            </h2>
            <p className='text-gray-600 mt-1'>{filteredAuctions.length} auctions</p>
          </div>

          {/* Filter Buttons */}
          <div className='flex gap-2 flex-wrap'>
            {(['all', 'active', 'upcoming', 'ended'] as const).map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeFilter === filter
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Auctions Grid */}
        {filteredAuctions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-20'
          >
            <Trophy className='w-16 h-16 text-gray-300 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-gray-900'>No auctions found</h3>
            <p className='text-gray-600 mt-2'>Check back soon for new auctions</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          >
            {filteredAuctions.map((auction: any, i: number) => (
              <motion.div
                key={auction._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2 }}
                className='bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all'
              >
                {/* Header */}
                <div className='bg-gray-50 p-6 border-b border-gray-200'>
                  <div className='flex items-start justify-between gap-2 mb-3'>
                    <h3 className='text-lg font-bold text-gray-900 line-clamp-2 flex-1'>
                      {auction.title}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                        auction.status === 'ACTIVE'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : auction.status === 'DRAFT'
                          ? 'bg-gray-100 text-gray-700 border border-gray-300'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          auction.status === 'ACTIVE' ? 'bg-green-600' : 'bg-gray-400'
                        }`}
                      ></span>
                      {auction.status === 'ACTIVE'
                        ? 'Live'
                        : auction.status === 'DRAFT'
                        ? 'Upcoming'
                        : 'Ended'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className='p-6 space-y-4'>
                  {/* Stats Grid */}
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='bg-gray-50 rounded p-3'>
                      <p className='text-xs text-gray-600 mb-1'>Goal</p>
                      <p className='text-lg font-bold text-gray-900'>
                        ${auction.goal?.toLocaleString()}
                      </p>
                    </div>
                    <div className='bg-gray-50 rounded p-3'>
                      <p className='text-xs text-gray-600 mb-1'>Raised</p>
                      <p className='text-lg font-bold text-green-700'>
                        ${auction.totalAuctionRevenue?.toLocaleString()}
                      </p>
                    </div>
                    <div className='bg-gray-50 rounded p-3'>
                      <p className='text-xs text-gray-600 mb-1'>Items</p>
                      <p className='text-lg font-bold text-gray-900'>
                        {auction.items?.length || 0}
                      </p>
                    </div>
                    <div className='bg-gray-50 rounded p-3'>
                      <p className='text-xs text-gray-600 mb-1'>Supporters</p>
                      <p className='text-lg font-bold text-gray-900'>{auction.supporters || 0}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className='flex items-center justify-between mb-2'>
                      <p className='text-xs text-gray-600'>Progress</p>
                      <p className='text-xs font-semibold text-gray-900'>
                        {Math.round((auction.totalAuctionRevenue / auction.goal) * 100)}%
                      </p>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(
                            (auction.totalAuctionRevenue / auction.goal) * 100,
                            100
                          )}%`,
                        }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className='bg-gray-900 h-2 rounded-full'
                      ></motion.div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/auctions/${auction.customAuctionLink}`}
                    className='w-full flex items-center justify-center gap-2 mt-6 px-4 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors group'
                  >
                    View Auction
                    <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='bg-gray-900 text-white py-16 sm:py-20'
      >
        <div className='max-w-4xl mx-auto px-4 sm:px-6 text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-4'>Help Us Make a Difference</h2>
          <p className='text-lg text-gray-300 mb-8 max-w-2xl mx-auto'>
            Every auction supports our mission to rescue and care for dachshunds in need.
          </p>

          <div className='flex flex-wrap gap-4 justify-center'>
            <Link
              to='/donate'
              className='bg-white text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors'
            >
              Donate
            </Link>
            <Link
              to='/adopt'
              className='border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-gray-900 transition-colors'
            >
              Adopt
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Auctions;
