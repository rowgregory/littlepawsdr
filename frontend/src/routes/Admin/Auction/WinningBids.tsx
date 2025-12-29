import { useAppDispatch, useAuctionSelector, useTableSelector } from '../../../redux/toolkitStore';
import { Fragment, useEffect, useMemo, useState } from 'react';
import WinningBidsTable from '../../../components/tables/WinningBidsTable';
import { setInitialArray, setSearchQuery } from '../../../redux/features/tableSlice';
import getPaymentMethodLabel from '../../../lib/utils/auction/getPaymentMethodLabel';
import { motion } from 'framer-motion';
import { Search, Trophy } from 'lucide-react';

const WinningBids = () => {
  const dispatch = useAppDispatch();
  const { auction } = useAuctionSelector();
  const { filteredArray } = useTableSelector();
  const [showSearch, setShowSearch] = useState(false);
  const winningBids = auction?.winningBids;
  const winningBidsTotal = winningBids?.length;
  const noWinningBids = winningBids?.length === 0;

  useEffect(() => {
    dispatch(setInitialArray({ arrayToFilter: winningBids }));
  }, [winningBids, dispatch]);

  const handleSearch = (e: any) => {
    dispatch(setSearchQuery({ text: e.target.value, arrayToFilter: winningBids }));
  };

  // Calculate payment method breakdown
  const paymentBreakdown = useMemo(() => {
    if (!winningBids) return { total: 0, paid: 0, pending: 0, methods: {} };

    const breakdown = winningBids.reduce(
      (acc: any, bid: any) => {
        // Count total and paid
        if (bid.winningBidPaymentStatus === 'Paid') {
          acc.paid += 1;

          // Count payment methods (only for paid bids)
          if (bid.manualPayment && bid.paymentMethod) {
            acc.methods[bid.paymentMethod] = (acc.methods[bid.paymentMethod] || 0) + 1;
          } else if (bid.payPalId) {
            acc.methods.paypal = (acc.methods.paypal || 0) + 1;
          }
        } else {
          acc.pending += 1;
        }

        return acc;
      },
      { total: winningBids.length, paid: 0, pending: 0, methods: {} }
    );

    return breakdown;
  }, [winningBids]);

  return (
    <Fragment>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex items-center justify-between gap-3 pb-4 border-b border-gray-200 mb-6'
      >
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-gray-100 rounded-lg'>
            <Trophy className='w-5 h-5 text-gray-700' />
          </div>
          <div>
            <h3 className='text-lg font-bold text-gray-900'>Winning Bidders</h3>
            <p className='text-sm text-gray-600 mt-1'>{winningBidsTotal || 0} winners</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSearch(!showSearch)}
          className='p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0'
          title='Search'
        >
          <Search className='w-5 h-5 text-gray-600' />
        </motion.button>
      </motion.div>

      {/* Payment Stats Bar */}
      {!noWinningBids && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6'
        >
          {/* Paid */}
          <div className='bg-white border border-gray-200 rounded-lg p-4'>
            <p className='text-xs text-gray-600 mb-1'>Paid</p>
            <p className='text-2xl font-bold text-green-600'>{paymentBreakdown.paid}</p>
          </div>

          {/* Pending */}
          <div className='bg-white border border-gray-200 rounded-lg p-4'>
            <p className='text-xs text-gray-600 mb-1'>Pending</p>
            <p className='text-2xl font-bold text-yellow-600'>{paymentBreakdown.pending}</p>
          </div>

          {/* Payment Methods */}
          <div className='col-span-2 sm:col-span-2 bg-white border border-gray-200 rounded-lg p-4'>
            <p className='text-xs text-gray-600 mb-2'>Payment Methods</p>
            {Object.keys(paymentBreakdown.methods).length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {Object.entries(paymentBreakdown.methods).map(([method, count]: [string, any]) => (
                  <span
                    key={method}
                    className='inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs'
                  >
                    <span className='text-gray-700 font-medium'>
                      {getPaymentMethodLabel(method)}
                    </span>
                    <span className='font-bold text-gray-900'>{count}</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className='text-xs text-gray-500'>No payments yet</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Search Bar - Hidden by default */}
      {showSearch && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className='mb-6 relative'
        >
          <motion.input
            autoFocus
            type='text'
            placeholder='Search bidders by name or email...'
            onChange={handleSearch}
            className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
          />
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
        </motion.div>
      )}

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white border border-gray-200 rounded-lg overflow-hidden'
      >
        {noWinningBids ? (
          <div className='text-center py-12'>
            <Trophy className='w-12 h-12 text-gray-300 mx-auto mb-4' />
            <p className='text-gray-500'>No winning bids yet</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <WinningBidsTable filteredData={filteredArray} />
          </div>
        )}
      </motion.div>
    </Fragment>
  );
};

export default WinningBids;
