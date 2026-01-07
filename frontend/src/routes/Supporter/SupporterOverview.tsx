import { motion } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  TrendingUp,
  ArrowRight,
  Zap,
  Mail,
  HeartHandshake,
  Gavel,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserSelector } from '../../redux/toolkitStore';
import { IAuctionItemInstantBuyer } from '../../types/entities/auction-item-instant-buyer';

const SupporterOverview = () => {
  const { user } = useUserSelector();

  const stats = [
    {
      label: 'Total Donations',
      value: user?.donations?.length,
      icon: Heart,
      linkKey: '/supporter/donations',
    },
    {
      label: 'Purchases Made',
      value: user?.orders?.length ?? 0,
      icon: ShoppingBag,
      linkKey: '/supporter/orders',
    },
    {
      label: 'Adoption Applications',
      value: user?.adoptionFees?.length ?? 0,
      icon: HeartHandshake,
      linkKey: '/supporter/adoption-applications',
    },
    {
      label: 'Total Bids',
      value: user?.bids?.length ?? 0,
      icon: Gavel,
      linkKey: '/supporter/auctions',
    },
  ];

  return (
    <div className='space-y-8'>
      {/* Welcome Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className='text-3xl font-bold text-gray-900'>Welcome back, {user?.firstName}</h1>
        <p className='text-gray-600 mt-2'>Here's your activity snapshot</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              to={stat.linkKey}
              key={i}
              className='bg-white border border-gray-200 rounded-lg p-6'
            >
              <div className='flex items-center justify-between mb-4'>
                <div className={`p-2 bg-gray-50 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-gray-600`} />
                </div>
                <TrendingUp className='w-4 h-4 text-gray-400' />
              </div>
              <p className='text-sm text-gray-600'>{stat.label}</p>
              <p className='text-2xl font-bold text-gray-900 mt-1'>{stat.value}</p>
            </Link>
          );
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6'
        >
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-lg font-bold text-gray-900'>Recent Activity</h2>
          </div>

          <div className='space-y-4'>
            {/* Adoption Application Fees */}
            {user?.adoptionFees?.slice(0, 3)?.map((adoptionFee) => (
              <motion.div
                key={adoptionFee._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className='flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all'
              >
                <div className='flex items-center gap-3 flex-1 min-w-0'>
                  <div className='p-2 bg-green-50 rounded-lg flex-shrink-0'>
                    <FileText className='w-4 h-4 text-gray-600' />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2'>
                      <p className='text-sm font-semibold text-gray-900'>
                        {adoptionFee.firstName} {adoptionFee.lastName}
                      </p>
                      {adoptionFee.bypassCode && (
                        <span className='text-xs font-bold px-2 py-1 bg-purple-100 text-purple-700 rounded-full'>
                          Bypass Code
                        </span>
                      )}
                    </div>
                    <div className='flex items-center gap-2 mt-1 flex-wrap'>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          adoptionFee.applicationStatus === 'Active'
                            ? 'bg-blue-100 text-blue-700'
                            : adoptionFee.applicationStatus === 'Approved'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {adoptionFee.applicationStatus}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          adoptionFee.tokenStatus === 'Valid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {adoptionFee.tokenStatus}
                      </span>
                      <span className='text-xs text-gray-600'>{adoptionFee.state}</span>
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>
                      {new Date(adoptionFee.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className='text-sm font-bold text-gray-900 whitespace-nowrap ml-4 flex-shrink-0'>
                  ${adoptionFee?.feeAmount?.toFixed(2) || '—'}
                </p>
              </motion.div>
            ))}

            {/* Recent Donations */}
            {user?.donations?.slice(0, 3)?.map((donation) => (
              <motion.div
                key={donation._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className='flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all'
              >
                <div className='flex items-center gap-3 flex-1'>
                  <div className='p-2 bg-gray-50 rounded-lg'>
                    <Heart className='w-4 h-4 text-gray-600' />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-semibold text-gray-900'>Donation</p>

                    <p className='text-xs text-gray-500 mt-1'>
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className='text-sm font-bold text-gray-900 whitespace-nowrap ml-4'>
                  ${donation?.donationAmount?.toFixed(2) || '—'}
                </p>
              </motion.div>
            ))}

            {/* Auction Instant Buys */}
            {user?.instantBuys?.slice(0, 3)?.map((instantBuy: IAuctionItemInstantBuyer) => (
              <motion.div
                key={instantBuy._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className='flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all'
              >
                <div className='flex items-center gap-3 flex-1'>
                  <div
                    className={`p-2 rounded-lg ${
                      instantBuy.isDigital ? 'bg-purple-50' : 'bg-blue-50'
                    }`}
                  >
                    {instantBuy.isDigital ? (
                      <Mail className='w-4 h-4 text-gray-600' />
                    ) : (
                      <Zap className='w-4 h-4 text-gray-600' />
                    )}
                  </div>

                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-semibold text-gray-900'>
                      {instantBuy.auctionItem.name}
                    </p>

                    <div className='text-xs text-gray-600 space-y-0.5'>
                      <p>Auction Instant Buy</p>
                      {instantBuy.isDigital ? (
                        <p className='text-green-600 font-medium'>Digital Item</p>
                      ) : (
                        <p>Shipping: {instantBuy.shippingStatus || 'Pending'}</p>
                      )}
                    </div>

                    <div className='text-xs text-gray-500 mt-1'>
                      {new Date(instantBuy.createdAt).toLocaleDateString()} · Payment:{' '}
                      {instantBuy.paymentStatus}
                    </div>
                  </div>
                </div>

                <p className='text-sm font-bold text-gray-900 whitespace-nowrap ml-4'>
                  ${instantBuy.totalPrice}
                </p>
              </motion.div>
            ))}

            {/* Recent Purchases */}
            {user?.orders?.slice(0, 3)?.map((order: any) => {
              const itemCount = order.items?.length || 0;

              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className='flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all'
                >
                  <div className='flex items-center gap-3 flex-1 min-w-0'>
                    <div className='p-2 bg-blue-50 rounded-lg flex-shrink-0'>
                      <ShoppingBag className='w-4 h-4 text-gray-600' />
                    </div>

                    <div className='flex-1 min-w-0'>
                      {/* Item count */}
                      <p className='text-sm font-semibold text-gray-900'>
                        {itemCount} item{itemCount !== 1 ? 's' : ''}
                      </p>

                      {/* Items List */}
                      <div className='text-xs text-gray-600 space-y-1 mt-1'>
                        {order.items?.map((item: any) => (
                          <div key={item._id}>
                            {item.itemType === 'product' && (
                              <p>
                                {item.itemName}
                                {item.size && ` (${item.size})`} × {item.quantity}
                              </p>
                            )}

                            {item.itemType === 'ecard' && (
                              <p>
                                E-card to {item.recipientsFullName || item.recipientsEmail}
                                {item.sendNow === 'send-now'
                                  ? ' - Sending now'
                                  : ` - ${new Date(item.dateToSend).toLocaleDateString()}`}
                              </p>
                            )}

                            {item.itemType === 'welcomeWiener' && <p>Supporting {item.itemName}</p>}
                          </div>
                        ))}
                      </div>

                      <p className='text-xs text-gray-500 mt-2'>
                        {new Date(order.createdAt).toLocaleDateString()} · {order.status}
                      </p>
                    </div>
                  </div>

                  <p className='text-sm font-bold text-gray-900 whitespace-nowrap ml-4 flex-shrink-0'>
                    ${order.totalPrice?.toFixed(2) || '—'}
                  </p>
                </motion.div>
              );
            })}

            {user?.donations?.length === 0 && user?.orders?.length === 0 && (
              <div className='text-center py-8'>
                <p className='text-gray-500'>No activity yet</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Auction Status */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='bg-white border border-gray-200 rounded-lg p-4 sm:p-6 h-fit'
        >
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-lg font-bold text-gray-900'>Your Active Bids</h2>
            <Link
              to='/supporter/auctions'
              className='text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1'
            >
              View all <ArrowRight className='w-4 h-4' />
            </Link>
          </div>

          <div className='space-y-3'>
            {user?.bids
              ?.filter((bid) => bid.auction?.status === 'ACTIVE')
              ?.slice(0, 3)
              ?.map((bid) => (
                <motion.div
                  key={bid._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className='flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all'
                >
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-semibold text-gray-900 line-clamp-2'>
                      {bid.auctionItem?.name}
                    </p>
                    <div className='flex items-center gap-2 mt-1'>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          bid?.status === 'Top Bid'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {bid?.status}
                      </span>
                      <span className='text-xs text-gray-500'>
                        {new Date(bid.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className='ml-3 flex-shrink-0 text-right'>
                    <p className='text-sm font-bold text-gray-900'>${bid.bidAmount}</p>
                  </div>
                </motion.div>
              ))}
          </div>

          {user?.bids?.length === 0 && (
            <div className='text-center py-8'>
              <p className='text-gray-500'>No bids yet</p>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default SupporterOverview;
