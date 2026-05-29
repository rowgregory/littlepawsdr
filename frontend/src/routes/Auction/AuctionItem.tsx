import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAuctionSelector, useUserSelector } from '../../redux/toolkitStore';
import { useLightningTransition } from '../../components/transitions/LightningTransition';
import { BarChart3, ChevronLeft, ChevronRight, Truck } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState(0);
  const { triggerLightning, LightningComponent } = useLightningTransition();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const auctionItem = useMemo(
    () => auction?.items?.find((item: any) => item._id === auctionItemId),
    [auction, auctionItemId],
  );

  // Reset gallery to first photo when navigating between items
  useEffect(() => setSelectedImage(0), [auctionItemId]);

  const { prevItem, nextItem, currentIndex, totalItems } = useMemo(() => {
    const allItems = auction?.items || [];
    const idx = allItems.findIndex((item: any) => item._id === auctionItemId);
    if (allItems.length === 0 || idx === -1) {
      return { prevItem: null, nextItem: null, currentIndex: 0, totalItems: 0 };
    }
    return {
      prevItem: idx === 0 ? allItems[allItems.length - 1] : allItems[idx - 1],
      nextItem: idx === allItems.length - 1 ? allItems[0] : allItems[idx + 1],
      currentIndex: idx + 1,
      totalItems: allItems.length,
    };
  }, [auction, auctionItemId]);

  const navigateToItem = (itemId: string) =>
    navigate(`/auctions/${customAuctionLink}/item/${itemId}`);

  const photos = auctionItem?.photos ?? [];
  const hasMultipleItems = (auction?.items?.length ?? 0) >= 2;

  // Status badge: color + label by activity count
  const isAuctionFormat = auctionItem?.sellingFormat === 'auction';
  const activityCount = isAuctionFormat
    ? auctionItem?.bids?.length || 0
    : auctionItem?.instantBuyers?.length || 0;

  const badge = (() => {
    if (activityCount === 0) {
      if (auction?.status === 'DRAFT')
        return { cls: 'from-gray-500 to-gray-600', icon: '✨', text: 'Starting Soon' };
      return {
        cls: 'from-gray-500 to-gray-600',
        icon: '✨',
        text: isAuctionFormat ? 'No Bids Yet' : 'Available Now',
      };
    }
    if (activityCount <= 2)
      return {
        cls: 'from-blue-500 to-purple-600',
        icon: '👀',
        text: isAuctionFormat ? 'Getting Noticed' : 'Selling Fast',
      };
    if (activityCount <= 4)
      return {
        cls: 'from-orange-500 to-red-500',
        icon: '🔥',
        text: isAuctionFormat ? 'Heating Up' : 'High Demand',
      };
    if (activityCount <= 9)
      return {
        cls: 'from-red-500 to-pink-500',
        icon: '⚡',
        text: isAuctionFormat ? 'Hot Item' : 'Very Popular',
      };
    return {
      cls: 'from-purple-600 to-red-600',
      icon: '💥',
      text: isAuctionFormat ? 'Bidding War!' : 'Bestseller!',
    };
  })();

  const priceLabel = auctionItem?.buyNowPrice ? 'Buy It Now' : 'Current Bid';
  const priceValue = auctionItem?.buyNowPrice || auctionItem?.currentBid || 0;

  return (
    <>
      <LightningComponent />
      <div className='min-h-dvh bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative pb-40 lg:pb-12'>
        {/* Desktop side nav arrows */}
        {hasMultipleItems && (
          <div className='hidden lg:block'>
            {prevItem && (
              <button
                type='button'
                onClick={() => navigateToItem(prevItem._id)}
                aria-label='Previous item'
                className='fixed left-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
              >
                <ChevronLeft className='w-6 h-6 text-white' aria-hidden='true' />
              </button>
            )}
            {nextItem && (
              <button
                type='button'
                onClick={() => navigateToItem(nextItem._id)}
                aria-label='Next item'
                className='fixed right-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
              >
                <ChevronRight className='w-6 h-6 text-white' aria-hidden='true' />
              </button>
            )}
          </div>
        )}

        {/* Header — matches the compact full-bleed AuctionHeader */}
        <header className='bg-white/10 backdrop-blur-xl border-b border-white/20'>
          <div className='max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2'>
            <Link to='/' className='min-w-0 focus:outline-none focus-visible:underline'>
              <h1 className='text-sm sm:text-lg font-bold text-white truncate leading-tight'>
                Little Paws Rescue
              </h1>
              <p className='hidden sm:block text-xs text-white/70 leading-tight'>
                Premium Auction Experience
              </p>
            </Link>

            <nav
              aria-label='Auction navigation'
              className='flex items-center gap-1.5 sm:gap-2 shrink-0'
            >
              <Link
                to={`/auctions/${auction?.customAuctionLink}`}
                className='hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70'
              >
                <ChevronLeft className='w-4 h-4' aria-hidden='true' />
                Back to Auction
              </Link>
              <Link
                to='/auctions'
                className='px-2.5 py-1.5 sm:px-4 sm:py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70'
              >
                Auctions
              </Link>
              <Link
                to={
                  user?._id
                    ? '/supporter/overview'
                    : `/auth/register?auctionItemId=${auctionItem?._id}&customAuctionLink=${customAuctionLink}&conversionSource=auction_item_header`
                }
                className='px-3 py-1.5 sm:px-5 sm:py-2 text-sm bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white rounded-full font-medium shadow-md transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
              >
                {user?._id ? 'Profile' : 'Join Now'}
              </Link>
            </nav>
          </div>
        </header>

        {/* Main */}
        <div className='max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10'>
          {/* Breadcrumb */}
          <nav
            aria-label='Breadcrumb'
            className='flex items-center gap-2 text-white/60 text-sm mb-6'
          >
            <Link
              to={`/auctions/${auction?.customAuctionLink}`}
              className='hover:text-white transition-colors'
            >
              Auction
            </Link>
            <ChevronRight className='w-4 h-4 shrink-0' aria-hidden='true' />
            <span className='text-white/90 truncate'>{auctionItem?.name}</span>
          </nav>

          {/* items-start so columns don't stretch to match each other's height */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
            {/* LEFT — gallery + (desktop) bid history */}
            <div className='space-y-4'>
              {/* Status badge */}
              <div
                className={`inline-flex items-center gap-2 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg bg-gradient-to-r ${badge.cls}`}
              >
                <span aria-hidden='true'>{badge.icon}</span>
                <span>{badge.text}</span>
              </div>

              {/* Main image */}
              <div className='relative'>
                <img
                  src={photos[selectedImage]?.url}
                  alt={auctionItem?.name || ''}
                  className='w-full h-72 sm:h-96 lg:h-[440px] object-contain rounded-2xl shadow-2xl border border-white/20 bg-black/20'
                />

                {photos.length > 1 && (
                  <>
                    <button
                      type='button'
                      onClick={() => setSelectedImage((i) => Math.max(0, i - 1))}
                      disabled={selectedImage === 0}
                      aria-label='Previous photo'
                      className='absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                    >
                      <ChevronLeft className='w-5 h-5' aria-hidden='true' />
                    </button>
                    <button
                      type='button'
                      onClick={() => setSelectedImage((i) => Math.min(photos.length - 1, i + 1))}
                      disabled={selectedImage === photos.length - 1}
                      aria-label='Next photo'
                      className='absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                    >
                      <ChevronRight className='w-5 h-5' aria-hidden='true' />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {photos.length > 1 && (
                <div className='grid grid-cols-5 gap-2'>
                  {photos.map((photo: any, i: number) => (
                    <button
                      key={photo?._id ?? i}
                      type='button'
                      onClick={() => setSelectedImage(i)}
                      aria-label={`Show photo ${i + 1}`}
                      aria-pressed={selectedImage === i}
                      className={`relative overflow-hidden rounded-lg transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        selectedImage === i
                          ? 'ring-2 ring-yellow-400'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photo?.url}
                        alt=''
                        className='w-full h-14 object-contain bg-black/20'
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Bid history — DESKTOP ONLY, fills the gap under the image */}
              {auctionItem?.sellingFormat === 'auction' && (
                <div className='hidden lg:block bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 mt-2'>
                  <h2 className='text-xl font-bold text-white mb-4 flex items-center gap-3'>
                    <span className='w-9 h-9 bg-purple-400/20 rounded-full flex items-center justify-center shrink-0'>
                      <BarChart3 className='w-5 h-5 text-purple-300' aria-hidden='true' />
                    </span>
                    Bid History
                  </h2>
                  <AuctionItemBidHistory auctionItem={auctionItem} />
                </div>
              )}
            </div>

            {/* RIGHT — details */}
            <div className='space-y-6'>
              <div>
                <h2 className='text-2xl sm:text-4xl font-bold text-white mb-3 leading-tight'>
                  {auctionItem?.name}
                </h2>
                <p className='text-base sm:text-lg text-white/80 leading-relaxed'>
                  {auctionItem?.description}
                </p>
              </div>

              {/* Pricing */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                <div className='bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-green-400/30'>
                  <div className='text-green-200 text-xs font-medium mb-1.5 uppercase tracking-wide'>
                    {priceLabel}
                  </div>
                  <div className='text-3xl font-bold text-white mb-1 tabular-nums'>
                    ${priceValue.toLocaleString()}
                  </div>
                  <div className='text-green-200 text-xs space-y-0.5'>
                    <div>
                      {auctionItem?.buyNowPrice
                        ? 'Instant purchase'
                        : `${auctionItem?.bids?.length || 0} bids`}
                    </div>
                    {!auctionItem?.buyNowPrice && auctionItem?.minimumBid && (
                      <div className='text-green-300/80'>
                        Min bid: ${auctionItem.minimumBid.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className='bg-gradient-to-br from-red-400/20 to-orange-500/20 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-red-400/30'>
                  <div className='text-red-200 text-xs font-medium mb-1.5 uppercase tracking-wide'>
                    {auction?.status === 'DRAFT'
                      ? 'Starts'
                      : auction?.status === 'ACTIVE'
                        ? 'Time Remaining'
                        : 'Thank you!'}
                  </div>
                  <div className='text-red-200 text-sm'>
                    {auction?.status === 'ENDED'
                      ? 'Auction closed'
                      : `Ends ${formatDate(auction?.endDate)}`}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <AuctionItemButtonBox
                auctionItem={auctionItem}
                auction={auction}
                customAuctionLink={customAuctionLink ?? ''}
                ifAuctionIsOver={ifAuctionIsOver}
                user={user}
                triggerLightning={triggerLightning}
              />

              {/* Details */}
              <div className='bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/10'>
                <h3 className='text-lg font-bold text-white mb-3'>Auction Details</h3>
                <AuctionItemDetailsSection auction={auction} auctionItem={auctionItem} />
              </div>

              {/* Shipping */}
              <div className='bg-blue-500/10 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-blue-400/20'>
                <div className='flex items-center gap-3'>
                  <div className='w-9 h-9 bg-blue-400/20 rounded-full flex items-center justify-center shrink-0'>
                    <Truck className='w-5 h-5 text-blue-300' aria-hidden='true' />
                  </div>
                  <div>
                    <h4 className='text-white font-semibold text-sm'>
                      {(auctionItem?.shippingCosts || 0) > 0
                        ? `$${auctionItem?.shippingCosts} Shipping`
                        : 'Free Shipping'}
                    </h4>
                    <p className='text-blue-200 text-xs'>Delivered within 5–7 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bid history — MOBILE ONLY, stacks at the bottom */}
          {auctionItem?.sellingFormat === 'auction' && (
            <div className='lg:hidden mt-8'>
              <div className='bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10'>
                <h2 className='text-xl font-bold text-white mb-4 flex items-center gap-3'>
                  <span className='w-9 h-9 bg-purple-400/20 rounded-full flex items-center justify-center shrink-0'>
                    <BarChart3 className='w-5 h-5 text-purple-300' aria-hidden='true' />
                  </span>
                  Bid History
                </h2>
                <AuctionItemBidHistory auctionItem={auctionItem} />
              </div>
            </div>
          )}
        </div>

        {/* Mobile bottom bar */}
        <div className='lg:hidden fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-t border-white/20 p-3 z-50'>
          <div className='max-w-7xl mx-auto space-y-2.5'>
            {hasMultipleItems && (
              <div className='flex items-center justify-between'>
                {prevItem ? (
                  <button
                    type='button'
                    onClick={() => navigateToItem(prevItem._id)}
                    className='flex items-center gap-1.5 bg-white/10 hover:bg-white/20 rounded-full px-3 py-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                  >
                    <ChevronLeft className='w-4 h-4 text-white' aria-hidden='true' />
                    <span className='text-xs font-medium text-white'>Prev</span>
                  </button>
                ) : (
                  <span />
                )}
                <div className='text-center'>
                  <p className='text-white/60 text-[10px]'>Item</p>
                  <p className='text-white font-bold text-sm tabular-nums'>
                    {currentIndex} of {totalItems}
                  </p>
                </div>
                {nextItem ? (
                  <button
                    type='button'
                    onClick={() => navigateToItem(nextItem._id)}
                    className='flex items-center gap-1.5 bg-white/10 hover:bg-white/20 rounded-full px-3 py-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                  >
                    <span className='text-xs font-medium text-white'>Next</span>
                    <ChevronRight className='w-4 h-4 text-white' aria-hidden='true' />
                  </button>
                ) : (
                  <span />
                )}
              </div>
            )}

            <div className='flex items-center justify-between gap-3'>
              <div className='text-white min-w-0'>
                <div className='text-xs opacity-80'>{priceLabel}</div>
                <div className='text-xl font-bold tabular-nums truncate'>
                  ${priceValue.toLocaleString()}
                </div>
              </div>
              <button
                type='button'
                onClick={() => dispatch(setOpenBidModal())}
                className='px-6 py-2.5 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white rounded-full font-bold shadow-lg transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
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
