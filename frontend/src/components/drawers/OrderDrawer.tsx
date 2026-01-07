import { formatDateWithTimezone } from '../../utils/dateFunctions';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useUpdateShippingStatusMutation } from '../../redux/services/orderApi';
import { useAppDispatch, useFormSelector, useOrderSelector } from '../../redux/toolkitStore';
import { showToast } from '../../redux/features/toastSlice';
import { setCloseOrderDrawer } from '../../redux/features/ordersSlice';

const OrderDrawer = () => {
  const [updateShippingStatus, { isLoading }] = useUpdateShippingStatusMutation();
  const dispatch = useAppDispatch();
  const { orderDrawer } = useOrderSelector();
  const { adminOrderForm } = useFormSelector();
  const inputs = adminOrderForm?.inputs;
  const order = inputs?.order;
  const onClose = () => dispatch(setCloseOrderDrawer());

  const hasPhysicalProduct =
    order?.items?.some(
      (item: any) => item.itemType === 'product' && item.isPhysicalProduct === true
    ) || order?.isProduct;

  const handleCompleteOrder = async (orderId: string) => {
    try {
      await updateShippingStatus({ orderId }).unwrap();
      dispatch(showToast({ message: 'Order Complete!', type: 'success' }));
      onClose();
    } catch (error) {
      dispatch(showToast({ message: 'Failed to mark as complete', type: 'error' }));
    }
  };

  return (
    <AnimatePresence>
      {orderDrawer && (
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
            <div className='flex items-center justify-between border-b border-gray-200 p-6'>
              <div>
                <h2 className='text-xl font-bold text-gray-900'>Order Details</h2>
                <p className='text-xs text-gray-600 mt-1'>Order ID: {order?._id?.slice(-8)}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <X className='w-5 h-5 text-gray-900' />
              </motion.button>
            </div>

            {/* Content */}
            <div className='flex-1 overflow-y-auto p-6 space-y-6'>
              {/* Customer Info */}
              <div>
                <h3 className='text-sm font-semibold text-gray-900 mb-2'>Customer</h3>
                <p className='text-sm font-medium text-gray-900'>{order?.name}</p>
                <p className='text-xs text-gray-600'>{order?.email}</p>
                {order?.user?.createdAt && (
                  <p className='text-xs text-gray-600 mt-1'>
                    Member since {formatDateWithTimezone(order?.user?.createdAt)}
                  </p>
                )}
              </div>

              {/* Order Items */}
              <div>
                <h3 className='text-sm font-semibold text-gray-900 mb-3'>Items</h3>
                <div className='space-y-2'>
                  {order?.items?.map((item: any, i: number) => (
                    <div key={i} className='flex items-start gap-3 p-4 bg-gray-50 rounded-lg'>
                      <img
                        src={item.itemImage}
                        alt={item.itemName}
                        className='w-12 h-12 rounded object-cover flex-shrink-0'
                      />
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-semibold text-gray-900'>{item.itemName}</p>

                        {/* Ecard details */}
                        {item.itemType === 'ecard' && (
                          <div className='text-xs text-gray-600 space-y-1 mt-1'>
                            <p>
                              To:{' '}
                              <span className='font-medium text-gray-900'>
                                {item.recipientsFullName || item.recipientsEmail}
                              </span>
                            </p>
                            {item.message && (
                              <p className='italic text-gray-500 line-clamp-2'>"{item.message}"</p>
                            )}
                            <p className='text-gray-600'>
                              Sending:{' '}
                              {item.sendNow === 'send-now'
                                ? 'Immediately'
                                : item.dateToSend
                                ? new Date(item.dateToSend).toLocaleDateString()
                                : 'Scheduled'}
                            </p>
                          </div>
                        )}

                        {/* Welcome Wiener details */}
                        {item.itemType === 'welcomeWiener' && (
                          <div className='text-xs text-gray-600 space-y-1 mt-1'>
                            <p>
                              Supporting:{' '}
                              <span className='font-medium text-gray-900'>{item.itemName}</span>
                            </p>
                            <p className='text-teal-600 font-medium'>
                              Your donation helps this dachshund!
                            </p>
                          </div>
                        )}

                        {/* Product details */}
                        {item.itemType === 'product' && (
                          <div className='text-xs text-gray-600 space-y-1 mt-1'>
                            <p className='text-gray-700'>
                              {item.quantity} × ${item.price?.toFixed(2)}
                              {item.isPhysicalProduct && ' (Physical)'}
                            </p>
                            {item.size && (
                              <p>
                                Size: <span className='font-medium'>{item.size}</span>
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className='text-right flex-shrink-0'>
                        <p className='text-sm font-semibold text-gray-900'>
                          ${item.totalPrice?.toFixed(2)}
                        </p>
                        <p className='text-xs text-gray-600 mt-1'>{item.quantity} qty</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Summary */}
              <div className='bg-gray-50 rounded-lg p-4 space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='font-medium text-gray-900'>${order?.subtotal?.toFixed(2)}</span>
                </div>

                {hasPhysicalProduct && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Shipping</span>
                    <span className='font-medium text-gray-900'>
                      ${order?.shippingPrice?.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className='border-t border-gray-200 pt-2'>
                  <div className='flex justify-between'>
                    <span className='font-semibold text-gray-900'>Total</span>
                    <span className='text-lg font-bold text-gray-900'>
                      ${order?.totalPrice?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              {hasPhysicalProduct && order?.shippingAddress && (
                <div>
                  <h3 className='text-sm font-semibold text-gray-900 mb-3'>Shipping Address</h3>
                  <div className='bg-gray-50 rounded-lg p-4 text-sm space-y-1'>
                    <p className='font-medium text-gray-900'>{order?.shippingAddress?.name}</p>
                    <p className='text-gray-700'>{order?.shippingAddress?.address}</p>
                    {order?.shippingAddress?.addressLine2 && (
                      <p className='text-gray-700'>{order?.shippingAddress?.addressLine2}</p>
                    )}
                    <p className='text-gray-700'>
                      {order?.shippingAddress?.city}, {order?.shippingAddress?.state}{' '}
                      {order?.shippingAddress?.zipPostalCode}
                    </p>
                  </div>
                </div>
              )}

              {/* Order Status */}
              <div className='space-y-3'>
                <div>
                  <p className='text-xs text-gray-600 uppercase font-semibold mb-2'>
                    Payment Status
                  </p>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      order?.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {order?.status}
                  </span>
                </div>

                {hasPhysicalProduct && (
                  <div>
                    <p className='text-xs text-gray-600 uppercase font-semibold mb-2'>
                      Shipping Status
                    </p>
                    <div className='flex items-center gap-2'>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          order?.shippingStatus === 'delivered'
                            ? 'bg-green-100 text-green-700'
                            : order?.shippingStatus === 'shipped'
                            ? 'bg-blue-100 text-blue-700'
                            : order?.shippingStatus === 'processing'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {order?.shippingStatus || 'not-shipped'}
                      </span>

                      <motion.button
                        whileHover={{ scale: isLoading ? 1 : 1.05 }}
                        whileTap={{ scale: isLoading ? 1 : 0.95 }}
                        onClick={() => handleCompleteOrder(order?._id)}
                        disabled={isLoading}
                        className='ml-auto px-3 py-1.5 text-xs font-semibold bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors'
                      >
                        {isLoading ? 'Updating...' : 'Mark Shipped'}
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderDrawer;
