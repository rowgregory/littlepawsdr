import { AnimatePresence, motion } from 'framer-motion';
import { resetForm } from '../../redux/features/form/formSlice';
import { useAppDispatch, useAuctionSelector, useFormSelector } from '../../redux/toolkitStore';
import { ArrowRight, Clock, ImageIcon, TrendingUp, X } from 'lucide-react';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import { setCloseAuctionItemBidsDrawer } from '../../redux/features/auctionSlice';

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Paid':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'Top Bid':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Outbid':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
};

const AuctionItemBidsDrawer = () => {
  const dispatch = useAppDispatch();
  const { auctionItemBidsForm } = useFormSelector();
  const auctionItem = auctionItemBidsForm?.inputs;
  const { auction, auctionItemBidsDrawer } = useAuctionSelector();

  const bids = auctionItem?.bids || [];
  const instantBuyers = auctionItem?.instantBuyers || [];
  const isBids = bids.length > 0;
  const isInstantBuyers = instantBuyers.length > 0;

  const onClose = () => {
    dispatch(setCloseAuctionItemBidsDrawer());
    dispatch(resetForm('auctionItemBidsForm'));
  };

  return (
    <AnimatePresence>
      {auctionItemBidsDrawer && (
        <>
          {/* Backdrop */}
          <motion.div
            className='fixed inset-0 bg-black/50 z-[100]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />

          {/* Drawer */}
          <motion.div
            className='fixed right-0 top-0 h-screen w-full max-w-2xl bg-white z-[101] overflow-y-auto'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
              <div>
                <h2 className='text-lg font-bold text-gray-900'>{auctionItem?.name}</h2>
                <p className='text-xs text-gray-600 mt-1'>#{auctionItem?._id}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className='p-2 hover:bg-gray-100 rounded-lg'
              >
                <X className='w-5 h-5 text-gray-900' />
              </motion.button>
            </div>

            {/* Content */}
            <div className='p-6 space-y-6'>
              {/* Bids/Instant Buys Table */}
              {(isBids || isInstantBuyers) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className='flex items-center gap-3 pb-4 border-b border-gray-200 mb-4'>
                    <div className='p-2 bg-gray-100 rounded-lg'>
                      <TrendingUp className='w-5 h-5 text-gray-700' />
                    </div>
                    <div>
                      <h3 className='text-lg font-bold text-gray-900'>
                        {auctionItem?.sellingFormat === 'fixed' ? 'Instant Buys' : 'Bids'}
                      </h3>
                      <p className='text-sm text-gray-600 mt-0.5'>
                        {(bids?.length || 0) + (instantBuyers?.length || 0)} total
                      </p>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    {/* Bids */}
                    {auctionItem?.bids
                      ?.map((bid: any, i: number) => (
                        <div
                          key={i}
                          className='p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                        >
                          <div className='flex items-center justify-between mb-2'>
                            <p className='font-semibold text-gray-900'>
                              {formatPrice(bid?.bidAmount)}
                            </p>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusStyle(
                                bid?.status
                              )}`}
                            >
                              {bid?.status}
                            </span>
                          </div>
                          <p className='text-sm text-gray-700 mb-1'>{bid?.bidder}</p>
                          <p className='text-xs text-gray-600'>
                            {formatDateWithTimezone(bid?.createdAt)}
                          </p>
                        </div>
                      ))
                      .reverse()}

                    {/* Instant Buyers */}
                    {instantBuyers?.map((instantBuyer: any, i: number) => (
                      <div
                        key={`instant-${i}`}
                        className='p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
                      >
                        <div className='flex items-center justify-between mb-2'>
                          <p className='font-semibold text-gray-900'>
                            {formatPrice(instantBuyer?.totalPrice)}
                          </p>
                          <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200'>
                            {instantBuyer?.paymentStatus}
                          </span>
                        </div>
                        <p className='text-sm text-gray-700 mb-1'>{instantBuyer?.name}</p>
                        <p className='text-xs text-gray-600'>
                          {formatDateWithTimezone(instantBuyer?.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Description */}
              <div>
                <h3 className='font-bold text-gray-900 mb-2'>Description</h3>
                <p className='text-sm text-gray-700 leading-relaxed'>{auctionItem?.description}</p>
              </div>

              {/* Price */}
              <div className='bg-gray-50 rounded-lg p-4'>
                <p className='text-xs text-gray-600 mb-1'>
                  {auctionItem?.sellingFormat === 'auction' ? 'Current Bid' : 'Buy Now Price'}
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {formatPrice(auctionItem?.buyNowPrice || auctionItem?.currentBid || 0)}
                </p>
              </div>

              {/* Item Photos */}
              <div>
                <h3 className='font-bold text-gray-900 mb-3'>Photos</h3>
                {auctionItem?.photos && auctionItem.photos.length > 0 ? (
                  <div className='grid grid-cols-3 gap-3'>
                    {auctionItem.photos.map((photo: { _id: any; url: string }, index: number) => (
                      <motion.div
                        key={photo._id || index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className='relative group'
                      >
                        <img
                          src={photo.url}
                          alt={`${auctionItem.name} - ${index + 1}`}
                          className='w-full aspect-square object-contain rounded-lg border bg-gray-100 border-gray-200'
                        />
                        <div className='absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity'>
                          {index + 1}/{auctionItem.photos.length}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className='w-full aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center'>
                    <div className='text-center'>
                      <ImageIcon className='w-8 h-8 text-gray-400 mx-auto mb-2' />
                      <p className='text-gray-500 text-sm'>No images</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Auction Timeline */}
              <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                <h3 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <Clock className='w-4 h-4' />
                  Timeline
                </h3>
                <div className='flex items-center gap-3 text-sm'>
                  <div>
                    <p className='text-gray-600 text-xs mb-1'>Starts</p>
                    <p className='font-semibold text-gray-900'>
                      {formatDateWithTimezone(auction?.startDate)}
                    </p>
                  </div>
                  <div className='flex-1 flex items-center gap-2'>
                    <div className='flex-1 h-px bg-gray-300' />
                    <ArrowRight className='w-4 h-4 text-gray-600' />
                    <div className='flex-1 h-px bg-gray-300' />
                  </div>
                  <div>
                    <p className='text-gray-600 text-xs mb-1'>Ends</p>
                    <p className='font-semibold text-gray-900'>
                      {formatDateWithTimezone(auction?.endDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuctionItemBidsDrawer;
