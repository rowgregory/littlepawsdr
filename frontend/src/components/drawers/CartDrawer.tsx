import { toggleCartDrawer } from '../../redux/features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { useAppDispatch, useCartSelector } from '../../redux/toolkitStore';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const { cartDrawer, cartItemsAmount, cartItem, subtotal, shippingPrice, totalPrice } =
    useCartSelector();

  const handleClose = () => dispatch(toggleCartDrawer(false));

  return (
    <>
      <AnimatePresence>
        {cartDrawer && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='fixed inset-0 bg-black z-[199]'
              onClick={handleClose}
            />

            {/* Cart Drawer */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className='fixed top-0 left-0 right-0 bg-white z-[200] shadow-2xl'
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className='absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-lg transition-colors'
                aria-label='Close cart drawer'
              >
                <X className='w-5 h-5 text-gray-600' />
              </motion.button>

              <div className='max-w-6xl mx-auto px-6 py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                  {/* Left Side - Item Added */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className='lg:col-span-7'
                  >
                    {/* Success Message */}
                    <div className='flex items-center mb-6 pb-4 border-b border-gray-200'>
                      <div className='flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3'>
                        <CheckCircle className='w-5 h-5 text-green-600' />
                      </div>
                      <div>
                        <h3 className='text-green-700 font-semibold text-lg'>
                          Item Added Successfully!
                        </h3>
                        <p className='text-green-600 text-sm mt-1'>
                          {cartItem?.quantity ?? 1} item{(cartItem?.quantity ?? 1) > 1 ? 's' : ''}{' '}
                          added to your cart
                        </p>
                      </div>
                    </div>

                    {/* Added Item Details */}
                    <div className='bg-gray-50 rounded-lg p-4'>
                      <div className='flex items-start gap-4'>
                        <div className='flex-shrink-0'>
                          <img
                            src={cartItem?.itemImage}
                            className='w-20 h-20 object-cover rounded-lg border border-gray-200'
                            alt={cartItem?.itemName || 'Item'}
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h4 className='font-semibold text-gray-900 text-base mb-1'>
                            {cartItem?.itemName}
                            {cartItem?.dachshundName && (
                              <span className='text-gray-600 font-normal'>
                                {' '}
                                for {cartItem.dachshundName}
                              </span>
                            )}
                          </h4>
                          {cartItem?.size && (
                            <p className='text-sm text-gray-600 mb-2'>Size: {cartItem.size}</p>
                          )}
                          {cartItem?.itemType === 'ecard' && (
                            <p className='text-sm text-gray-600 mb-2'>
                              To: {cartItem?.recipientsFullName}
                            </p>
                          )}
                          <div className='flex items-center justify-between'>
                            <span className='text-sm text-gray-600'>
                              Qty: {cartItem?.quantity ?? 1}
                            </span>
                            <span className='font-semibold text-gray-900'>
                              ${(cartItem?.price ?? 0).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Side - Cart Summary */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className='lg:col-span-5'
                  >
                    <div className='bg-white border border-gray-200 rounded-lg p-6 sticky top-4'>
                      <div className='flex items-center justify-between mb-4 pb-3 border-b border-gray-100'>
                        <h3 className='text-lg font-semibold text-gray-900'>Your Cart</h3>
                        <span className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold'>
                          {cartItemsAmount} item{cartItemsAmount !== 1 ? 's' : ''}
                        </span>
                      </div>

                      {/* Pricing Details */}
                      <div className='space-y-2 mb-6'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-gray-600'>Subtotal</span>
                          <span className='font-medium text-gray-900'>${subtotal?.toFixed(2)}</span>
                        </div>
                        {shippingPrice > 0 && (
                          <div className='flex justify-between text-sm'>
                            <span className='text-gray-600'>Shipping</span>
                            <span className='font-medium text-gray-900'>
                              ${shippingPrice?.toFixed(2)}
                            </span>
                          </div>
                        )}
                        <div className='border-t border-gray-200 pt-2'>
                          <div className='flex justify-between'>
                            <span className='font-semibold text-gray-900'>Total</span>
                            <span className='text-lg font-bold text-gray-900'>
                              ${totalPrice?.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className='space-y-3'>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Link
                            onClick={handleClose}
                            to='/cart'
                            className='w-full bg-white border-2 border-gray-900 text-gray-900 py-3 px-4 text-sm font-semibold text-center block rounded-lg hover:bg-gray-50 transition-colors'
                          >
                            View Cart
                          </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Link
                            onClick={handleClose}
                            to='/cart/checkout'
                            className='w-full bg-gray-900 text-white py-3 px-4 text-sm font-semibold text-center block rounded-lg hover:bg-gray-800 transition-colors'
                          >
                            Checkout Now
                          </Link>
                        </motion.div>
                      </div>

                      {/* Continue Shopping */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={handleClose}
                        className='w-full mt-4 text-gray-600 text-sm hover:text-gray-900 transition-colors font-medium'
                      >
                        Continue Shopping
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;
