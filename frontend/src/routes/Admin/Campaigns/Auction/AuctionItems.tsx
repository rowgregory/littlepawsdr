import { Link, useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { Search, Plus, Package, Eye, Edit, Trash2, TrendingUp, DollarSign, Truck, Image, Zap } from 'lucide-react';
import { RootState, useAppDispatch, useAppSelector } from '../../../../redux/toolkitStore';
import DeleteModal from '../../../../components/DeleteModal';
import { useDeleteAuctionItemMutation } from '../../../../redux/services/campaignApi';
import useDeleteModal from '../../../../hooks/useDeleteModal';
import {
  setInitialArray,
  setOpenAuctionItemCreateDrawer,
  setOpenAuctionItemUpdateDrawer,
  setSearchQuery,
} from '../../../../redux/features/campaign/campaignSlice';
import { motion } from 'framer-motion';
import { setInputs } from '../../../../redux/features/form/formSlice';

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

const getFormatColor = (format: string) => {
  switch (format?.toLowerCase()) {
    case 'auction':
      return 'text-blue-700 bg-blue-50 border-blue-200';
    case 'fixed':
      return 'text-purple-700 bg-purple-50 border-purple-200';
    case 'buy-now':
      return 'text-green-700 bg-green-50 border-green-200';
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
  const { id: campaignId } = useParams();
  const campaign = useAppSelector((state: RootState) => state.campaign);
  const auctionItems = campaign?.campaign?.auction?.items;
  const noAuctionItems = auctionItems?.length === 0;
  const filteredData = campaign?.filteredArray;
  const auctionItemsAmount = filteredData?.length;
  const isActiveCampaign = campaign?.campaign?.campaignStatus === 'Active Campaign';

  const { openModal, show, closeModal } = useDeleteModal();

  const [deleteAuctionItem, { isLoading: loadingDelete }] = useDeleteAuctionItemMutation();

  useEffect(() => {
    dispatch(setInitialArray({ arrayToFilter: auctionItems }));
  }, [auctionItems, dispatch]);

  const handleSearch = (e: any) => dispatch(setSearchQuery({ text: e.target.value, arrayToFilter: auctionItems }));

  const handleDelete = (item: any) => {
    setId(item._id);
    openModal();
  };

  const CreateAuctionItemButton = () => (
    <motion.button
      onClick={() => {
        dispatch(setInputs({ formName: 'auctionItemCreateForm', data: { requiresShipping: true } }));
        dispatch(setOpenAuctionItemCreateDrawer());
      }}
      className='bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 w-fit disabled:bg-gradient-to-r disabled:from-zinc-500 disabled:to-zinc-800 disabled:cursor-not-allowed disabled:shadow-none disabled:opacity-60 disabled:hover:from-gray-300 disabled:hover:to-gray-300'
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Plus className='w-5 h-5 disabled:text-gray-400' />
      <span>New Auction Item</span>
    </motion.button>
  );

  return (
    <Fragment>
      <DeleteModal type='Auction Item' id={id} deleteDocument={deleteAuctionItem} loading={loadingDelete} hook={{ openModal, show, closeModal }} />

      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <h1 className='text-2xl font-semibold text-gray-900 flex items-center gap-2'>
            <Package className='w-6 h-6 text-blue-600' />
            Items
          </h1>
          <div className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium'>({auctionItemsAmount || 0})</div>
        </div>
      </div>

      {/* Search and Add Item */}
      <div className='flex items-center justify-between mb-6 gap-4'>
        <div className='relative flex-1 max-w-md'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
          <input
            type='text'
            placeholder='Search items...'
            onChange={handleSearch}
            className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          />
        </div>
        <CreateAuctionItemButton />
      </div>

      {/* Content */}
      <div className='bg-white border border-gray-200 rounded-lg'>
        {noAuctionItems ? (
          /* Empty State */
          <div className='flex items-center justify-center flex-col py-16'>
            <div className='w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
              <Package className='w-8 h-8 text-gray-400' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No auction items</h3>
            <p className='text-gray-600 mb-6'>Get started by adding your first auction item</p>
            <CreateAuctionItemButton />
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <div className='min-w-[885px]'>
              {/* Table Header */}
              <div className='bg-gray-50 border-b border-gray-200'>
                <div className='grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-gray-700'>
                  <div className='col-span-3'>Item</div>
                  <div className='col-span-2'>Format</div>
                  <div className='col-span-1'>Bids/Qty</div>
                  <div className='col-span-2'>Current Price</div>
                  <div className='col-span-2'>Status</div>
                  <div className='col-span-1'>Shipping</div>
                  <div className='col-span-1'>Actions</div>
                </div>
              </div>

              {/* Table Body */}
              <div className='divide-y divide-gray-100'>
                {filteredData?.map((item: any, index: number) => (
                  <div key={item._id || index} className='grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors'>
                    {/* Item Info */}
                    <div className='col-span-3 flex items-center gap-3'>
                      <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                        {item.photos && item.photos.length > 0 ? (
                          <img src={item.photos[0].url} alt={item.name} className='w-full h-full object-cover rounded-lg' />
                        ) : (
                          <Image className='w-6 h-6 text-blue-600' />
                        )}
                      </div>
                      <div className='min-w-0 flex-1'>
                        <div className='font-medium text-gray-900 truncate'>{item.name}</div>
                        <div className='text-sm text-gray-500 truncate'>{item.description}</div>
                      </div>
                    </div>

                    {/* Format */}
                    <div className='col-span-2 flex items-center'>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getFormatColor(item.sellingFormat)}`}
                      >
                        {item.sellingFormat === 'auction' ? 'Auction' : item.sellingFormat === 'fixed' ? 'Fixed Price' : item.sellingFormat}
                      </div>
                    </div>

                    {/* Bids/Qty */}
                    <div className='col-span-1 flex items-center'>
                      <div className='flex items-center gap-1'>
                        {item.sellingFormat === 'auction' ? (
                          <TrendingUp className='w-4 h-4 text-green-600' />
                        ) : (
                          <Package className='w-4 h-4 text-blue-600' />
                        )}
                        <span className='font-medium text-gray-900'>{item.totalBids ?? item.totalQuantity}</span>
                      </div>
                    </div>

                    {/* Current Price */}
                    <div className='col-span-2 flex items-center'>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-1'>
                          {item.buyNowPrice ? <Zap className='w-4 h-4 text-orange-600' /> : <DollarSign className='w-4 h-4 text-green-600' />}
                          <span className='font-semibold text-gray-900'>
                            {formatPrice(item.currentBid || item.startingPrice || item.buyNowPrice)}
                          </span>
                        </div>
                        {item.minimumBid !== item.startingPrice && <div className='text-xs text-gray-500'>Next: {formatPrice(item.minimumBid)}</div>}
                      </div>
                    </div>

                    {/* Status */}
                    <div className='col-span-2 flex items-center'>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </div>
                      {item.requiresShipping && (
                        <div className='ml-2' title='Requires Shipping'>
                          <Truck className='w-4 h-4 text-orange-500' />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className='col-span-1 flex items-center'>
                      <div className='text-sm text-gray-600'>{item.shippingCosts > 0 && <div>{formatPrice(item.shippingCosts)}</div>}</div>
                    </div>

                    {/* Actions */}
                    <div className='col-span-1 flex items-center justify-end gap-1'>
                      <Link
                        to={`/admin/campaigns/${campaignId}/auction/items/${item._id}/bids`}
                        className='p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600 hover:text-blue-700'
                        title='View Details'
                      >
                        <Eye className='w-4 h-4' />
                      </Link>
                      <button
                        onClick={() => dispatch(setOpenAuctionItemUpdateDrawer(item))}
                        className='p-2 hover:bg-gray-100 disabled:hover:bg-gray-50 rounded-lg transition-colors text-gray-600 hover:text-gray-700 disabled:cursor-not-allowed'
                        title='Edit Item'
                      >
                        <Edit className='w-4 h-4' />
                      </button>
                      <button
                        disabled={isActiveCampaign}
                        className='p-2 hover:bg-red-100 disabled:hover:bg-gray-50 rounded-lg transition-colors text-red-600 hover:text-red-700 disabled:cursor-not-allowed'
                        onClick={() => handleDelete(item)}
                        title='Delete Item'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {filteredData && filteredData.length > 0 && (
        <div className='mt-6 bg-gray-50 rounded-lg p-6'>
          <div className='grid grid-cols-4 gap-6'>
            <div className='text-center'>
              <div className='text-2xl font-semibold text-gray-900'>{filteredData.length}</div>
              <div className='text-sm text-gray-600'>Total Items</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-semibold text-green-600'>
                {filteredData.reduce((sum: number, item: any) => sum + (item.totalBids || 0), 0)}
              </div>
              <div className='text-sm text-gray-600'>Total Bids</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-semibold text-blue-600'>
                {formatPrice(
                  filteredData.reduce(
                    (sum: number, item: any) => sum + (item.currentBid || item.startingPrice || item.buyNowPrice * item.totalQuantity || 0),
                    0
                  )
                )}
              </div>
              <div className='text-sm text-gray-600'>Total Value</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-semibold text-purple-600'>
                {formatPrice(
                  Math.round(
                    filteredData.reduce((sum: number, item: any) => sum + (item.currentBid || item.startingPrice || 0), 0) / filteredData.length
                  )
                )}
              </div>
              <div className='text-sm text-gray-600'>Avg. Price</div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AuctionItems;
