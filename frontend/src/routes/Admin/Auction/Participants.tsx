import { AnimatePresence, motion } from 'framer-motion';
import { Users, Zap } from 'lucide-react';
import { useAppDispatch, useAuctionSelector } from '../../../redux/toolkitStore';

import { MoreVertical, Check } from 'lucide-react';
import { useState } from 'react';
import { useUpdateInstantBuyerShippingStatusMutation } from '../../../redux/services/auctionApi';
import { showToast } from '../../../redux/features/toastSlice';

const Participants = () => {
  const { auction } = useAuctionSelector();
  const dispatch = useAppDispatch();
  const instantBuyers = auction?.instantBuyers;
  const bidders = auction?.bidders || [];

  const [showAction, setShowAction] = useState(false);
  const [loading, setLoading] = useState(false);

  const [updateShippingAddress] = useUpdateInstantBuyerShippingStatusMutation();

  const handleMarkComplete = async (id: string) => {
    setLoading(true);
    try {
      await updateShippingAddress({ id }).unwrap();
      dispatch(
        showToast({ message: 'Sucessfully update auction instant buyer!', type: 'success' })
      );
      setShowAction(false);
    } catch (err) {
      dispatch(showToast({ message: 'Error updating shipping status', type: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mx-auto space-y-6'>
        {/* Two Column Grid - Bidders & Winners Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left Column - Instant Buyers (Sidebar) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6 h-fit'
          >
            <div className='flex items-center gap-3 pb-4 border-b border-gray-200 mb-4'>
              <div className='p-2 bg-gray-100 rounded-lg'>
                <Zap className='w-5 h-5 text-gray-700' />
              </div>
              <div>
                <h2 className='font-bold text-gray-900'>Instant Buyers</h2>
                <p className='text-xs text-gray-600'>{instantBuyers?.length} purchases</p>
              </div>
            </div>

            {instantBuyers?.length === 0 ? (
              <EmptyState title='No instant buyers' message='Fixed-price items not purchased yet' />
            ) : (
              <div className='space-y-2 max-h-96 overflow-y-auto'>
                {instantBuyers?.map((buyer: any) => (
                  <motion.div
                    key={buyer?._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-gray-50 rounded p-3 border border-gray-200 hover:border-gray-300 transition-all'
                  >
                    <div className='flex items-start justify-between gap-2'>
                      <div className='min-w-0 flex-1'>
                        <h3 className='font-semibold text-gray-900 text-sm truncate'>
                          {buyer.name || 'Unknown'}
                        </h3>
                        <p className='text-xs text-gray-600 mt-1 line-clamp-1'>
                          {buyer.auctionItem?.name || 'Item name not available'}
                        </p>
                      </div>
                      <p className='text-xs text-gray-500 flex-shrink-0 whitespace-nowrap ml-2'>
                        {new Date(buyer.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className='flex items-center justify-between mt-3 pt-2 border-t border-gray-200'>
                      <p className='text-sm font-bold text-green-600'>
                        ${buyer.totalPrice?.toFixed(2) || '0.00'}
                      </p>

                      <div className='flex items-center gap-1'>
                        {/* Status Badge */}
                        <motion.div
                          layout
                          className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${
                            buyer.isDigital
                              ? 'bg-blue-50 text-blue-700'
                              : buyer.shippingStatus === 'Complete'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-yellow-50 text-yellow-700'
                          }`}
                        >
                          {buyer.shippingStatus}
                        </motion.div>

                        {/* Only show for physical items */}
                        {!buyer.isDigital && (
                          <>
                            {/* Complete Button - hidden/shown */}
                            {buyer?.shippingStatus !== 'Complete' && (
                              <>
                                <AnimatePresence mode='popLayout'>
                                  {showAction ? (
                                    <motion.button
                                      key='complete'
                                      initial={{ opacity: 0, width: 0 }}
                                      animate={{ opacity: 1, width: 'auto' }}
                                      exit={{ opacity: 0, width: 0 }}
                                      transition={{
                                        duration: 0.2,
                                        ease: 'easeInOut',
                                      }}
                                      onClick={() => handleMarkComplete(buyer?._id)}
                                      disabled={loading}
                                      className='px-2 py-0.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap'
                                    >
                                      <Check className='w-3.5 h-3.5' />
                                      {loading ? 'Updating...' : 'Complete'}
                                    </motion.button>
                                  ) : null}
                                </AnimatePresence>

                                {/* Ellipsis - stays visible */}
                                <motion.button
                                  layout
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setShowAction(!showAction)}
                                  className='p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors flex-shrink-0'
                                >
                                  <MoreVertical className='w-4 h-4' />
                                </motion.button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column - Bidders & Winners Stacked */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Bidders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='bg-white border border-gray-200 rounded-lg p-6'
            >
              <div className='flex items-center gap-3 pb-4 border-b border-gray-200 mb-4'>
                <div className='p-2 bg-gray-100 rounded-lg'>
                  <Users className='w-5 h-5 text-gray-700' />
                </div>
                <div>
                  <h2 className='font-bold text-gray-900'>Active Bidders</h2>
                  <p className='text-xs text-gray-600'>{bidders.length} bidders in this auction</p>
                </div>
              </div>

              {bidders.length === 0 ? (
                <p className='text-sm text-gray-500 text-center py-8'>No bidders yet</p>
              ) : (
                <div className='overflow-x-auto'>
                  <table className='w-full text-sm'>
                    <thead>
                      <tr className='border-b border-gray-200'>
                        <th className='text-left py-3 px-4 font-semibold text-gray-900'>Name</th>
                        <th className='text-left py-3 px-4 font-semibold text-gray-900'>Bids</th>
                        <th className='text-left py-3 px-4 font-semibold text-gray-900'>
                          Last Bid
                        </th>
                        <th className='text-left py-3 px-4 font-semibold text-gray-900'>Status</th>
                        <th className='text-left py-3 px-4 font-semibold text-gray-900'>Date</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                      {bidders.map((bidder: any) => (
                        <motion.tr
                          key={bidder._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className='hover:bg-gray-50 transition-colors'
                        >
                          <td className='py-3 px-4'>
                            <div>
                              <p className='font-semibold text-gray-900'>
                                {bidder.user?.name || 'Anonymous'}
                              </p>
                              {bidder.user?.email && (
                                <p className='text-xs text-gray-600 mt-0.5'>{bidder.user.email}</p>
                              )}
                            </div>
                          </td>
                          <td className='py-3 px-4'>
                            <p className='font-bold text-gray-900'>{bidder.bids?.length || 0}</p>
                          </td>
                          <td className='py-3 px-4'>
                            {bidder.bids?.length > 0 ? (
                              <p className='font-bold text-purple-600'>
                                ${bidder.bids[bidder.bids.length - 1]?.bidAmount}
                              </p>
                            ) : (
                              <p className='text-gray-500'>—</p>
                            )}
                          </td>
                          <td className='py-3 px-4'>
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                bidder.status === 'Active'
                                  ? 'bg-green-50 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {bidder.status}
                            </span>
                          </td>
                          <td className='py-3 px-4 text-gray-600'>
                            {new Date(bidder.createdAt).toLocaleDateString()}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ title, message }: any) => (
  <div className='text-center py-6'>
    <p className='font-medium text-gray-900 text-sm'>{title}</p>
    <p className='text-xs text-gray-600 mt-1'>{message}</p>
  </div>
);

export default Participants;
