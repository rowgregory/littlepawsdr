import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Check,
  Clock,
  Crown,
  Eye,
  Flame,
  Gavel,
  MapPin,
  Package2,
  ShoppingCart,
  Star,
  Sunrise,
  TrendingUp,
  Trophy,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react';
import AuctionTiming from './AuctionTiming';
import { useLightningTransition } from '../transitions/LightningTransition';
import { useAppDispatch, useAuctionSelector } from '../../redux/toolkitStore';
import { setAuctionItem, setOpenQuickBidModal } from '../../redux/features/auctionSlice';
import { usePlaceBidMutation } from '../../redux/services/auctionApi';

const gradients = [
  'from-emerald-500 to-teal-600',
  'from-pink-500 to-rose-600',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-indigo-600',
];

const AuctionItemCard = ({ auctionItem, index, auction, user }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { triggerLightning, LightningComponent } = useLightningTransition();
  const dispatch = useAppDispatch();
  const { confirmBidModal } = useAuctionSelector();
  const [{ isLoading: loadingPlacingBid }] = usePlaceBidMutation();

  const isDraft = auction?.status === 'DRAFT';
  const isActive = auction?.status === 'ACTIVE';
  const hasEnded = auction?.status === 'ENDED';

  const winningBidAmount = auctionItem?.soldPrice || auctionItem?.currentBid;
  const topBidderName = auctionItem?.topBidder;

  const itemHref = `/auctions/${auction?.customAuctionLink}/item/${auctionItem?._id}`;

  return (
    <div
      className={`group relative backdrop-blur-xl border rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-white/70 ${
        hasEnded
          ? 'bg-gray-800/40 border-gray-500/30'
          : isDraft
            ? 'bg-blue-900/40 border-blue-500/30'
            : 'bg-white/10 border-white/20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status badge */}
      <div
        className={`absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 pointer-events-none ${
          hasEnded
            ? 'bg-gray-600 text-gray-100 border border-gray-400'
            : isDraft
              ? 'bg-blue-600 text-blue-50 border border-blue-400'
              : auctionItem?.bids?.length > 5
                ? 'bg-red-500 text-white'
                : auctionItem?.bids?.length >= 2 || auctionItem?.instantBuyers?.length >= 2
                  ? 'bg-orange-500 text-white'
                  : auctionItem?.bids?.length >= 1 || auctionItem?.instantBuyers?.length >= 1
                    ? 'bg-yellow-500 text-black'
                    : 'bg-sky-500 text-white'
        }`}
      >
        {hasEnded ? (
          <>
            <Trophy className='w-3 h-3' aria-hidden='true' />
            {auctionItem?.status === 'Sold' ? 'SOLD' : 'CLOSED'}
          </>
        ) : isDraft ? (
          <>
            <Clock className='w-3 h-3' aria-hidden='true' />
            UPCOMING
          </>
        ) : auctionItem?.bids?.length > 5 ? (
          <>
            <Flame className='w-3 h-3' aria-hidden='true' />
            HOT
          </>
        ) : auctionItem?.bids?.length >= 2 || auctionItem?.instantBuyers?.length >= 2 ? (
          <>
            <TrendingUp className='w-3 h-3' aria-hidden='true' />
            TRENDING
          </>
        ) : auctionItem?.bids?.length >= 1 || auctionItem?.instantBuyers?.length >= 1 ? (
          <>
            <Zap className='w-3 h-3' aria-hidden='true' />
            ACTIVE
          </>
        ) : (
          <>
            <Sunrise className='w-3 h-3' aria-hidden='true' />
            FRESH
          </>
        )}
      </div>

      {/* Image + title = the navigational link */}
      <Link
        to={itemHref}
        onClick={() => dispatch(setAuctionItem(auctionItem))}
        aria-label={`View ${auctionItem?.name}${hasEnded ? ', auction ended' : isDraft ? ', upcoming' : ''}`}
        className='block focus:outline-none'
      >
        <div className='relative h-40 sm:h-48 overflow-hidden'>
          <div
            className={`w-full h-full bg-gradient-to-br ${
              gradients[index % gradients.length]
            } flex items-center justify-center transition-transform duration-300 ${
              isHovered ? 'scale-105' : ''
            } ${hasEnded ? 'grayscale-[0.3]' : isDraft ? 'brightness-75 saturate-150' : ''}`}
          >
            <img
              src={auctionItem?.photos?.[0]?.url}
              alt={auctionItem?.name || ''}
              className={`rounded-2xl w-auto aspect-square h-32 sm:h-36 object-cover ${
                hasEnded ? 'opacity-75' : isDraft ? 'opacity-85' : ''
              }`}
            />
          </div>

          {isDraft && (
            <div className='absolute inset-0 bg-blue-900/60 backdrop-blur-sm flex items-center justify-center'>
              <div className='text-center text-white'>
                <Calendar className='w-9 h-9 mx-auto mb-2 text-blue-300' aria-hidden='true' />
                <p className='font-bold text-base'>COMING SOON</p>
              </div>
            </div>
          )}

          {hasEnded && (
            <div className='absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center'>
              <div className='text-center text-white'>
                <Crown className='w-9 h-9 mx-auto mb-2 text-yellow-400' aria-hidden='true' />
                <p className='font-bold text-base'>AUCTION ENDED</p>
                <p className='text-xs opacity-80'>
                  {auctionItem?.status === 'Sold' ? 'Item Sold' : 'No Winner'}
                </p>
              </div>
            </div>
          )}

          {isActive && (
            <div
              className={`absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden='true'
            >
              <div className='text-white text-center'>
                <Star className='w-7 h-7 mx-auto mb-1.5' aria-hidden='true' />
                <p className='font-bold text-base'>Premium Item</p>
              </div>
            </div>
          )}

          <div
            className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
              hasEnded
                ? 'bg-gray-700/80 text-gray-100'
                : isDraft
                  ? 'bg-blue-700/80 text-blue-100'
                  : 'bg-black/70 text-white'
            }`}
          >
            {isDraft ? (
              <>
                <Calendar className='w-3 h-3' aria-hidden='true' />
                Preview
              </>
            ) : auctionItem?.sellingFormat === 'auction' ? (
              <>
                <Users className='w-3 h-3' aria-hidden='true' />
                {auctionItem?.totalBids || 0} {auctionItem?.totalBids === 1 ? 'bid' : 'bids'}
              </>
            ) : (
              <>
                <Package2 className='w-3 h-3' aria-hidden='true' />
                Qty: {auctionItem?.totalQuantity}
              </>
            )}
          </div>
        </div>

        <h3
          className={`text-lg font-bold px-4 sm:px-5 pt-4 mb-2 truncate ${
            hasEnded ? 'text-gray-200' : isDraft ? 'text-blue-100' : 'text-white'
          }`}
        >
          {auctionItem?.name}
        </h3>
      </Link>

      {/* Content section (NOT inside the link) */}
      <div className='px-4 sm:px-5 pb-4 sm:pb-5'>
        <AuctionTiming startDate={auction?.startDate} endDate={auction?.endDate} />

        {isDraft ? (
          // UPCOMING
          <div className='space-y-3'>
            <div className='bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-3 text-center'>
              <div className='flex items-center justify-center gap-2 mb-1.5'>
                <Clock className='w-4 h-4 text-blue-300' aria-hidden='true' />
                <p className='text-blue-300 font-bold text-xs uppercase tracking-wide'>
                  Auction Starts
                </p>
              </div>
              <p className='text-white font-bold text-base'>
                {new Date(auction?.startDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <p className='text-blue-200 text-xs'>
                {new Date(auction?.startDate).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  timeZoneName: 'short',
                })}
              </p>
            </div>

            <div className='text-center'>
              <p className='text-blue-200 text-xs mb-1'>
                {auctionItem?.isFixed ? 'Buy Now Price' : 'Starting Bid'}
              </p>
              <p className='text-2xl sm:text-3xl font-black text-blue-300 tabular-nums'>
                $
                {auctionItem?.isFixed
                  ? auctionItem?.buyNowPrice?.toLocaleString()
                  : auctionItem?.startingPrice?.toLocaleString()}
              </p>
            </div>
          </div>
        ) : hasEnded ? (
          // CLOSED
          <div className='space-y-3'>
            {auctionItem?.status === 'Sold' && topBidderName && (
              <div className='bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border border-yellow-500/30 rounded-xl p-3'>
                <div className='flex items-center gap-2 mb-1.5'>
                  <Trophy className='w-4 h-4 text-yellow-400' aria-hidden='true' />
                  <p className='text-yellow-400 font-bold text-xs uppercase tracking-wide'>
                    Winner
                  </p>
                </div>
                <div className='flex items-center gap-2.5'>
                  <div className='w-9 h-9 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0'>
                    {topBidderName
                      .split(' ')
                      .map((n: any) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div className='min-w-0'>
                    <p className='text-white font-semibold truncate'>{topBidderName}</p>
                    <p className='text-gray-300 text-xs'>Winning bidder</p>
                  </div>
                </div>
              </div>
            )}
            {auctionItem?.isFixed && (
              <div className='bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-3'>
                <div className='flex items-center gap-2 mb-1.5'>
                  <ShoppingCart className='w-4 h-4 text-green-400' aria-hidden='true' />
                  <p className='text-green-400 font-bold text-xs uppercase tracking-wide'>
                    Available Instantly
                  </p>
                </div>
                <div className='flex items-center gap-2.5'>
                  <div className='w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0'>
                    <Check className='w-5 h-5' aria-hidden='true' />
                  </div>
                  <div className='min-w-0'>
                    <p className='text-white font-semibold'>
                      {auctionItem?.instantBuyers?.length} Instantly Bought
                    </p>
                    <p className='text-gray-300 text-xs'>Direct Purchase</p>
                  </div>
                </div>
              </div>
            )}

            <div className='text-center'>
              {auctionItem?.status === 'Sold' ? (
                <>
                  <p className='text-gray-300 text-xs mb-1'>
                    Final {auctionItem?.isFixed ? 'Purchase Count' : 'Winning Bid'}
                  </p>
                  <p className='text-3xl font-black text-yellow-400 tabular-nums'>
                    {auctionItem?.isFixed
                      ? auctionItem?.instantBuyers?.length
                      : `$${winningBidAmount?.toLocaleString()}`}
                  </p>
                </>
              ) : (
                <>
                  <p className='text-gray-300 text-xs mb-1'>Auction Ended</p>
                  <p className='text-xl font-black text-gray-300'>No Sale</p>
                  <p className='text-xs text-gray-400 mt-1'>
                    Starting price: ${auctionItem?.startingPrice?.toLocaleString()}
                  </p>
                </>
              )}
              <p className='text-gray-300 text-xs mt-2'>
                Auction closed {new Date(auction?.endDate).toLocaleDateString()}
              </p>
            </div>

            <Link
              to={itemHref}
              onClick={() => dispatch(setAuctionItem(auctionItem))}
              className='w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
            >
              <Eye className='w-5 h-5' aria-hidden='true' />
              View Auction Results
            </Link>
          </div>
        ) : (
          // ACTIVE
          <>
            <div className='mb-3'>
              <p className='text-white/70 text-xs mb-1'>
                {auctionItem?.sellingFormat === 'auction'
                  ? auctionItem?.totalBids === 0 || auctionItem?.bids?.length === 0
                    ? 'Starting Bid'
                    : 'Current Bid'
                  : 'Buy Now Price'}
              </p>
              <p
                className={`text-2xl sm:text-3xl font-black tabular-nums ${
                  confirmBidModal ? 'text-green-400' : 'text-yellow-400'
                }`}
              >
                $
                {auctionItem?.isFixed
                  ? auctionItem?.buyNowPrice?.toLocaleString()
                  : auctionItem?.currentBid?.toLocaleString()}
              </p>
              {auctionItem?.isAuction ? (
                auctionItem?.totalBids === 0 || auctionItem?.bids?.length === 0 ? (
                  <p className='text-orange-300 text-xs mt-1'>
                    Starting bid: ${auctionItem?.startingPrice?.toLocaleString()}
                  </p>
                ) : (
                  <p className='text-orange-300 text-xs mt-1'>
                    Minimum bid: ${auctionItem?.minimumBid?.toLocaleString()}
                  </p>
                )
              ) : (
                <p className='text-orange-300 text-xs mt-1'>
                  Items remaining: {auctionItem?.totalQuantity?.toLocaleString()}
                </p>
              )}
            </div>

            {!user?._id ? (
              <button
                type='button'
                onClick={() =>
                  navigate(
                    `/auth/register?customAuctionLink=${auction?.customAuctionLink}&conversionSource=auction_item_card`,
                  )
                }
                className='w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold py-3 px-5 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center justify-center gap-2'
              >
                <UserPlus className='w-5 h-5' aria-hidden='true' />
                Join Now to Buy &amp; Bid
              </button>
            ) : user?._id && !user?.hasAddress ? (
              <button
                type='button'
                onClick={() => navigate('/supporter/profile')}
                className='w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-bold py-3 px-5 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center justify-center gap-2'
              >
                <MapPin className='w-5 h-5' aria-hidden='true' />
                Enter Address to Buy &amp; Bid
              </button>
            ) : auctionItem?.sellingFormat === 'auction' ? (
              <button
                type='button'
                onClick={() => {
                  dispatch(setOpenQuickBidModal());
                  dispatch(setAuctionItem(auctionItem));
                }}
                disabled={loadingPlacingBid}
                className='w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-5 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center justify-center gap-2'
              >
                <Gavel className='w-5 h-5' aria-hidden='true' />
                {loadingPlacingBid
                  ? 'Placing Bid…'
                  : `Place $${(Number(auctionItem?.currentBid ?? auctionItem?.startingPrice ?? 0) + 10).toLocaleString()} Quick Bid`}
              </button>
            ) : (
              <button
                type='button'
                onClick={() =>
                  triggerLightning(() => {
                    navigate(`${location.pathname}/item/${auctionItem?._id}/buy`);
                  })
                }
                className='w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-5 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center justify-center gap-2'
              >
                <Zap className='w-5 h-5' aria-hidden='true' />
                {`Instant Buy for $${auctionItem?.buyNowPrice?.toLocaleString()}`}
              </button>
            )}

            <p className='text-white/60 text-xs mt-2 text-center'>
              + ${auctionItem?.shippingCosts ?? 0} shipping
            </p>

            <p className='text-xs text-red-300 text-center mt-3'>
              {auctionItem?.sellingFormat === 'auction'
                ? 'All bids are final'
                : 'All sales are final'}
            </p>

            {confirmBidModal && (
              <div
                role='status'
                className='mt-3 bg-green-500/20 border border-green-400 text-green-200 px-4 py-2 rounded-xl text-sm font-semibold'
              >
                Your bid was placed successfully!
              </div>
            )}
          </>
        )}
      </div>

      <LightningComponent />
    </div>
  );
};

export default AuctionItemCard;
