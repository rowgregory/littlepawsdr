import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAuctionSelector, useUserSelector } from '../../redux/toolkitStore';
import { useLightningTransition } from '../../components/transitions/LightningTransition';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '../../utils/dateFunctions';
import { setOpenBidModal } from '../../redux/features/auctionSlice';
import AuctionItemButtonBox from '../../components/auction/AuctionItemButtonBox';
import AuctionItemDetailsSection from '../../components/auction/AuctionItemDetailsSection';
import AuctionItemBidHistory from '../../components/auction/AuctionItemBidHistory';

const AuctionItem = () => {
  const { customAuctionLink, auctionItemId } = useParams();
  const { auction } = useAuctionSelector();
  const { user } = useUserSelector();
  const ifAuctionIsOver = auction?.status === 'ENDED';
  const [selectedImage, setSelectedImage] = useState(0) as any;
  const { triggerLightning, LightningComponent } = useLightningTransition();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const auctionItem = useMemo(
    () => auction?.items?.find((item: any) => item._id === auctionItemId),
    [auction, auctionItemId]
  );

  // Add navigation logic with looping
  const { prevItem, nextItem, currentIndex, totalItems } = useMemo(() => {
    const allItems = auction?.items || [];
    const currentIndex = allItems.findIndex((item: any) => item._id === auctionItemId);

    if (allItems.length === 0 || currentIndex === -1) {
      return { prevItem: null, nextItem: null, currentIndex: 0, totalItems: 0 };
    }

    return {
      // Loop to end if at beginning, otherwise go to previous
      prevItem: currentIndex === 0 ? allItems[allItems.length - 1] : allItems[currentIndex - 1],

      // Loop to beginning if at end, otherwise go to next
      nextItem: currentIndex === allItems.length - 1 ? allItems[0] : allItems[currentIndex + 1],

      currentIndex: currentIndex + 1, // Convert to 1-based for display
      totalItems: allItems.length,
    };
  }, [auction, auctionItemId]);

  const navigateToItem = (itemId: string) =>
    navigate(`/auctions/${customAuctionLink}/item/${itemId}`);

  return (
    <>
      <LightningComponent />
      <div className='min-h-dvh bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative pb-40'>
        {/* Previous Item Arrow with loop indicator */}
        <div className={`${auction?.items?.length >= 2 ? 'hidden lg:block' : 'hidden'}`}>
          {prevItem && (
            <button
              onClick={() => navigateToItem(prevItem._id)}
              className='fixed left-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-4 transition-all duration-300 hover:scale-110'
            >
              <ChevronLeft className='w-6 h-6 text-white' />
            </button>
          )}

          {nextItem && (
            <button
              onClick={() => navigateToItem(nextItem._id)}
              className='fixed right-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-4 transition-all duration-300 hover:scale-110'
            >
              <ChevronRight className='w-6 h-6 text-white' />
            </button>
          )}
        </div>

        {/* Header */}
        <header className='bg-white/5 backdrop-blur-xl border-b border-white/10'>
          <div className='max-w-7xl mx-auto px-3 sm:px-6 py-4'>
            <div className='flex flex-col gap-y-3 sm:gap-y-0 sm:flex-row sm:items-center sm:justify-between'>
              <Link to='/' className='flex items-center space-x-3 group'>
                <div className='w-12 h-12 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition-transform'>
                  🐾
                </div>
                <div className='text-white'>
                  <h1 className='text-xl font-bold'>Little Paws Rescue</h1>
                  <p className='text-sm text-white/70'>Premium Auction Experience</p>
                </div>
              </Link>

              <div className='flex items-center space-x-3'>
                <Link
                  to={`/auctions/${auction?.customAuctionLink}`}
                  className='hidden md:flex items-center px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all'
                >
                  <svg
                    className='w-4 h-4 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                  Back to Auction
                </Link>
                <Link
                  to='/auctions'
                  className='px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all'
                >
                  Auctions
                </Link>
                <Link
                  to={
                    user?._id
                      ? '/supporter/overview'
                      : `/auth/register?auctionItemId=${auctionItem?._id}&customAuctionLink=${customAuctionLink}&conversionSource=auction_item_header`
                  }
                  className='px-5 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-full hover:from-pink-600 hover:to-violet-600 transition-all font-medium shadow-lg'
                >
                  {user?._id ? 'Profile' : 'Join Now'}
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className='max-w-7xl mx-auto px-3 sm:px-6 py-12'>
          {/* Breadcrumb */}
          <div className='flex items-center space-x-2 text-white/60 text-sm mb-8'>
            <Link to={`/auctions/${auction?.customAuctionLink}`}>Auction</Link>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
            <span className='text-white/90'>{auctionItem?.name}</span>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
            {/* Left Side - Image Gallery */}
            <div className='space-y-6'>
              {/* Status Badge */}
              <div className='flex justify-between items-start mb-4'>
                <div
                  className={`text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-xl flex items-center space-x-2 ${(() => {
                    const isAuction = auctionItem?.sellingFormat === 'auction';
                    const count = isAuction
                      ? auctionItem?.bids?.length || 0
                      : auctionItem?.instantBuyers?.length || 0;

                    if (count === 0) return 'bg-gradient-to-r from-gray-500 to-gray-600';
                    if (count >= 1 && count <= 2)
                      return 'bg-gradient-to-r from-blue-500 to-purple-600';
                    if (count >= 3 && count <= 4)
                      return 'bg-gradient-to-r from-orange-500 to-red-500';
                    if (count >= 5 && count <= 9)
                      return 'bg-gradient-to-r from-red-500 to-pink-500';
                    if (count >= 10) return 'bg-gradient-to-r from-purple-600 to-red-600';
                  })()}`}
                >
                  {(() => {
                    const isAuction = auctionItem?.sellingFormat === 'auction';
                    const count = isAuction
                      ? auctionItem?.bids?.length || 0
                      : auctionItem?.instantBuyers?.length || 0;

                    if (count === 0) {
                      if (auction?.status === 'DRAFT') {
                        return (
                          <>
                            <span>✨</span>
                            <span>STARTING SOON</span>
                          </>
                        );
                      }
                      return (
                        <>
                          <span>✨</span>
                          <span>{isAuction ? 'NO BIDS YET' : 'AVAILABLE NOW'}</span>
                        </>
                      );
                    } else if (count >= 1 && count <= 2) {
                      return (
                        <>
                          <span>👀</span>
                          <span>{isAuction ? 'GETTING NOTICED' : 'SELLING FAST'}</span>
                        </>
                      );
                    } else if (count >= 3 && count <= 4) {
                      return (
                        <>
                          <span>🔥</span>
                          <span>{isAuction ? 'HEATING UP' : 'HIGH DEMAND'}</span>
                        </>
                      );
                    } else if (count >= 5 && count <= 9) {
                      return (
                        <>
                          <span>⚡</span>
                          <span>{isAuction ? 'HOT ITEM' : 'VERY POPULAR'}</span>
                        </>
                      );
                    } else if (count >= 10) {
                      return (
                        <>
                          <span>💥</span>
                          <span>{isAuction ? 'BIDDING WAR!' : 'BESTSELLER!'}</span>
                        </>
                      );
                    }
                  })()}
                </div>
              </div>

              {/* Main Image */}
              <div className='relative group'>
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl z-10 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                <img
                  src={auctionItem?.photos[selectedImage]?.url}
                  alt={auctionItem?.name}
                  className='w-full h-96 lg:h-[500px] object-contain rounded-3xl shadow-2xl border border-white/20'
                />

                {/* Image Navigation */}
                <div
                  className={`${
                    auction?.items?.length >= 2 ? 'block' : 'hidden'
                  } absolute inset-y-0 left-4 flex items-center z-20`}
                >
                  <button
                    onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                    className='w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm'
                    disabled={selectedImage === 0}
                  >
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 19l-7-7 7-7'
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className={`${
                    auction?.items?.length >= 2 ? 'block' : 'hidden'
                  } absolute inset-y-0 right-4 flex items-center z-20`}
                >
                  <button
                    onClick={() =>
                      setSelectedImage(
                        Math.min((auctionItem?.photos?.length || 1) - 1, selectedImage + 1)
                      )
                    }
                    className='w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm'
                    disabled={selectedImage === (auctionItem?.photos?.length || 1) - 1}
                  >
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className='grid grid-cols-5 gap-3'>
                {auctionItem?.photos?.map((photo: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                      selectedImage === index
                        ? 'ring-2 ring-yellow-400 scale-105 shadow-lg'
                        : 'hover:scale-105 hover:shadow-md opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo?.url}
                      alt={`View ${index + 1}`}
                      className='w-full h-16 object-contain'
                    />
                    {selectedImage === index && (
                      <div className='absolute inset-0 bg-yellow-400/20 border-2 border-yellow-400 rounded-xl'></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Item Details */}
            <div className='space-y-8'>
              {/* Title Section */}
              <div>
                <h1 className='text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight'>
                  {auctionItem?.name}
                </h1>
                <p className='text-xl text-white/80 leading-relaxed'>{auctionItem?.description}</p>
              </div>

              {/* Pricing Cards */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div className='bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-6 border border-green-400/30'>
                  <div className='text-green-200 text-sm font-medium mb-2 uppercase tracking-wide'>
                    {auctionItem?.buyNowPrice ? 'Buy It Now' : 'Current Bid'}
                  </div>
                  <div className='text-4xl font-bold text-white mb-1'>
                    ${auctionItem?.buyNowPrice || auctionItem?.currentBid}
                  </div>
                  <div className='text-green-200 text-sm space-y-1'>
                    <div>
                      {auctionItem?.buyNowPrice
                        ? 'Instant purchase'
                        : `${auctionItem?.bids?.length || 0} bids`}
                    </div>
                    {/* Add minimum bid for auction items */}
                    {!auctionItem?.buyNowPrice && auctionItem?.minimumBid && (
                      <div className='text-green-300/80 text-xs'>
                        Min bid: ${auctionItem.minimumBid.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className='bg-gradient-to-br from-red-400/20 to-orange-500/20 backdrop-blur-xl rounded-2xl p-6 border border-red-400/30'>
                  <div className='text-red-200 text-sm font-medium mb-2 uppercase tracking-wide'>
                    {auction?.status === 'DRAFT'
                      ? 'Time Until'
                      : auction?.status === 'ACTIVE'
                      ? 'Time Remaining'
                      : 'Thank you for participating!'}
                  </div>
                  {/* <div className='text-2xl font-bold text-white mb-1'>
                    {auction?.status === 'DRAFT'
                      ? timeUntilStartDate
                      : auction?.status === 'ACTIVE'
                      ? timeUntilEndDate
                      : ''}
                  </div> */}
                  <div className='text-red-200 text-sm'>Ends {formatDate(auction?.endDate)}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='space-y-4'>
                <AuctionItemButtonBox
                  auctionItem={auctionItem}
                  auction={auction}
                  customAuctionLink={customAuctionLink ?? ''}
                  ifAuctionIsOver={ifAuctionIsOver}
                  user={user}
                  triggerLightning={triggerLightning}
                />
              </div>

              {/* Quick Stats */}
              <div className='bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10'>
                <h3 className='text-xl font-bold text-white mb-4'>Auction Details</h3>
                <AuctionItemDetailsSection auction={auction} auctionItem={auctionItem} />
              </div>

              {/* Shipping Info */}
              <div className='bg-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-400/20'>
                <div className='flex items-center space-x-3 mb-3'>
                  <div className='w-10 h-10 bg-blue-400/20 rounded-full flex items-center justify-center'>
                    <svg
                      className='w-5 h-5 text-blue-300'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className='text-white font-semibold'>
                      {(auctionItem?.shippingCosts || 0) > 0
                        ? `$${auctionItem?.shippingCosts}`
                        : 'Free'}{' '}
                      Shipping
                    </h4>
                    <p className='text-blue-200 text-sm'>Delivered within 5-7 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bid History Section */}
          {auctionItem?.sellingFormat === 'auction' && (
            <div className='mt-16'>
              <div className='bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10'>
                <h2 className='text-3xl font-bold text-white mb-8 flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-purple-400/20 rounded-full flex items-center justify-center'>
                    <svg
                      className='w-5 h-5 text-purple-300'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                      />
                    </svg>
                  </div>
                  <span>Bid History</span>
                </h2>
                <AuctionItemBidHistory auctionItem={auctionItem} />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom Bar */}
        <div className='lg:hidden fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-t border-white/20 p-4 z-50'>
          <div className='max-w-7xl mx-auto space-y-3'>
            {/* Navigation Row */}
            <div
              className={`${
                auction?.items?.length >= 2 ? 'block' : 'hidden'
              } flex items-center justify-between`}
            >
              {prevItem && (
                <button
                  onClick={() => navigateToItem(prevItem._id)}
                  className='flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-full px-3 py-2 transition-all duration-200'
                  disabled={!prevItem}
                >
                  <ChevronLeft className='w-4 h-4 text-white' />
                  <span className='text-xs font-medium text-white'>Prev</span>
                </button>
              )}

              <div className='text-center'>
                <p className='text-white/60 text-xs'>Item</p>
                <p className='text-white font-bold text-sm'>
                  {currentIndex} of {totalItems}
                </p>
              </div>
              {nextItem && (
                <button
                  onClick={() => navigateToItem(nextItem._id)}
                  className='flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-full px-3 py-2 transition-all duration-200'
                  disabled={!nextItem}
                >
                  <span className='text-xs font-medium text-white'>Next</span>
                  <ChevronRight className='w-4 h-4 text-white' />
                </button>
              )}
            </div>

            {/* Existing Bid Row */}
            <div className='flex items-center justify-between'>
              <div className='text-white'>
                <div className='text-sm opacity-80'>Current Bid</div>
                <div className='text-2xl font-bold'>
                  ${auctionItem?.buyNowPrice || auctionItem?.currentBid}
                </div>
              </div>
              <button
                onClick={() => dispatch(setOpenBidModal())}
                className='px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-full font-bold text-lg shadow-xl hover:from-pink-600 hover:to-violet-600 transition-all'
              >
                Place Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionItem;
