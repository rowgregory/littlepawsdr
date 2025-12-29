import { motion } from 'framer-motion';
import { Gavel, Trophy, Eye, EyeOff, Zap } from 'lucide-react';
import { useAppDispatch, useUserSelector } from '../../redux/toolkitStore';
import { useUpdateUserProfileMutation } from '../../redux/services/userApi';
import { showToast } from '../../redux/features/toastSlice';
import { hydrateUserState } from '../../redux/features/userSlice';
import { formatDate } from '../../utils/dateFunctions';
import { getTimeUntil } from '../../utils/getTimeUntil';
import { Link } from 'react-router-dom';

const SupporterAuctions = () => {
  const dispatch = useAppDispatch();
  const { user } = useUserSelector();
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleAnonymousBiddingToggle = async () => {
    try {
      const response = await updateProfile({
        _id: user?._id,
        anonymousBidding: !user?.anonymousBidding,
      }).unwrap();

      dispatch(hydrateUserState({ user: response.user }));
      dispatch(
        showToast({
          message: `Anonymous bidding ${!user?.anonymousBidding ? 'enabled' : 'disabled'}`,
          type: 'success',
        })
      );
    } catch (error: any) {
      dispatch(
        showToast({
          message: 'Failed to update setting',
          type: 'error',
        })
      );
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className='text-3xl font-bold text-gray-900'>Auctions</h1>
        <p className='text-gray-600 mt-1'>View your bidding activity and manage auction settings</p>
      </motion.div>

      <div className='grid grid-cols-12 gap-6'>
        {/* Settings Section */}
        <div className='col-span-12 lg:col-span-6 space-y-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className=' h-fit bg-white border border-gray-200 rounded-lg p-6'
          >
            <h3 className='text-sm font-semibold text-gray-900 mb-6 uppercase tracking-wide'>
              Auction Settings
            </h3>

            <div className='space-y-6'>
              {/* Anonymous Bidding Toggle */}
              <div className='flex items-center justify-between pb-6 border-b border-gray-200'>
                <div className='flex items-start gap-3'>
                  <div className='p-2 bg-gray-100 rounded-lg mt-1'>
                    {user?.anonymousBidding ? (
                      <Eye className='w-5 h-5 text-gray-600' />
                    ) : (
                      <EyeOff className='w-5 h-5 text-gray-600' />
                    )}
                  </div>
                  <div>
                    <h4 className='text-sm font-semibold text-gray-900'>Anonymous Bidding</h4>
                    <p className='text-xs text-gray-600 mt-1'>
                      {user?.anonymousBidding
                        ? 'Your bids will appear as "Anonymous" to other supporters'
                        : 'Your name will be shown when you place bids'}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAnonymousBiddingToggle}
                  disabled={isLoading}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    user?.anonymousBidding ? 'bg-gray-900' : 'bg-gray-300'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <motion.div
                    initial={false}
                    animate={{ x: user?.anonymousBidding ? 28 : 2 }}
                    className='absolute top-1 left-0 w-6 h-6 bg-white rounded-full shadow-md'
                  />
                </motion.button>
              </div>

              {/* Info Section */}
              <div className='bg-gray-50 rounded-lg p-4'>
                <h4 className='text-sm font-semibold text-gray-900 mb-2'>Privacy Notice</h4>
                <p className='text-xs text-gray-700'>
                  When anonymous bidding is enabled, your name will not be displayed to other
                  supporters viewing the auction. Your identity is only visible to Little Paws staff
                  for administrative purposes.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Winning Bids Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='h-fit bg-white border border-gray-200 rounded-lg p-6'
          >
            <div className='flex items-center gap-3 mb-6'>
              <div className='p-2 bg-fuchsia-50 rounded-lg'>
                <Trophy className='w-4 h-4 text-fuchsia-600' />
              </div>
              <div>
                <h3 className='text-sm font-semibold text-gray-900'>Winning Bids</h3>
                <p className='text-xs text-gray-600'>Auctions you won</p>
              </div>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b border-gray-200'>
                    <th className='text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                      Items
                    </th>
                    <th className='text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                      Final Price
                    </th>
                    <th className='text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                      Payment
                    </th>
                    <th className='text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                      Won Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user?.winningBids?.map((bid, i) => (
                    <tr
                      key={i}
                      className='border-b border-gray-100 hover:bg-gray-50 transition-colors'
                    >
                      <td className='px-4 py-3 text-gray-900'>{bid?.auctionItems?.length}</td>
                      <td className='px-4 py-3 text-gray-900 font-semibold'>${bid.totalPrice}</td>
                      <td className='px-4 py-3'>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            bid.winningBidPaymentStatus === 'Paid'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {bid.winningBidPaymentStatus}
                        </span>
                      </td>
                      <td className='px-4 py-3 text-gray-600'>{formatDate(bid.paidOn)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {user?.winningBids?.length === 0 && (
              <div className='text-center py-8'>
                <p className='text-gray-500'>No winning bids yet</p>
              </div>
            )}
          </motion.div>

          {/* Instant Buys Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='h-fit bg-white border border-gray-200 rounded-lg p-6'
          >
            <div className='flex items-center gap-3 mb-6'>
              <div className='p-2 bg-green-50 rounded-lg'>
                <Zap className='w-4 h-4 text-green-600' />
              </div>
              <div>
                <h3 className='text-sm font-semibold text-gray-900'>Instant Buys</h3>
                <p className='text-xs text-gray-600'>Items purchased</p>
              </div>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b border-gray-200'>
                    <th className='text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                      Item
                    </th>
                    <th className='text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                      Price
                    </th>
                    <th className='text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                      Status
                    </th>
                    <th className='text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                      Purchase Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user?.instantBuys?.map((buy) => (
                    <tr
                      key={buy._id}
                      className='border-b border-gray-100 hover:bg-gray-50 transition-colors'
                    >
                      <td className='px-4 py-3 text-gray-900'>{buy.auctionItem?.name}</td>
                      <td className='px-4 py-3 text-gray-900 font-semibold'>${buy.totalPrice}</td>
                      <td className='px-4 py-3'>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                            buy.shippingStatus === 'Pending Fulfillment'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {buy.shippingStatus}
                        </span>
                      </td>
                      <td className='px-4 py-3 text-gray-600'>{formatDate(buy.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {user?.instantBuys?.length === 0 && (
              <div className='text-center py-8'>
                <p className='text-gray-500'>No instant purchases</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* My Bids Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='col-span-12 lg:col-span-6 h-fit bg-white border border-gray-200 rounded-lg p-6'
        >
          <div className='flex items-center gap-3 mb-6'>
            <div className='p-2 bg-blue-50 rounded-lg'>
              <Gavel className='w-4 h-4 text-blue-600' />
            </div>
            <div>
              <h3 className='text-sm font-semibold text-gray-900'>My Bids</h3>
              <p className='text-xs text-gray-600'>Active bids placed</p>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-gray-200'>
                  <th className='text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Item
                  </th>
                  <th className='text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Bid Amount
                  </th>
                  <th className='text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Time Left
                  </th>
                  <th className='text-center px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...(user?.bids || [])]?.map((bid) => (
                  <tr
                    key={bid?._id}
                    className='border-b border-gray-100 hover:bg-gray-50 transition-colors'
                  >
                    <td className='px-4 py-4'>
                      <div className='space-y-1'>
                        <p className='text-gray-900 font-semibold'>{bid?.auctionItem?.name}</p>
                        <p className='text-xs text-gray-500'>{bid?.auction?.title}</p>
                        <p className='text-xs text-gray-400'>
                          Bid placed {new Date(bid?.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className='px-4 py-4'>
                      <p className='text-gray-900 font-bold text-base'>${bid?.bidAmount}</p>
                    </td>
                    <td className='px-4 py-4'>
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                          bid?.status === 'Top Bid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {bid?.status}
                      </span>
                    </td>
                    <td className='px-4 py-4 text-gray-700 font-medium'>
                      {getTimeUntil(bid?.auction?.endDate)}
                    </td>
                    <td className='px-4 py-4 text-center'>
                      <Link
                        to={`/auctions/${bid?.auction?.customAuctionLink}/item/${bid?.auctionItem?._id}`}
                        className='inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors'
                      >
                        <Eye className='w-4 h-4' />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {user?.bids?.length === 0 && (
            <div className='text-center py-8'>
              <p className='text-gray-500'>No bids yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SupporterAuctions;
