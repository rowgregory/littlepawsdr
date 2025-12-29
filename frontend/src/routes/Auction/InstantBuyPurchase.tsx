import { useParams } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { RootState, useAppSelector } from '../../redux/toolkitStore';
import { useState } from 'react';
import toFixed from '../../utils/toFixed';
import { Link } from 'react-router-dom';
import InstantBuyPurchaseSuccessModal from '../../components/modals/InstantBuyPurchaseSuccessModal';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Clock,
  CreditCard,
  Heart,
  Lock,
  LogIn,
  ShieldCheck,
  Sparkles,
  User,
  X,
  Zap,
} from 'lucide-react';
import DachshundLoader from '../../components/Loaders/DachshundLoader';
import {
  useCreateInstantBuyMutation,
  useGetAuctionItemQuery,
} from '../../redux/services/auctionApi';

const InstantBuyPurchase = () => {
  const params = useParams();
  const [orderLoader, setOrderLoader] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.user);
  const auctionItemId = params.auctionItemId;
  const customAuctionLink = params?.customAuctionLink;

  const { data } = useGetAuctionItemQuery({
    auctionItemId,
    customAuctionLink,
  });
  const auctionItem = data?.auctionItem;

  const [createInstantBuy, { data: instantBuy }] = useCreateInstantBuyMutation();

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceReRender: [auctionItem],
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: Number(toFixed(auctionItem?.total)),
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      });
    },
    onApprove: (data: any, actions: any) => {
      setOrderLoader(true);
      return actions.order.capture().then(async (details: any) => {
        const instantBuyObj = {
          auction: auctionItem?.auction,
          auctionItem: auctionItem,
          payPalId: details?.id,
          buyNowPrice: auctionItem?.buyNowPrice,
          totalPrice: auctionItem?.total,
          isDigital: auctionItem?.isDigital,
        };

        await createInstantBuy(instantBuyObj)
          .unwrap()
          .then(() => {
            setOrderLoader(false);
          })
          .catch(() => {
            setOrderLoader(false);
          });
      });
    },
  } as any;

  return (
    <>
      {orderLoader && <DachshundLoader />}
      <InstantBuyPurchaseSuccessModal instantBuySuccess={instantBuy?.instantBuySuccess} />

      {/* Modern gradient background */}
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
        {/* Header */}
        <div className='relative z-10 px-4 py-6'>
          <div className='max-w-7xl mx-auto flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center'>
                <Heart className='w-6 h-6 text-white' />
              </div>
              <div>
                <h1 className='text-xl font-bold text-white'>Little Paws Dachshund Rescue</h1>
                <p className='text-sm text-white/70'>Premium Auction Experience</p>
              </div>
            </div>
            <Link
              to={`/auctions/${customAuctionLink}`}
              className='flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              <span className='text-sm font-medium'>Back to auction</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className='relative z-10 max-w-6xl mx-auto px-4 pb-8'>
          {/* Success Header (when not purchased yet) */}
          {!instantBuy && (
            <div className='text-center mb-8'>
              <div className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 mb-6'>
                <div className='w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <Zap className='w-10 h-10 text-white' />
                </div>
                <h1 className='text-4xl font-black text-white mb-2'>⚡ INSTANT BUY AVAILABLE ⚡</h1>
                <p className='text-xl text-white/80'>
                  Secure this item now — it&apos;s fast and easy
                </p>
              </div>
            </div>
          )}

          {auctionItem?.totalQuantity <= 0 ? (
            // Sold Out State
            <div className='max-w-md mx-auto'>
              <div className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center'>
                <div className='w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <X className='w-8 h-8 text-white' />
                </div>
                <h2 className='text-2xl font-bold text-white mb-4'>Item Sold Out</h2>
                <p className='text-white/70 mb-6'>This item is no longer available for purchase.</p>
                <Link
                  to={`/auctions/${customAuctionLink}`}
                  className='inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105'
                >
                  <span>Browse Other Items</span>
                  <ArrowRight className='w-4 h-4' />
                </Link>
              </div>
            </div>
          ) : !user?._id ? (
            // Sign In Required State
            <div className='max-w-md mx-auto'>
              <div className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center'>
                <div className='w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <User className='w-8 h-8 text-white' />
                </div>
                <h2 className='text-2xl font-bold text-white mb-4'>Sign In Required</h2>
                <p className='text-white/70 mb-6'>Please sign in to proceed with this purchase.</p>
                <Link
                  to='/auth/login'
                  className='inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105'
                >
                  <LogIn className='w-4 h-4' />
                  <span>Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            // Main Purchase Flow
            <div className='grid lg:grid-cols-2 gap-8'>
              {/* Item Details */}
              <div className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-white'>Item Details</h2>
                  <div className='bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2'>
                    <Sparkles className='w-4 h-4' />
                    AVAILABLE
                  </div>
                </div>

                {/* Item Image & Info */}
                <div className='flex items-start space-x-4 mb-6'>
                  <div className='w-24 h-24 rounded-xl overflow-hidden bg-white/5'>
                    <img
                      src={auctionItem?.photos[0]?.url}
                      className='w-full h-full object-cover'
                      alt='Auction Item'
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-xl font-bold text-white mb-2'>{auctionItem?.name}</h3>
                    <p className='text-white/70 text-sm mb-3'>
                      Premium auction item from our exclusive collection. Available for instant
                      purchase.
                    </p>
                    <div className='flex items-center space-x-4 text-sm text-white/60'>
                      <div className='flex items-center space-x-1'>
                        <Clock className='w-4 h-4' />
                        <span>Available now</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <ShieldCheck className='w-4 h-4' />
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                {!instantBuy && (
                  <div className='bg-white/5 rounded-xl p-4'>
                    <h4 className='font-semibold text-white mb-3'>Purchase Summary</h4>
                    <div className='space-y-2 text-sm'>
                      <div className='flex justify-between text-white/70'>
                        <span>Item Price:</span>
                        <span className='font-semibold text-white'>
                          ${toFixed(auctionItem?.buyNowPrice)}
                        </span>
                      </div>
                      {auctionItem?.requiresShipping && (
                        <div className='flex justify-between text-white/70'>
                          <span>Shipping Fee:</span>
                          <span className='font-semibold text-white'>
                            ${toFixed(auctionItem?.shippingCosts)}
                          </span>
                        </div>
                      )}
                      <hr className='border-white/20 my-3' />
                      <div className='flex justify-between text-lg font-bold'>
                        <span className='text-white'>Total:</span>
                        <span className='text-green-400'>${toFixed(auctionItem?.total)}</span>
                      </div>
                    </div>

                    {/* Legal Disclaimer */}
                    <div className='bg-red-500/20 border border-red-400/50 rounded-lg p-3 mt-4'>
                      <p className='text-red-200 text-xs font-medium flex items-center'>
                        <AlertTriangle className='w-4 h-4 mr-2' />
                        ALL PURCHASES ARE FINAL - No cancellations or refunds
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Section */}
              {!instantBuy && (
                <div className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6'>
                  <h2 className='text-2xl font-bold text-white mb-6 flex items-center'>
                    <CreditCard className='w-6 h-6 mr-3' />
                    Complete Payment
                  </h2>

                  <div className='bg-white rounded-xl p-4'>
                    <PayPalButtons
                      style={payPalComponents.style}
                      forceReRender={payPalComponents.forceRerender}
                      createOrder={payPalComponents.createOrder}
                      onApprove={payPalComponents.onApprove}
                    />
                  </div>

                  {/* Security Info */}
                  <div className='mt-6 text-center'>
                    <p className='text-white/60 text-xs flex items-center justify-center'>
                      <Lock className='w-3 h-3 mr-1' />
                      Secured by PayPal - Your payment information is protected
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='relative z-10 text-center py-8'>
          <a
            href='https://sqysh.io'
            target='_blank'
            rel='noreferrer'
            className='text-white/60 hover:text-white/80 font-medium text-sm transition-colors'
          >
            Powered by Sqysh
          </a>
        </div>
      </div>
    </>
  );
};

export default InstantBuyPurchase;
