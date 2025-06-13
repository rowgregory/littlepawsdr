import { Link, useParams } from 'react-router-dom';
import { RootState, useAppSelector } from '../../../../redux/toolkitStore';
import { useGetAuctionItemQuery } from '../../../../redux/services/campaignApi';
import GreenRotatingTransparentCircle from '../../../../components/Loaders/GreenRotatingTransparentCircle';
import { Fragment } from 'react';
import { formatDateWithTimezone } from '../../../../utils/dateFunctions';
import { ArrowLeft, TrendingUp, User, Calendar, Mail, CheckCircle, X, Clock, Package, DollarSign, Image as ImageIcon } from 'lucide-react';

const AuctionItemBids = () => {
  const { auctionItemId } = useParams();
  const campaign = useAppSelector((state: RootState) => state.campaign);
  const item = campaign?.auctionItem;
  const settings = campaign?.campaign?.auction?.settings;
  const { isLoading, data } = useGetAuctionItemQuery({ auctionItemId }, { refetchOnMountOrArgChange: true });

  if (isLoading) return <GreenRotatingTransparentCircle />;

  const bids = data?.auctionItem?.bids;
  const instantBuyers = data?.auctionItem?.instantBuyers;
  const isBids = bids?.length > 0;
  const isNoInstantBuyers = instantBuyers?.length > 0;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Top Bid':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Outbid':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getEmailStatusIcon = (bid: any) => {
    if (bid.status === 'Top Bid') {
      return <Clock className='w-4 h-4 text-gray-400' />;
    }
    return bid.outBidEmailSent ? <CheckCircle className='w-4 h-4 text-green-500' /> : <X className='w-4 h-4 text-red-500' />;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <Fragment>
      {/* Back Button */}
      <Link
        to={`/admin/campaigns/${campaign?.campaign?._id}/auction/items`}
        className='inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors hover:no-underline mb-6'
      >
        <ArrowLeft className='w-4 h-4 text-gray-600' />
        <span className='font-medium text-gray-700'>Back to items</span>
      </Link>

      {/* Bids/Instant Buys Table */}
      {(isBids || isNoInstantBuyers) && (
        <div className='mb-8'>
          <div className='flex items-center gap-2 mb-6'>
            <TrendingUp className='w-6 h-6 text-blue-600' />
            <h1 className='text-2xl font-semibold text-gray-900'>{item?.sellingFormat === 'fixed' ? 'Instant Buys' : 'Bids'}</h1>
            <div className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium ml-2'>
              {(bids?.length || 0) + (instantBuyers?.length || 0)}
            </div>
          </div>

          <div className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm'>
            {/* Table Header */}
            <div className='bg-gray-50 border-b border-gray-200'>
              <div className='grid grid-cols-5 gap-4 px-6 py-3 text-sm font-medium text-gray-700'>
                <div className='flex items-center gap-2'>
                  <DollarSign className='w-4 h-4' />
                  Amount
                </div>
                <div className='flex items-center gap-2'>
                  <User className='w-4 h-4' />
                  Bidder Name
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4' />
                  Date & Time
                </div>
                <div className='flex items-center gap-2'>
                  <Mail className='w-4 h-4' />
                  Email Status
                </div>
                <div>Status</div>
              </div>
            </div>

            {/* Table Body */}
            <div className='divide-y divide-gray-100'>
              {/* Bids */}
              {campaign?.auctionItem?.bids
                ?.map((bid: any, i: number) => (
                  <div key={i} className='grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors'>
                    <div className='flex items-center'>
                      <span className='font-semibold text-gray-900'>{formatPrice(bid?.bidAmount)}</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='text-gray-900'>{bid?.bidder}</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='text-gray-600 text-sm'>{formatDateWithTimezone(bid?.createdAt)}</span>
                    </div>
                    <div className='flex items-center'>{getEmailStatusIcon(bid)}</div>
                    <div className='flex items-center'>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(bid?.status)}`}>
                        {bid?.status}
                      </span>
                    </div>
                  </div>
                ))
                .reverse()}

              {/* Instant Buyers */}
              {campaign?.auctionItem?.instantBuyers?.map((instantBuyer: any, i: number) => (
                <div key={`instant-${i}`} className='grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors'>
                  <div className='flex items-center'>
                    <span className='font-semibold text-gray-900'>{formatPrice(instantBuyer?.totalPrice)}</span>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-gray-900'>{instantBuyer?.name}</span>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-gray-600 text-sm'>{formatDateWithTimezone(instantBuyer?.createdAt)}</span>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-gray-500 text-sm'>N/A</span>
                  </div>
                  <div className='flex items-center'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border bg-green-50 text-green-700 border-green-200'>
                      {instantBuyer?.paymentStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Item Details Card */}
      <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm'>
        {/* Item Header */}
        <div className='mb-6'>
          <p className='text-gray-500 text-sm mb-2'>#{auctionItemId}</p>
          <div className='flex items-center gap-3 mb-4'>
            <Package className='w-6 h-6 text-blue-600' />
            <h1 className='text-2xl font-semibold text-gray-900'>{item?.name}</h1>
          </div>
        </div>

        {/* Description */}
        <div className='mb-6'>
          <h3 className='font-semibold text-gray-900 mb-2'>Description</h3>
          <p className='text-gray-700 leading-relaxed'>{item?.description}</p>
        </div>

        {/* Price and Quantity */}
        <div className='grid grid-cols-2 gap-6 mb-6'>
          <div className='bg-gray-50 rounded-lg p-4'>
            <p className='text-gray-600 text-sm mb-1'>{item?.sellingFormat === 'auction' ? 'Current Bid' : 'Buy It Now Price'}</p>
            <p className='text-2xl font-bold text-gray-900'>{formatPrice(item?.buyNowPrice || item?.currentBid || 0)}</p>
          </div>
          <div className='bg-gray-50 rounded-lg p-4'>
            <p className='text-gray-600 text-sm mb-1'>Quantity Available</p>
            <p className='text-2xl font-bold text-gray-900'>{item?.totalQuantity}</p>
          </div>
        </div>

        {/* Item Image */}
        <div className='mb-6'>
          <h3 className='font-semibold text-gray-900 mb-3'>Item Photo</h3>
          {item?.photos?.[0]?.url ? (
            <img
              src={item.photos[0].url}
              alt={`${item.name} - ${item._id}`}
              className='max-w-sm w-full rounded-lg border border-gray-200 shadow-sm'
            />
          ) : (
            <div className='max-w-sm w-full h-64 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center'>
              <div className='text-center'>
                <ImageIcon className='w-12 h-12 text-gray-400 mx-auto mb-2' />
                <p className='text-gray-500 text-sm'>No image available</p>
              </div>
            </div>
          )}
        </div>

        {/* Auction Timeline */}
        <div className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
          <div className='flex items-center gap-2 mb-3'>
            <Clock className='w-5 h-5 text-blue-600' />
            <h3 className='font-semibold text-blue-900'>Auction Timeline</h3>
          </div>
          <div className='flex items-center gap-4'>
            <div>
              <p className='text-blue-700 text-sm font-medium'>Starts</p>
              <p className='text-blue-900 font-semibold'>{formatDateWithTimezone(settings?.startDate)}</p>
            </div>
            <div className='flex-1 flex items-center justify-center'>
              <div className='h-px bg-blue-300 flex-1'></div>
              <ArrowLeft className='w-4 h-4 text-blue-600 mx-2 rotate-180' />
              <div className='h-px bg-blue-300 flex-1'></div>
            </div>
            <div>
              <p className='text-blue-700 text-sm font-medium'>Ends</p>
              <p className='text-blue-900 font-semibold'>{formatDateWithTimezone(settings?.endDate)}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AuctionItemBids;
