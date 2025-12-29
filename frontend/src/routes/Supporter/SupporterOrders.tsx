import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import { useUserSelector } from '../../redux/toolkitStore';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import { Link } from 'react-router-dom';

const OrderFilters = ({ searchTerm, setSearchTerm, selectedStatus, setSelectedStatus }) => {
  const statuses = [
    { value: 'all', label: 'All Orders' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'not-shipped', label: 'Not Shipped' },
    { value: 'digital', label: 'Digital' },
  ];

  return (
    <div className='space-y-4 mb-6'>
      {/* Search Input */}
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
        <input
          type='text'
          placeholder='Search by order ID, email, or amount...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900'
        />
      </div>

      {/* Status Filters */}
      <div className='flex flex-wrap gap-2'>
        {statuses.map((status) => (
          <motion.button
            key={status.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedStatus(status.value)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              selectedStatus === status.value
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const SupporterOrders = () => {
  const { user } = useUserSelector();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredOrders = user?.orders?.filter((order: any) => {
    const matchesSearch =
      !searchTerm ||
      order._id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paypalOrderId?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.totalPrice?.toString().includes(searchTerm);

    const matchesStatus = selectedStatus === 'all' || order.shippingStatus === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='space-y-4'
    >
      {/* Header with Total */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-3xl font-bold text-gray-900'>Orders</h2>
          <p className='text-sm text-gray-600 mt-1'>Your order history</p>
        </div>
      </div>

      <OrderFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      <div className='space-y-4'>
        {(filteredOrders?.length || 0) > 0 ? (
          filteredOrders?.map((order: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className='bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Left Section */}
                <div className='space-y-3'>
                  <div>
                    <p className='text-xs text-gray-600 uppercase font-semibold'>Order ID</p>
                    <p className='text-lg font-bold text-gray-900 font-mono'>
                      {order?.paypalOrderId?.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-600 uppercase font-semibold'>Order Date</p>
                    <p className='text-sm font-medium text-gray-900'>
                      {formatDateWithTimezone(order?.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-600 uppercase font-semibold'>Items</p>
                    <p className='text-sm font-medium text-gray-900'>
                      {order?.items?.length || 0} {order?.items?.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>

                {/* Right Section */}
                <div className='space-y-3'>
                  <div>
                    <p className='text-xs text-gray-600 uppercase font-semibold'>Total Amount</p>
                    <p className='text-2xl font-bold text-gray-900'>
                      ${order?.totalPrice?.toFixed(2)}
                    </p>
                  </div>
                  <div className='flex items-center gap-3 pt-2'>
                    <div>
                      <p className='text-xs text-gray-600 uppercase font-semibold'>Payment</p>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          order?.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {order?.status}
                      </span>
                    </div>
                    <div>
                      <p className='text-xs text-gray-600 uppercase font-semibold'>Shipping</p>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
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
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Link */}
              <Link
                to={`/order/${order._id}`}
                className='mt-4 inline-flex items-center text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors'
              >
                View Details
                <ChevronRight className='w-4 h-4 ml-1' />
              </Link>
            </motion.div>
          ))
        ) : (
          <div className='bg-white border border-gray-200 rounded-lg p-12 text-center'>
            <p className='text-gray-500 text-sm'>No orders found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SupporterOrders;
