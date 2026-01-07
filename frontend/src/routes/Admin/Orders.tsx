import { useEffect, useState } from 'react';
import { useGetOrdersQuery } from '../../redux/services/orderApi';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import toFixed from '../../utils/toFixed';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Search } from 'lucide-react';
import { setOpenOrderDrawer } from '../../redux/features/ordersSlice';
import { setInputs } from '../../redux/features/form/formSlice';
import { useAppDispatch } from '../../redux/toolkitStore';

const Orders = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = useGetOrdersQuery();
  const orders = data?.orders;
  const dispatch = useAppDispatch();

  const filteredOrders = orders?.filter((order: any) => {
    const searchText = searchTerm?.toLowerCase();
    return (
      order?.name?.toLowerCase().includes(searchText) ||
      order?.email?.toLowerCase().includes(searchText) ||
      order?.createdAt?.toLowerCase().includes(searchText)
    );
  });

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    const order = orders?.filter((order: any) => order._id === orderId)[0];

    if (order) {
      dispatch(setOpenOrderDrawer());
      dispatch(setInputs({ formName: 'adminOrderForm', data: order }));
    }
  }, [dispatch, orders, searchParams]);

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white border-b border-gray-200'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between'>
          <div>
            <h1 className='text-lg sm:text-2xl font-bold text-gray-900'>Orders</h1>
            <p className='text-xs sm:text-sm text-gray-600 mt-0.5'>{orders?.length} total</p>
          </div>
        </div>
      </motion.div>
      <div className='min-h-dvh w-full bg-gray-50'>
        {/* Main Content */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6'>
          {/* Search */}
          <motion.div
            className='space-y-3 sm:space-y-0 sm:flex gap-3'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className='relative flex-1 max-w-md'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <input
                type='text'
                placeholder='Search orders...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm'
              />
            </div>
          </motion.div>
          <div className='rounded-lg bg-white border border-gray-200 w-full overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='sticky top-0 whitespace-nowrap bg-gray-50'>
                  <tr>
                    <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                      Supporter
                    </th>
                    <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                      Email
                    </th>
                    <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                      Total
                    </th>

                    <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                      Payment Status
                    </th>
                    <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                      Shipping Status
                    </th>
                    <th className='px-4 border-b border-gray-200 text-xs font-semibold text-gray-600 py-3 text-left uppercase'>
                      Date & Time
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                  {(filteredOrders?.length || 0) > 0 ? (
                    filteredOrders?.map((order: any, index: number) => {
                      const hasPhysicalProduct = order?.shippingPrice > 0;

                      const needsAction =
                        hasPhysicalProduct && order?.shippingStatus === 'not-shipped';

                      return (
                        <motion.tr
                          onClick={() => {
                            dispatch(setOpenOrderDrawer());
                            dispatch(setInputs({ formName: 'adminOrderForm', data: { order } }));
                          }}
                          key={index}
                          className={`transition-colors cursor-pointer ${
                            needsAction
                              ? 'bg-amber-50 hover:bg-amber-100 border-l-4 border-amber-500'
                              : 'bg-white hover:bg-gray-50'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.02 }}
                        >
                          <td className='px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap'>
                            {order?.name}
                            {needsAction && (
                              <span className='ml-2 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded-full'>
                                <AlertCircle className='w-3 h-3' />
                                Action Needed
                              </span>
                            )}
                          </td>
                          <td className='px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap'>
                            {order?.email}
                          </td>
                          <td className='px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap'>
                            ${toFixed(order?.totalPrice)}
                          </td>

                          <td className='px-4 py-3 whitespace-nowrap'>
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                order?.status === 'Complete' || order?.status === 'completed'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {order?.status}
                            </span>
                          </td>

                          {/* Shipping Status - Only show if has physical products */}
                          {hasPhysicalProduct ? (
                            <td className='px-4 py-3 whitespace-nowrap'>
                              <span
                                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                  order?.shippingStatus === 'delivered'
                                    ? 'bg-green-100 text-green-700'
                                    : order?.shippingStatus === 'shipped'
                                    ? 'bg-blue-100 text-blue-700'
                                    : order?.shippingStatus === 'processing'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : order?.shippingStatus === 'not-shipped'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {order?.shippingStatus}
                              </span>
                            </td>
                          ) : (
                            <td className='px-4 py-3 whitespace-nowrap'>
                              <span className='inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700'>
                                digital
                              </span>
                            </td>
                          )}

                          <td className='px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap'>
                            {formatDateWithTimezone(order?.createdAt)}
                          </td>
                        </motion.tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className='px-4 py-8 text-center'>
                        <p className='text-gray-500 text-sm'>No orders found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
