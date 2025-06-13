import { FC, useEffect, useState } from 'react';
import { CheckCircle, Package, MapPin, Mail, Heart } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { RootState, useAppSelector } from '../redux/toolkitStore';
import { useGetOrderQuery } from '../redux/services/orderApi';

const OrderReceipt = () => {
  const { id } = useParams();
  const { order } = useAppSelector((state: RootState) => state.orders);
  const [hasFetched, setHasFetched] = useState(false);

  const { data } = useGetOrderQuery(id, {
    skip: hasFetched,
  });

  useEffect(() => {
    if (!hasFetched && data) {
      setHasFetched(true);
    }
  }, [data, hasFetched]);

  const allItems = [...(order?.ecards || []), ...(order?.welcomeWieners || []), ...(order?.products || [])];

  const OrderItem: FC<{
    item: { name: string; productName: string; dachshundName: string; quantity: number; price: number; totalPrice: number };
  }> = ({ item }) => (
    <div className='flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0'>
      <div className='flex-1'>
        <p className='text-sm font-medium text-gray-900'>
          {item?.productName || item?.name || (order.isWelcomeWiener && `${item?.productName} for ${item?.dachshundName}`)}
        </p>
        <p className='text-xs text-gray-500'>
          Qty: {item.quantity} X {item?.price || item?.totalPrice}
        </p>
      </div>
      <div className='text-sm font-semibold text-gray-900'>${((item.price || item.totalPrice) * item.quantity).toFixed(2)}</div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4'>
      {/* Receipt Container */}
      <div className='bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full relative'>
        {/* Decorative Top Border */}
        <div className='h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'></div>

        {/* Header */}
        <div className='bg-gray-50 px-6 py-4 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <Link to='/' className='flex items-center space-x-2'>
              <Heart className='w-8 h-8 text-red-500 fill-current' />
              <div>
                <h1 className='text-lg font-bold text-gray-900'>Little Paws</h1>
                <p className='text-xs text-gray-600'>Dachshund Rescue</p>
              </div>
            </Link>
            <div className='text-right'>
              <p className='text-xs text-gray-500'>Order No.</p>
              <p className='text-sm font-mono font-semibold text-gray-900 truncate'>{order._id}</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className='px-6 py-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200'>
          <div className='flex items-center space-x-3 mb-3'>
            <div className='flex-shrink-0'>
              <CheckCircle className='w-8 h-8 text-green-500' />
            </div>
            <div>
              <h2 className='text-xl font-bold text-gray-900'>Order Confirmed!</h2>
              <p className='text-sm text-gray-600'>Your purchase is complete</p>
            </div>
          </div>

          <div className='bg-white rounded-lg p-4 border border-green-200'>
            <p className='text-sm font-medium text-gray-900 mb-1'>Hi {order.name?.split(' ')[0]}! 👋</p>
            <p className='text-xs text-gray-600 leading-relaxed'>
              Thank you for supporting our rescue mission. Every purchase helps save more dachshund lives!
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className='px-6 py-4'>
          <div className='flex items-center space-x-2 mb-4'>
            <Package className='w-4 h-4 text-gray-500' />
            <h3 className='text-sm font-semibold text-gray-900'>Order Details</h3>
          </div>

          <div className='space-y-1'>
            {allItems.map((item, i) => (
              <OrderItem key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className='px-6 py-4 bg-gray-50 border-t border-gray-200'>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Subtotal</span>
              <span className='font-medium text-gray-900'>${order.subtotal}</span>
            </div>

            {order.isProduct && (
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Shipping</span>
                <span className='font-medium text-gray-900'>${order.shippingPrice}</span>
              </div>
            )}

            <div className='border-t border-gray-300 pt-2'>
              <div className='flex justify-between'>
                <span className='text-base font-semibold text-gray-900'>Total</span>
                <span className='text-lg font-bold text-gray-900'>${order.totalPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        {order.shippingAddress && (
          <div className='px-6 py-4 border-t border-gray-200'>
            <div className='flex items-center space-x-2 mb-3'>
              <MapPin className='w-4 h-4 text-gray-500' />
              <h3 className='text-sm font-semibold text-gray-900'>Shipping Address</h3>
            </div>

            <div className='bg-blue-50 rounded-lg p-3 border border-blue-200'>
              <p className='text-sm text-gray-900 font-medium'>{order.name}</p>
              <p className='text-sm text-gray-700'>{order.shippingAddress.address}</p>
              <p className='text-sm text-gray-700'>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipPostalCode}
              </p>
            </div>
          </div>
        )}

        {/* Footer Message */}
        <div className='px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-gray-200'>
          <div className='text-center'>
            <p className='text-sm text-gray-700 mb-2'>🐕 Hope to see you and your furry friends soon! 🐕</p>
            <p className='text-xs font-semibold text-gray-900'>— Little Paws Dachshund Rescue Team</p>
          </div>
        </div>

        {/* Contact Footer */}
        <div className='bg-gray-800 px-6 py-4'>
          <div className='flex items-center justify-center space-x-2'>
            <Mail className='w-4 h-4 text-gray-400' />
            <p className='text-xs text-gray-300'>
              Need help?
              <button className='text-blue-400 hover:text-blue-300 ml-1 underline transition-colors'>Contact us here</button>
            </p>
          </div>
        </div>

        {/* Decorative Bottom Dots */}
        <div className='absolute -bottom-1 left-0 right-0 flex justify-center space-x-2'>
          {[...Array(20)].map((_, i) => (
            <div key={i} className='w-2 h-2 bg-gray-200 rounded-full transform rotate-45'></div>
          ))}
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className='absolute top-10 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse'></div>
      <div
        className='absolute bottom-20 right-10 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-pulse'
        style={{ animationDelay: '1s' }}
      ></div>
      <div className='absolute top-1/3 right-20 w-8 h-8 bg-pink-200 rounded-full opacity-20 animate-pulse' style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default OrderReceipt;
