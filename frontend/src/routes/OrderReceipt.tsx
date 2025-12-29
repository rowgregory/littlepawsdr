import { FC, useEffect, useState } from 'react';
import { CheckCircle, Package, MapPin, Heart, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useGetOrderQuery } from '../redux/services/orderApi';
import { motion } from 'framer-motion';

interface IOrderItem {
  item: {
    itemName: string;
    itemImage: string;
    quantity: number;
    price: number;
    totalPrice: number;
    itemType?: string;
    recipientsFullName?: string;
    recipientsEmail?: string;
    message?: string;
    sendNow?: string;
    dateToSend?: string;
  };
}

const OrderItem: FC<IOrderItem> = ({ item }) => (
  <tr className='border-b border-gray-200 hover:bg-gray-50'>
    <td className='px-6 py-4'>
      <div className='flex items-center gap-3'>
        <img
          src={item?.itemImage}
          alt={item?.itemName}
          className='w-12 h-12 rounded-lg object-cover border border-gray-200'
        />
        <div className='min-w-0 flex-1'>
          <p className='text-sm font-medium text-gray-900'>{item?.itemName}</p>

          {/* Ecard details */}
          {item?.itemType === 'ecard' && (
            <div className='text-xs text-gray-600 space-y-1 mt-1'>
              <p>
                To:{' '}
                <span className='font-medium'>
                  {item?.recipientsFullName || item?.recipientsEmail}
                </span>
              </p>
              {item?.message && (
                <p className='italic text-gray-500'>"{item?.message.substring(0, 50)}..."</p>
              )}
              <p>
                Sending:{' '}
                {item?.sendNow === 'send-now'
                  ? 'Now'
                  : item?.dateToSend
                  ? new Date(item.dateToSend).toLocaleDateString()
                  : 'Scheduled'}
              </p>
            </div>
          )}
        </div>
      </div>
    </td>
    <td className='px-6 py-4 text-sm text-gray-600'>${item?.price?.toFixed(2)}</td>
    <td className='px-6 py-4 text-sm text-gray-600'>{item.quantity}</td>
    <td className='px-6 py-4 text-sm font-semibold text-gray-900'>
      ${item?.totalPrice?.toFixed(2)}
    </td>
  </tr>
);

const OrderReceipt = () => {
  const { id } = useParams();
  const [hasFetched, setHasFetched] = useState(false);

  const { data } = useGetOrderQuery(id, {
    skip: hasFetched,
  });

  const order = data?.order;

  useEffect(() => {
    if (!hasFetched && data) {
      setHasFetched(true);
    }
  }, [data, hasFetched]);

  const hasPhysicalProduct = order?.items?.some(
    (item: { itemType: string; isPhysicalProduct: boolean }) =>
      item.itemType === 'product' && item.isPhysicalProduct === true
  );

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-6xl mx-auto px-6 py-8'>
          <div className='flex items-center justify-between mb-8'>
            <Link to='/' className='flex items-center gap-3'>
              <Heart className='w-8 h-8 text-red-500 fill-current' />
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>Little Paws</h1>
                <p className='text-sm text-gray-600'>Dachshund Rescue</p>
              </div>
            </Link>
            <div className='text-right'>
              <p className='text-sm font-semibold text-gray-900'>Order Confirmed!</p>
              <p className='text-xs text-gray-600 mt-1'>Order ID: {order?._id?.slice(-8)}</p>
            </div>
          </div>

          {/* Success Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-green-50 border border-green-200 rounded-lg p-6 flex items-start gap-4'
          >
            <CheckCircle className='w-6 h-6 text-green-600 flex-shrink-0 mt-1' />
            <div>
              <h2 className='text-lg font-bold text-gray-900'>Thank you for your purchase!</h2>
              <p className='text-gray-700 mt-1'>
                Hi {order?.name?.split(' ')[0]}! Your order has been confirmed. We appreciate your
                support for our rescue mission.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Order Items Section */}
          <div className='lg:col-span-2'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white rounded-lg border border-gray-200 overflow-hidden'
            >
              {/* Section Header */}
              <div className='bg-gray-50 border-b border-gray-200 px-6 py-4'>
                <h3 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
                  <Package className='w-5 h-5' />
                  Order Items ({order?.items?.length || 0})
                </h3>
              </div>

              {/* Items Table */}
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50 border-b border-gray-200'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase'>
                        Product
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase'>
                        Price
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase'>
                        Qty
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase'>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.items?.map((item, i) => (
                      <OrderItem key={i} item={item} />
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='space-y-6'
          >
            {/* Pricing Card */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Order Summary</h3>

              <div className='space-y-3 mb-4'>
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

                <div className='border-t border-gray-200 pt-3'>
                  <div className='flex justify-between'>
                    <span className='font-semibold text-gray-900'>Total</span>
                    <span className='text-xl font-bold text-gray-900'>
                      ${order?.totalPrice?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className='text-xs text-gray-600 bg-gray-50 rounded-lg p-3'>
                <p>
                  <strong>Order Date:</strong> {new Date(order?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            {hasPhysicalProduct && order?.shippingAddress && (
              <div className='bg-white rounded-lg border border-gray-200 p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                  <MapPin className='w-5 h-5' />
                  Shipping Address
                </h3>

                <div className='space-y-1'>
                  <p className='font-medium text-gray-900'>{order?.shippingAddress.name}</p>
                  <p className='text-sm text-gray-700'>{order?.shippingAddress.address}</p>
                  {order?.shippingAddress.addressLine2 && (
                    <p className='text-sm text-gray-700'>{order?.shippingAddress.addressLine2}</p>
                  )}
                  <p className='text-sm text-gray-700'>
                    {order?.shippingAddress.city}, {order?.shippingAddress.state}{' '}
                    {order?.shippingAddress.zipPostalCode}
                  </p>
                </div>

                <div className='mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
                  <p className='text-xs text-blue-800'>
                    Your order will be shipped to this address.
                  </p>
                </div>
              </div>
            )}

            {/* Customer Info */}
            <div className='bg-white rounded-lg border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                <User className='w-5 h-5' />
                Customer Info
              </h3>

              <div className='space-y-3'>
                <div>
                  <p className='text-xs text-gray-600 uppercase'>Email</p>
                  <p className='text-sm font-medium text-gray-900'>{order?.email}</p>
                </div>
              </div>

              <div className='mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg'>
                <p className='text-xs text-amber-800'>
                  A confirmation email has been sent to your inbox.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className='max-w-6xl mx-auto px-6 py-12 border-t border-gray-200'>
        <div className='text-center'>
          <p className='text-gray-700 mb-6'>
            Thank you for supporting our dachshund rescue mission!
          </p>
          <div className='flex items-center justify-center gap-4'>
            <Link
              to='/store'
              className='px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors'
            >
              Continue Shopping
            </Link>
            <Link
              to='/supporter/orders'
              className='px-6 py-2.5 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors'
            >
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
