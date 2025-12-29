import { useEffect, useState } from 'react';
import { Search, Plus, Package, Eye, Trash2, Image } from 'lucide-react';
import { useAppDispatch, useAuctionSelector, useTableSelector } from '../../../redux/toolkitStore';
import DeleteModal from '../../../components/modals/DeleteModal';
import useDeleteModal from '../../../hooks/useDeleteModal';
import { motion } from 'framer-motion';
import { resetForm, setInputs } from '../../../redux/features/form/formSlice';
import { setInitialArray, setSearchQuery, sortTable } from '../../../redux/features/tableSlice';
import {
  setOpenAuctionItemBidsDrawer,
  setOpenAuctionItemDrawer,
} from '../../../redux/features/auctionSlice';
import { useDeleteAuctionItemMutation } from '../../../redux/services/auctionApi';

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'sold':
      return 'text-green-700 bg-green-50 border-green-200';
    case 'unsold':
      return 'text-gray-700 bg-gray-50 border-gray-200';
    case 'active':
      return 'text-blue-700 bg-blue-50 border-blue-200';
    default:
      return 'text-gray-700 bg-gray-50 border-gray-200';
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const AuctionItems = () => {
  const dispatch = useAppDispatch();
  const [id, setId] = useState('');
  const { auction } = useAuctionSelector();
  const { filteredArray, sortDirection, sortKey } = useTableSelector();
  const isActiveAuction = auction?.isLive;
  const [showSearch, setShowSearch] = useState(false);
  const noAuctionItems = auction?.items?.length === 0;
  const auctionItemsTotal = auction?.items?.length;

  const { openModal, show, closeModal } = useDeleteModal();

  const [deleteAuctionItem, { isLoading: loadingDelete }] = useDeleteAuctionItemMutation();

  const fixedItems = filteredArray?.filter((item) => item.sellingFormat === 'fixed');
  const auctionItems = filteredArray?.filter((item) => item.sellingFormat === 'auction');

  useEffect(() => {
    dispatch(setInitialArray({ arrayToFilter: auction?.items }));
  }, [auction?.items, dispatch]);

  const handleSearch = (e: any) =>
    dispatch(setSearchQuery({ text: e.target.value, arrayToFilter: auction?.items }));

  const handleDelete = (item: any) => {
    setId(item._id);
    openModal();
  };

  const CreateAuctionItemButton = () => (
    <motion.button
      onClick={() => {
        dispatch(resetForm('auctionItemForm'));
        dispatch(setOpenAuctionItemDrawer());
        dispatch(
          setInputs({
            formName: 'auctionItemForm',
            data: { sellingFormat: 'auction', requiresShipping: true },
          })
        );
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className='flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm'
    >
      <Plus className='w-4 h-4' />
      <span>Add Item</span>
    </motion.button>
  );

  const handleSort = (key: string) => dispatch(sortTable({ data: auction?.items, key }));

  return (
    <>
      <DeleteModal
        type='Auction Item'
        id={id}
        deleteDocument={deleteAuctionItem}
        loading={loadingDelete}
        hook={{ openModal, show, closeModal }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex items-center justify-between gap-3 pb-4 border-b border-gray-200 mb-6'
      >
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-gray-100 rounded-lg'>
            <Package className='w-5 h-5 text-gray-700' />
          </div>
          <div>
            <h3 className='text-lg font-bold text-gray-900'>Auction Items</h3>
            <p className='text-sm text-gray-600 mt-1'>
              {auctionItemsTotal || 0} items in your auction
            </p>
          </div>
        </div>
        <div className='flex items-center gap-2 flex-shrink-0'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSearch(!showSearch)}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
            title='Search'
          >
            <Search className='w-5 h-5 text-gray-600' />
          </motion.button>
          <CreateAuctionItemButton />
        </div>
      </motion.div>

      {/* Search Bar - Hidden by default */}
      {showSearch && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className='mb-6 relative'
        >
          <motion.input
            autoFocus
            type='text'
            placeholder='Search items by name or description...'
            onChange={handleSearch}
            className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
          />
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
        </motion.div>
      )}

      {/* Content */}
      {noAuctionItems ? (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-col py-16'
        >
          <div className='w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
            <Package className='w-8 h-8 text-gray-400' />
          </div>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>No auction items yet</h3>
          <p className='text-gray-600 mb-6'>Get started by adding your first auction item</p>
          <CreateAuctionItemButton />
        </motion.div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          {/* Fixed Items - Left Column */}
          <div className='order-2 lg:order-1 lg:col-span-3'>
            <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
              <div className='bg-gray-50 border-b border-gray-200 px-4 sm:px-6 py-3'>
                <h3 className='text-sm font-semibold text-gray-900'>Fixed Price Items</h3>
                <p className='text-xs text-gray-600 mt-1'>{fixedItems?.length} items</p>
              </div>

              <div className='divide-y divide-gray-100'>
                {fixedItems?.map((item: any, index: number) => (
                  <motion.div
                    key={item._id || index}
                    onClick={() => {
                      dispatch(setOpenAuctionItemDrawer());
                      dispatch(
                        setInputs({
                          formName: 'auctionItemForm',
                          data: { ...item, isUpdating: true },
                        })
                      );
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className='p-3 sm:p-4 transition-colors space-y-3 cursor-pointer'
                  >
                    {/* Item Header */}
                    <div className='flex items-start gap-2 sm:gap-3 min-w-0'>
                      {/* Item Image - Small */}
                      <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0'>
                        {item.photos && item.photos.length > 0 ? (
                          <img
                            src={item.photos[0].url}
                            alt={item.name}
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <Image className='w-4 h-4 sm:w-5 sm:h-5 text-gray-400' />
                        )}
                      </div>

                      {/* Item Info */}
                      <div className='flex-1 min-w-0'>
                        <h4 className='font-semibold text-gray-900 text-xs sm:text-sm line-clamp-2'>
                          {item.name}
                        </h4>
                        <p className='text-xs text-gray-600 line-clamp-1 mt-0.5'>
                          {item.description}
                        </p>
                        <div className='flex items-center gap-1 sm:gap-2 mt-1 flex-wrap'>
                          {item.isDigital ? (
                            <span className='inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-xs font-medium bg-lime-100 text-lime-700'>
                              Digital
                            </span>
                          ) : (
                            <span className='inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-700'>
                              Physical
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Qty */}
                    <div className='grid grid-cols-2 gap-2'>
                      <div className='bg-gray-50 rounded p-2'>
                        <p className='text-xs text-gray-600 mb-0.5'>Price</p>
                        <p className='font-bold text-gray-900 text-sm'>${item.buyNowPrice}</p>
                      </div>
                      <div className='bg-gray-50 rounded p-2'>
                        <p className='text-xs text-gray-600 mb-0.5'>Qty</p>
                        <p className='font-semibold text-gray-900 text-sm'>{item.totalQuantity}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className='flex items-center justify-end pt-2 border-t border-gray-100'>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isActiveAuction}
                        className='p-1.5 hover:bg-red-50 disabled:opacity-50 rounded transition-colors text-red-600 hover:text-red-700'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item);
                        }}
                        title='Delete'
                      >
                        <Trash2 className='w-4 h-4' />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}

                {fixedItems?.length === 0 && (
                  <div className='p-6 sm:p-8 text-center'>
                    <p className='text-xs sm:text-sm text-gray-500'>No fixed price items</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Auction Items - Right Column */}
          <div className='order-1 lg:order-2 lg:col-span-9'>
            <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
              <div className='bg-gray-50 border-b border-gray-200 px-6 py-3'>
                <h3 className='text-sm font-semibold text-gray-900'>Auction Items</h3>
                <p className='text-xs text-gray-600 mt-1'>{auctionItems?.length} items</p>
              </div>

              {/* Desktop Table */}
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='bg-gray-50 border-b border-gray-200'>
                      <th
                        className='px-6 py-3 text-left text-xs font-medium text-gray-700 cursor-pointer'
                        onClick={() => handleSort('name')}
                      >
                        <div className='flex items-center gap-1 whitespace-nowrap'>
                          Item{' '}
                          <span>{sortDirection === 'asc' && sortKey === 'name' ? '↑' : '↓'}</span>
                        </div>
                      </th>
                      <th
                        className='px-6 py-3 text-left text-xs font-medium text-gray-700 cursor-pointer'
                        onClick={() => handleSort('totalBids')}
                      >
                        <div className='flex items-center gap-1 whitespace-nowrap'>
                          Bids
                          <span>
                            {sortDirection === 'asc' && sortKey === 'totalBids' ? '↑' : '↓'}
                          </span>
                        </div>
                      </th>
                      <th
                        className='px-6 py-3 text-left text-xs font-medium text-gray-700 cursor-pointer'
                        onClick={() => handleSort('startingPrice')}
                      >
                        <div className='flex items-center gap-1 whitespace-nowrap'>
                          Starting Price
                          <span>
                            {sortDirection === 'asc' && sortKey === 'startingPrice' ? '↑' : '↓'}
                          </span>
                        </div>
                      </th>
                      <th
                        className='px-6 py-3 text-left text-xs font-medium text-gray-700 cursor-pointer'
                        onClick={() => handleSort('currentBid')}
                      >
                        <div className='flex items-center gap-1 whitespace-nowrap'>
                          Current Bid{' '}
                          <span>
                            {sortDirection === 'asc' && sortKey === 'currentBid' ? '↑' : '↓'}
                          </span>
                        </div>
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-700'>
                        <div className='flex items-center gap-1 whitespace-nowrap'>Increase</div>
                      </th>
                      <th
                        className='px-6 py-3 text-left text-xs font-medium text-gray-700 cursor-pointer'
                        onClick={() => handleSort('status')}
                      >
                        <div className='flex items-center gap-1 whitespace-nowrap'>
                          Status{' '}
                          <span>{sortDirection === 'asc' && sortKey === 'status' ? '↑' : '↓'}</span>
                        </div>
                      </th>
                      <th
                        className='px-6 py-3 text-left text-xs font-medium text-gray-700 cursor-pointer'
                        onClick={() => handleSort('shippingCosts')}
                      >
                        <div className='flex items-center gap-1 whitespace-nowrap'>
                          Shipping{' '}
                          <span>
                            {sortDirection === 'asc' && sortKey === 'shippingCosts' ? '↑' : '↓'}
                          </span>
                        </div>
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 whitespace-nowrap'>
                        View Bids
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 whitespace-nowrap'>
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-100'>
                    {auctionItems?.map((item: any, index: number) => {
                      const bidIncrease = item.currentBid - item.startingPrice;
                      const percentIncrease =
                        item.startingPrice > 0
                          ? ((bidIncrease / item.startingPrice) * 100).toFixed(1)
                          : 0;

                      return (
                        <motion.tr
                          key={item._id || index}
                          onClick={() => {
                            dispatch(setOpenAuctionItemDrawer());
                            dispatch(
                              setInputs({
                                formName: 'auctionItemForm',
                                data: { ...item, isUpdating: true },
                              })
                            );
                          }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className='cursor-pointer'
                        >
                          <td className='px-6 py-4'>
                            <div className='flex items-center gap-3 min-w-0'>
                              <div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden'>
                                {item.photos && item.photos.length > 0 ? (
                                  <img
                                    src={item.photos[0].url}
                                    alt={item.name}
                                    className='w-full h-full object-cover'
                                  />
                                ) : (
                                  <Image className='w-5 h-5 text-gray-400' />
                                )}
                              </div>
                              <div className='min-w-0 flex-1'>
                                <h4 className='font-medium text-gray-900 text-sm truncate'>
                                  {item.name}
                                </h4>
                                <p className='text-xs text-gray-500 truncate'>{item.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4'>
                            <span className='font-medium text-gray-900 text-sm'>
                              {item.totalBids}
                            </span>
                          </td>
                          <td className='px-6 py-4'>
                            <span className='font-medium text-gray-900 text-sm'>
                              ${item.startingPrice?.toFixed(2)}
                            </span>
                          </td>
                          <td className='px-6 py-4'>
                            <span className='font-medium text-gray-900 text-sm'>
                              ${item.currentBid?.toFixed(2)}
                            </span>
                          </td>
                          <td className='px-6 py-4'>
                            <div className='flex flex-col'>
                              <span
                                className={`font-semibold text-sm ${
                                  bidIncrease > 0 ? 'text-green-600' : 'text-gray-600'
                                }`}
                              >
                                ${bidIncrease?.toFixed(2)}
                              </span>
                              <span
                                className={`text-xs ${
                                  bidIncrease > 0 ? 'text-green-600' : 'text-gray-600'
                                }`}
                              >
                                ({percentIncrease}%)
                              </span>
                            </div>
                          </td>
                          <td className='px-6 py-4'>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(
                                item.status
                              )}`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className='px-6 py-4'>
                            <span className='font-medium text-gray-900 text-sm'>
                              ${item?.shippingCosts?.toFixed(2)}
                            </span>
                          </td>
                          <td className='px-6 py-4'>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                dispatch(
                                  setInputs({
                                    formName: 'auctionItemBidsForm',
                                    data: { ...item },
                                  })
                                );
                                dispatch(setOpenAuctionItemBidsDrawer());
                                e.stopPropagation();
                              }}
                              className='p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-600 hover:text-gray-900'
                            >
                              <Eye className='w-4 h-4' />
                            </motion.button>
                          </td>
                          <td className='px-6 py-4'>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              disabled={isActiveAuction}
                              className='p-1.5 hover:bg-red-50 disabled:opacity-50 rounded transition-colors text-red-600 hover:text-red-700'
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(item);
                              }}
                            >
                              <Trash2 className='w-4 h-4' />
                            </motion.button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {filteredArray && filteredArray.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4'
        >
          <div className='bg-white border border-gray-200 rounded-lg p-4'>
            <div className='text-sm font-medium text-gray-600'>Total Items</div>
            <div className='text-2xl font-bold text-gray-900 mt-2'>{filteredArray.length}</div>
          </div>
          <div className='bg-white border border-gray-200 rounded-lg p-4'>
            <div className='text-sm font-medium text-gray-600'>Total Bids</div>
            <div className='text-2xl font-bold text-gray-900 mt-2'>
              {filteredArray.reduce((sum: number, item: any) => sum + (item.totalBids || 0), 0)}
            </div>
          </div>
          <div className='bg-white border border-gray-200 rounded-lg p-4'>
            <div className='text-sm font-medium text-gray-600'>Total Value</div>
            <div className='text-2xl font-bold text-gray-900 mt-2'>
              {formatPrice(
                filteredArray.reduce(
                  (sum: number, item: any) =>
                    sum +
                    (item.currentBid ||
                      item.startingPrice ||
                      item.buyNowPrice * item.totalQuantity ||
                      0),
                  0
                )
              )}
            </div>
          </div>
          <div className='bg-white border border-gray-200 rounded-lg p-4'>
            <div className='text-sm font-medium text-gray-600'>Avg. Price</div>
            <div className='text-2xl font-bold text-gray-900 mt-2'>
              {formatPrice(
                Math.round(
                  filteredArray.reduce(
                    (sum: number, item: any) => sum + (item.currentBid || item.startingPrice || 0),
                    0
                  ) / filteredArray.length
                )
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AuctionItems;
