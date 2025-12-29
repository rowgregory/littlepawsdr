import { sortTable } from '../../redux/features/tableSlice';
import { useAppDispatch, useTableSelector } from '../../redux/toolkitStore';
import { motion } from 'framer-motion';

const InstantBuyersTable = ({ filteredData }: { filteredData: any }) => {
  const dispatch = useAppDispatch();
  const { sortKey, sortDirection } = useTableSelector();

  const handleSort = (key: string) => {
    dispatch(sortTable({ data: filteredData, key }));
  };

  return (
    <>
      {/* Desktop Table */}
      <div className='hidden lg:block'>
        {/* Table Header */}
        <div className='bg-gray-50 border-b border-gray-200'>
          <div className='grid grid-cols-7 gap-4 px-6 py-3 text-xs font-medium text-gray-700'>
            <div className='cursor-pointer hover:text-gray-900' onClick={() => handleSort('user.name')}>
              Name {sortKey === 'user.name' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </div>
            <div className='cursor-pointer hover:text-gray-900' onClick={() => handleSort('user.email')}>
              Email {sortKey === 'user.email' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </div>
            <div className='cursor-pointer hover:text-gray-900' onClick={() => handleSort('auctionItem.name')}>
              Item {sortKey === 'auctionItem.name' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </div>
            <div className='cursor-pointer hover:text-gray-900' onClick={() => handleSort('totalPrice')}>
              Price {sortKey === 'totalPrice' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </div>
            <div className='cursor-pointer hover:text-gray-900' onClick={() => handleSort('shippingStatus')}>
              Shipping {sortKey === 'shippingStatus' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </div>
            <div className='cursor-pointer hover:text-gray-900' onClick={() => handleSort('paymentStatus')}>
              Payment {sortKey === 'paymentStatus' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
            </div>
            <div>ID</div>
          </div>
        </div>

        {/* Table Body */}
        <div className='divide-y divide-gray-100'>
          {filteredData?.map((instantBuyer: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className='grid grid-cols-7 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors text-sm'
            >
              <div className='truncate text-gray-900 font-medium'>{instantBuyer?.user?.name}</div>
              <div className='truncate text-gray-600'>{instantBuyer?.user?.email}</div>
              <div className='truncate text-gray-900'>{instantBuyer?.auctionItem?.name}</div>
              <div className='font-semibold text-gray-900'>${instantBuyer?.totalPrice}</div>
              <div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    instantBuyer?.shippingStatus === 'Complete'
                      ? 'bg-green-50 text-green-700'
                      : instantBuyer?.shippingStatus === 'Digital'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {instantBuyer?.shippingStatus}
                </span>
              </div>
              <div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    instantBuyer?.paymentStatus === 'Paid'
                      ? 'bg-green-50 text-green-700'
                      : instantBuyer?.paymentStatus === 'Pending Fulfillment'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {instantBuyer?.paymentStatus}
                </span>
              </div>
              <div className='text-xs text-gray-500 truncate' title={instantBuyer?.user?._id}>
                {instantBuyer?.user?._id?.slice(0, 8)}...
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className='lg:hidden space-y-3 p-4'>
        {filteredData?.map((instantBuyer: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className='bg-gray-50 rounded-lg p-4 space-y-3'
          >
            {/* Name and Email */}
            <div>
              <p className='font-bold text-gray-900 text-sm'>{instantBuyer?.user?.name}</p>
              <p className='text-xs text-gray-600 truncate'>{instantBuyer?.user?.email}</p>
            </div>

            {/* Item and Price */}
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <p className='text-xs text-gray-600 mb-1'>Item</p>
                <p className='text-sm font-medium text-gray-900 line-clamp-2'>{instantBuyer?.auctionItem?.name}</p>
              </div>
              <div>
                <p className='text-xs text-gray-600 mb-1'>Price</p>
                <p className='text-sm font-bold text-gray-900'>${instantBuyer?.totalPrice}</p>
              </div>
            </div>

            {/* Status Badges */}
            <div className='flex items-center gap-2'>
              <span
                className={`flex-1 inline-flex items-center justify-center px-2 py-1.5 rounded text-xs font-medium ${
                  instantBuyer?.shippingStatus === 'Complete'
                    ? 'bg-green-50 text-green-700'
                    : instantBuyer?.shippingStatus === 'Digital'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {instantBuyer?.shippingStatus}
              </span>
              <span
                className={`flex-1 inline-flex items-center justify-center px-2 py-1.5 rounded text-xs font-medium ${
                  instantBuyer?.paymentStatus === 'Paid'
                    ? 'bg-green-50 text-green-700'
                    : instantBuyer?.paymentStatus === 'Pending Fulfillment'
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                {instantBuyer?.paymentStatus}
              </span>
            </div>

            {/* ID */}
            <div className='text-xs text-gray-500 border-t border-gray-200 pt-3'>
              <span className='font-medium'>ID: </span>
              {instantBuyer?.user?._id?.slice(0, 12)}...
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default InstantBuyersTable;
