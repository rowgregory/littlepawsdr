import { Dispatch, SetStateAction } from 'react';
import { PayPalButtons, PayPalButtonsComponentProps } from '@paypal/react-paypal-js';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, Gift, Crown, Star, Zap, Heart, CreditCard, Shield } from 'lucide-react';
import toFixed from '../../utils/toFixed';

interface AuctionItemWinnerContainerProps {
  winningBid: any;
  setOrderLoader: Dispatch<SetStateAction<boolean>>;
  payForAuctionItem: any;
}

const AuctionItemWinnerContainer: React.FC<AuctionItemWinnerContainerProps> = ({
  winningBid,
  setOrderLoader,
  payForAuctionItem,
}) => {
  const onApprove: PayPalButtonsComponentProps['onApprove'] = async (data, actions) => {
    if (!actions.order) return;

    setOrderLoader(true);
    const details = await actions.order.capture();
    const payload = {
      id: winningBid._id,
      payPalId: details.id ?? '',
    };
    try {
      await payForAuctionItem(payload);
    } finally {
      setOrderLoader(false);
    }
  };

  const payPalConfig: PayPalButtonsComponentProps = {
    style: { layout: 'vertical' },
    createOrder: (data, actions) =>
      actions.order.create({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: Number(toFixed(winningBid?.totalPrice)).toString(),
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      }),
    onApprove,
  };

  // Show paid state with new design
  if (winningBid?.auctionItemPaymentStatus === 'Paid') {
    return (
      <div className='min-h-[calc(100dvh-128px)] flex items-center justify-center p-4'>
        <div className='max-w-md mx-auto text-center'>
          <motion.div
            className='bg-gradient-to-br from-green-600/50 to-blue-600/50 backdrop-blur-xl border border-green-400/30 rounded-3xl p-8'
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className='w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6'
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              <Trophy className='w-10 h-10 text-white' />
            </motion.div>
            <h2 className='text-3xl font-bold text-white mb-4'>Payment Complete!</h2>
            <p className='text-white/80 text-lg mb-6'>
              Thank you for your payment. Your items will be shipped soon!
            </p>
            <div className='bg-white/10 rounded-xl p-4'>
              <p className='text-green-400 font-bold'>✓ Payment Processed Successfully</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Show payment not available state
  if (winningBid?.auctionItemPaymentStatus === 'Paid') {
    return (
      <div className='min-h-[calc(100dvh-128px)] flex items-center justify-center p-4'>
        <div className='max-w-md mx-auto text-center'>
          <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8'>
            <h2 className='text-2xl font-bold text-white mb-4'>Payment Not Available</h2>
            <p className='text-white/70'>This auction item is no longer available for payment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-[calc(100dvh-128px)]'>
      {/* Desktop Two-Column Layout */}
      <div className='hidden lg:block'>
        <div className='max-w-7xl mx-auto px-6 py-12'>
          <div className='grid grid-cols-2 gap-12 items-start'>
            {/* Left Column - Winner Celebration & Item Details */}
            <motion.div
              className='space-y-8'
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Winner Hero Section */}
              <div className='text-center'>
                <motion.div
                  className='inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl mb-6 relative'
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, type: 'spring', stiffness: 150 }}
                >
                  <Crown className='w-6 h-6' />
                  AUCTION WINNER
                  <Trophy className='w-6 h-6' />
                  {/* Floating stars */}
                  <motion.div
                    className='absolute -top-2 -left-2'
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Star className='w-4 h-4 text-yellow-300' />
                  </motion.div>
                  <motion.div
                    className='absolute -bottom-2 -right-2'
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className='w-4 h-4 text-yellow-300' />
                  </motion.div>
                </motion.div>

                <h2 className='text-5xl font-bold text-white mb-4'>
                  {winningBid?.user?.name || 'Congratulations!'}
                </h2>
                <p className='text-2xl text-green-400 font-semibold mb-2'>You're the Winner!</p>
                <p className='text-white/70 text-lg'>Time to claim your amazing prize</p>
              </div>

              {/* Winning Item Details */}
              <motion.div
                className='bg-gradient-to-br from-purple-800/50 to-blue-800/50 backdrop-blur-xl border border-white/20 rounded-3xl p-8'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className='flex items-center gap-3 mb-6'>
                  <Gift className='w-8 h-8 text-yellow-400' />
                  <h3 className='text-2xl font-bold text-white'>
                    Your Winning Item
                    {winningBid?.auctionItems && winningBid.auctionItems.length > 1 ? 's' : ''}
                  </h3>
                </div>

                <div className='space-y-4'>
                  {winningBid?.auctionItems && winningBid.auctionItems.length > 0 ? (
                    winningBid.auctionItems.map((item: any, index: number) => (
                      <div
                        key={item._id || index}
                        className='flex items-center justify-between p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10'
                      >
                        <div className='flex items-center gap-6'>
                          <img
                            src={item?.photos?.[0]?.url || '/placeholder-image.jpg'}
                            alt={item?.title || 'Auction Item'}
                            className='w-20 h-20 object-cover rounded-lg border-2 border-yellow-400/30'
                          />
                          <div>
                            <h4 className='font-bold text-white text-xl mb-2'>
                              {item?.title || 'Auction Item'}
                            </h4>
                            <p className='text-white/70 text-sm mb-1'>
                              Item Price:{' '}
                              <span className='text-yellow-400 font-semibold'>
                                ${item?.soldPrice || '0.00'}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='text-center text-white/70 py-8'>
                      <p>No auction items found</p>
                    </div>
                  )}
                </div>

                {/* Total Summary */}
                <div className='mt-8 p-6 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl border border-green-400/30'>
                  <div className='space-y-3'>
                    <div className='flex justify-between text-white/80 text-lg'>
                      <span>Subtotal</span>
                      <span>${toFixed(winningBid?.subtotal) || '0.00'}</span>
                    </div>
                    {winningBid?.shipping && (
                      <div className='flex justify-between text-white/80 text-lg'>
                        <span>Shipping & Handling</span>
                        <span>${toFixed(winningBid.shipping) || '0.00'}</span>
                      </div>
                    )}
                    <div className='border-t border-white/20 pt-4'>
                      <div className='flex justify-between text-white font-bold text-2xl'>
                        <span>Total Amount</span>
                        <span className='text-yellow-400'>
                          ${toFixed(winningBid?.totalPrice) || '0.00'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Impact Message */}
              <motion.div
                className='bg-gradient-to-r from-pink-600/30 to-purple-600/30 backdrop-blur-xl border border-pink-400/30 rounded-2xl p-6'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className='flex items-center gap-3 mb-4'>
                  <Heart className='w-6 h-6 text-pink-400' />
                  <h4 className='text-lg font-bold text-white'>Your Impact</h4>
                </div>
                <p className='text-white/90 leading-relaxed'>
                  Your purchase directly helps rescue, rehabilitate, and rehome dachshunds in need.
                  Thank you for making a difference in these precious lives!
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column - Payment Section */}
            <motion.div
              className='space-y-8'
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Payment Card */}
              <div className='bg-gradient-to-br from-indigo-800/50 to-purple-800/50 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sticky top-8'>
                <div className='text-center mb-8'>
                  <motion.div
                    className='w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4'
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <CreditCard className='w-8 h-8 text-white' />
                  </motion.div>
                  <h3 className='text-2xl font-bold text-white mb-2'>Complete Your Payment</h3>
                  <p className='text-white/70'>Secure your winning item now</p>
                  <div className='mt-4 text-3xl font-bold text-yellow-400'>
                    ${toFixed(winningBid?.totalPrice) || '0.00'}
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className='grid grid-cols-3 gap-4 mb-8'>
                  <motion.div
                    className='text-center p-4 bg-white/10 rounded-xl border border-white/10'
                    whileHover={{ scale: 1.05 }}
                  >
                    <Shield className='w-6 h-6 text-green-400 mx-auto mb-2' />
                    <p className='text-white text-sm font-medium'>Secure</p>
                    <p className='text-white/60 text-xs'>HTTPS protected</p>
                  </motion.div>
                  <motion.div
                    className='text-center p-4 bg-white/10 rounded-xl border border-white/10'
                    whileHover={{ scale: 1.05 }}
                  >
                    <Zap className='w-6 h-6 text-yellow-400 mx-auto mb-2' />
                    <p className='text-white text-sm font-medium'>Instant</p>
                    <p className='text-white/60 text-xs'>Processing</p>
                  </motion.div>
                  <motion.div
                    className='text-center p-4 bg-white/10 rounded-xl border border-white/10'
                    whileHover={{ scale: 1.05 }}
                  >
                    <Heart className='w-6 h-6 text-pink-400 mx-auto mb-2' />
                    <p className='text-white text-sm font-medium'>Impact</p>
                    <p className='text-white/60 text-xs'>Helps Animals</p>
                  </motion.div>
                </div>

                {/* PayPal Buttons */}
                <motion.div
                  className='bg-white rounded-2xl p-6'
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='text-center mb-4'>
                    <h4 className='text-lg font-bold text-gray-800 mb-2'>Secure Checkout</h4>
                    <p className='text-gray-600 text-sm'>Powered by PayPal</p>
                  </div>
                  <PayPalButtons {...payPalConfig} />
                </motion.div>

                {/* Security Footer */}
                <div className='mt-6 pt-6 border-t border-white/20'>
                  <div className='flex justify-center gap-6 text-xs text-white/60'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                      256-bit SSL Encryption
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
                      PayPal Protected
                    </div>
                  </div>
                  <p className='text-center text-white/40 text-xs mt-2'>
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='lg:hidden px-4 py-8'>
        <div className='max-w-md mx-auto space-y-6'>
          {/* Mobile Winner Section */}
          <motion.div
            className='text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className='inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg mb-4'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <Crown className='w-4 h-4' />
              WINNER
              <Trophy className='w-4 h-4' />
            </motion.div>
            <h2 className='text-3xl font-bold text-white mb-2'>
              {winningBid?.user?.name || 'Congratulations!'}
            </h2>
            <p className='text-lg text-green-400 font-semibold'>You're the Winner!</p>
          </motion.div>

          {/* Mobile Item */}
          <motion.div
            className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
              <Gift className='w-5 h-5 text-yellow-400' />
              Your Winning Item
              {winningBid?.auctionItems && winningBid.auctionItems.length > 1 ? 's' : ''}
            </h3>

            <div className='space-y-3 mb-6'>
              {winningBid?.auctionItems && winningBid.auctionItems.length > 0 ? (
                winningBid.auctionItems.map((item: any, index: number) => (
                  <div
                    key={item._id || index}
                    className='flex items-center gap-4 p-4 bg-white/10 rounded-lg'
                  >
                    <img
                      src={item?.photos?.[0]?.url}
                      alt={item?.title || 'Auction Item'}
                      className='w-16 h-16 object-cover rounded-lg border-2 border-yellow-400/30'
                    />
                    <div className='flex-1'>
                      <h4 className='font-semibold text-white text-lg mb-1'>
                        {item?.title || 'Auction Item'}
                      </h4>
                      <p className='text-yellow-400 text-sm'>Price: ${item?.price || '0.00'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center text-white/70 py-4'>
                  <p>No auction items found</p>
                </div>
              )}
            </div>

            <div className='border-t border-white/20 pt-4 space-y-2'>
              <div className='flex justify-between text-white/70'>
                <span>Subtotal</span>
                <span>${toFixed(winningBid?.subtotal) || '0.00'}</span>
              </div>
              {winningBid?.shipping && (
                <div className='flex justify-between text-white/70'>
                  <span>Shipping</span>
                  <span>${toFixed(winningBid.shipping) || '0.00'}</span>
                </div>
              )}
              <div className='flex justify-between text-lg font-bold text-white pt-2 border-t border-white/20'>
                <span>Total</span>
                <span className='text-yellow-400'>
                  ${toFixed(winningBid?.totalPrice) || '0.00'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Mobile Payment */}
          <motion.div
            className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className='text-center mb-6'>
              <h4 className='text-lg font-bold text-white mb-2'>Complete Payment</h4>
              <p className='text-white/70 text-sm'>Secure checkout</p>
              <div className='mt-2 text-2xl font-bold text-yellow-400'>
                ${toFixed(winningBid?.totalPrice) || '0.00'}
              </div>
            </div>

            <div className='bg-white rounded-xl p-4'>
              <PayPalButtons {...payPalConfig} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuctionItemWinnerContainer;
