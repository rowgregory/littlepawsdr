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

  // Check auction states
  const isDraft = auction?.status === 'DRAFT';
  const isActive = auction?.status === 'ACTIVE';
  const hasEnded = auction?.status === 'ENDED';

  // Get the winning bid info
  const winningBidAmount = auctionItem?.soldPrice || auctionItem?.currentBid;
  const topBidderName = auctionItem?.topBidder;

  return (
    <>
      <LightningComponent />
      <Link
        onClick={() => {
          dispatch(setAuctionItem(auctionItem));
        }}
        to={`/auctions/${auction?.customAuctionLink}/item/${auctionItem?._id}`}
        className={`group relative backdrop-blur-xl border rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:shadow-2xl ${
          hasEnded
            ? 'bg-gray-800/40 border-gray-500/30 hover:shadow-gray-500/25'
            : isDraft
            ? 'bg-blue-900/40 border-blue-500/30 hover:shadow-blue-500/25'
            : 'bg-white/10 border-white/20 hover:shadow-purple-500/25'
        } ${confirmBidModal ? 'animate-bounce' : ''}`}
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Status badge */}
        <div
          className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold ${
            hasEnded
              ? 'bg-gray-600 text-gray-200 border border-gray-400'
              : isDraft
              ? 'bg-blue-600 text-blue-100 border border-blue-400 animate-pulse'
              : auctionItem?.bids?.length > 5
              ? 'bg-red-500 text-white animate-pulse'
              : auctionItem?.bids?.length >= 2 || auctionItem?.instantBuyers?.length >= 2
              ? 'bg-orange-500 text-white animate-bounce'
              : auctionItem?.bids?.length >= 1 || auctionItem?.instantBuyers?.length >= 1
              ? 'bg-yellow-500 text-white'
              : 'bg-sky-500 text-white'
          }`}
        >
          {hasEnded ? (
            <>
              <Trophy className='inline w-3 h-3 mr-1' />
              {auctionItem?.status === 'Sold' ? 'SOLD' : 'CLOSED'}
            </>
          ) : isDraft ? (
            <>
              <Clock className='inline w-3 h-3 mr-1' />
              UPCOMING
            </>
          ) : auctionItem?.bids?.length > 5 ? (
            <>
              <Flame className='inline w-3 h-3 mr-1' />
              HOT
            </>
          ) : auctionItem?.bids?.length >= 2 || auctionItem?.instantBuyers?.length >= 2 ? (
            <>
              <TrendingUp className='inline w-3 h-3 mr-1' />
              TRENDING
            </>
          ) : auctionItem?.bids?.length >= 1 || auctionItem?.instantBuyers?.length >= 1 ? (
            <>
              <Zap className='inline w-3 h-3 mr-1' />
              ACTIVE
            </>
          ) : (
            <>
              <Sunrise className='inline w-3 h-3 mr-1' />
              FRESH
            </>
          )}
        </div>

        {/* Image section */}
        <div className='relative h-56 overflow-hidden'>
          <div
            className={`w-full h-full bg-gradient-to-br ${
              gradients[index % gradients.length]
            } flex items-center justify-center text-6xl transition-transform duration-500 ${
              isHovered ? 'scale-110' : ''
            } ${hasEnded ? 'grayscale-[0.3]' : isDraft ? 'brightness-75 saturate-150' : ''}`}
          >
            <img
              src={auctionItem?.photos?.[0]?.url}
              alt={auctionItem?.name || 'Auction Item'}
              className={`rounded-3xl w-auto aspect-square h-44 object-cover ${
                hasEnded ? 'opacity-75' : isDraft ? 'opacity-85' : ''
              }`}
            />
          </div>

          {/* Upcoming auction overlay */}
          {isDraft && (
            <div className='absolute inset-0 bg-blue-900/60 backdrop-blur-sm flex items-center justify-center'>
              <div className='text-center text-white'>
                <Calendar className='w-12 h-12 mx-auto mb-3 text-blue-300 animate-pulse' />
                <p className='font-bold text-lg mb-1'>COMING SOON</p>
              </div>
            </div>
          )}

          {/* Closed auction overlay */}
          {hasEnded && (
            <div className='absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center'>
              <div className='text-center text-white'>
                <Crown className='w-12 h-12 mx-auto mb-3 text-yellow-400 animate-pulse' />
                <p className='font-bold text-lg mb-1'>AUCTION ENDED</p>
                <p className='text-sm opacity-80'>
                  {auctionItem?.status === 'Sold' ? 'Item Sold' : 'No Winner'}
                </p>
              </div>
            </div>
          )}

          {/* Regular hover overlay for active auctions */}
          {isActive && (
            <div
              className={`absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className='text-white text-center'>
                <Star className='w-8 h-8 mx-auto mb-2 animate-spin' />
                <p className='font-bold text-lg'>Premium Item</p>
              </div>
            </div>
          )}

          {/* Bid count indicator */}
          <div
            className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
              hasEnded
                ? 'bg-gray-700/80 text-gray-200'
                : isDraft
                ? 'bg-blue-700/80 text-blue-200'
                : 'bg-black/70 text-white'
            }`}
          >
            {isDraft ? (
              <>
                <Calendar className='inline w-3 h-3 mr-1' />
                Preview
              </>
            ) : auctionItem?.sellingFormat === 'auction' ? (
              <>
                <Users className='inline w-3 h-3 mr-1' />
                {auctionItem?.totalBids || 0} {auctionItem?.totalBids === 1 ? 'bid' : 'bids'}
              </>
            ) : (
              <>
                <Package2 className='inline w-3 h-3 mr-1' />
                Qty: {auctionItem?.totalQuantity}
              </>
            )}
          </div>
        </div>

        {/* Content section */}
        <div className='p-6'>
          <h3
            className={`text-xl font-bold mb-3 truncate ${
              hasEnded ? 'text-gray-300' : isDraft ? 'text-blue-200' : 'text-white'
            }`}
          >
            {auctionItem?.name}
          </h3>

          {/* Auction timing */}
          <AuctionTiming startDate={auction?.startDate} endDate={auction?.endDate} />

          {isDraft ? (
            // UPCOMING AUCTION DISPLAY
            <div className='space-y-4'>
              {/* Countdown to start */}
              <div className='bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-4 text-center'>
                <div className='flex items-center justify-center gap-2 mb-2'>
                  <Clock className='w-5 h-5 text-blue-400' />
                  <p className='text-blue-400 font-bold text-sm uppercase tracking-wide'>
                    Auction Starts
                  </p>
                </div>
                <p className='text-white font-bold text-lg'>
                  {new Date(auction?.startDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className='text-blue-300 text-sm'>
                  {new Date(auction?.startDate).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    timeZoneName: 'short',
                  })}
                </p>
              </div>

              {/* Starting price preview */}
              <div className='text-center'>
                <p className='text-blue-300 text-sm mb-1'>
                  {auctionItem?.isFixed ? 'Buy Now Price' : 'Starting Bid'}
                </p>
                <p className='text-3xl font-black text-blue-400'>
                  $
                  {auctionItem?.isFixed
                    ? auctionItem?.buyNowPrice?.toLocaleString()
                    : auctionItem?.startingPrice?.toLocaleString()}
                </p>
              </div>
            </div>
          ) : hasEnded ? (
            // CLOSED AUCTION DISPLAY
            <div className='space-y-4'>
              {/* Winner announcement - only if item was sold */}
              {auctionItem?.status === 'Sold' && topBidderName && (
                <div className='bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border border-yellow-500/30 rounded-2xl p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Trophy className='w-5 h-5 text-yellow-400' />
                    <p className='text-yellow-400 font-bold text-sm uppercase tracking-wide'>
                      Winner
                    </p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white text-sm'>
                      {topBidderName
                        .split(' ')
                        .map((n: any) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className='text-white font-semibold'>{topBidderName}</p>
                      <p className='text-gray-400 text-sm'>Winning bidder</p>
                    </div>
                  </div>
                </div>
              )}
              {auctionItem?.isFixed && (
                <div className='bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <ShoppingCart className='w-5 h-5 text-green-400' />
                    <p className='text-green-400 font-bold text-sm uppercase tracking-wide'>
                      Available Instantly
                    </p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center font-bold text-white text-sm'>
                      <Check className='w-5 h-5' />
                    </div>
                    <div>
                      <p className='text-white font-semibold'>
                        {auctionItem?.instantBuyers?.length} Instantly Bought
                      </p>
                      <p className='text-gray-400 text-sm'>Direct Purchase</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Final result */}
              <div className='text-center'>
                {auctionItem?.status === 'Sold' ? (
                  <>
                    <p className='text-gray-400 text-sm mb-1'>
                      Final {auctionItem?.isFixed ? 'Purchase Count' : 'Winning Bid'}
                    </p>
                    <p className='text-4xl font-black text-yellow-400'>
                      {auctionItem?.isFixed
                        ? auctionItem?.instantBuyers?.length
                        : `$${winningBidAmount?.toLocaleString()}`}
                    </p>
                  </>
                ) : (
                  <>
                    <p className='text-gray-400 text-sm mb-1'>Auction Ended</p>
                    <p className='text-2xl font-black text-gray-400'>No Sale</p>
                    <p className='text-sm text-gray-500 mt-1'>
                      Starting price: ${auctionItem?.startingPrice?.toLocaleString()}
                    </p>
                  </>
                )}
                <p className='text-gray-400 text-xs mt-2'>
                  Auction closed {new Date(auction?.endDate).toLocaleDateString()}
                </p>
              </div>

              {/* View details button */}
              <button
                onClick={(e) => e.stopPropagation()}
                className='w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-4 px-6 rounded-2xl transform transition-all duration-300 hover:scale-105'
              >
                <Eye className='inline w-5 h-5 mr-2' />
                View Auction Results
              </button>
            </div>
          ) : (
            // ACTIVE AUCTION DISPLAY (existing code)
            <>
              {/* Current bid display */}
              <div className='mb-4'>
                <div className='flex justify-between items-end mb-1'>
                  <p className='text-white/70 text-sm'>
                    {auctionItem?.sellingFormat === 'auction'
                      ? auctionItem?.totalBids === 0 || auctionItem?.bids?.length === 0
                        ? 'Starting Bid'
                        : 'Current Bid'
                      : 'Buy Now Price'}
                  </p>
                </div>
                <p
                  className={`text-3xl font-black ${
                    confirmBidModal ? 'text-green-400 animate-pulse' : 'text-yellow-400'
                  }`}
                >
                  $
                  {auctionItem?.isFixed
                    ? auctionItem?.buyNowPrice?.toLocaleString()
                    : auctionItem?.currentBid?.toLocaleString()}
                </p>
                {auctionItem?.isAuction ? (
                  // For auction items
                  auctionItem?.totalBids === 0 || auctionItem?.bids?.length === 0 ? (
                    // No bids yet - show starting bid
                    <p className='text-orange-400 text-xs mt-1'>
                      Starting bid: ${auctionItem?.startingPrice?.toLocaleString()}
                    </p>
                  ) : (
                    // Has bids - show minimum bid
                    <p className='text-orange-400 text-xs mt-1'>
                      Minimum bid: ${auctionItem?.minimumBid?.toLocaleString()}
                    </p>
                  )
                ) : (
                  // For non-auction items - show quantity
                  <p className='text-orange-400 text-xs mt-1'>
                    Items remaining: {auctionItem?.totalQuantity?.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Bid button */}
              {!user?._id ? (
                // No user logged in - show join now button
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate(
                      `/auth/register?customAuctionLink=${auction?.customAuctionLink}&conversionSource=auction_item_card`
                    );
                  }}
                  className='w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:animate-pulse'
                >
                  <UserPlus className='inline w-5 h-5 mr-2' />
                  Join Now to Buy & Bid
                </button>
              ) : user?._id && !user?.hasAddress ? (
                // User logged in but no address - show enter address button
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate(`/supporter/profile`);
                  }}
                  className='w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:animate-pulse'
                >
                  <MapPin className='inline w-5 h-5 mr-2' />
                  Enter Address to Buy & Bid
                </button>
              ) : (
                // User has address - show place bid or instant buy buttons
                <>
                  {auctionItem?.sellingFormat === 'auction' ? (
                    // Auction format - button with handlePlaceBid
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        dispatch(setOpenQuickBidModal());
                        dispatch(setAuctionItem(auctionItem));
                      }}
                      disabled={loadingPlacingBid}
                      className='w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:animate-pulse'
                    >
                      <Gavel className='inline w-5 h-5 mr-2' />
                      {loadingPlacingBid
                        ? 'Placing Bid...'
                        : `Place $${(auctionItem?.currentBid + 10)?.toLocaleString()} Quick Bid`}
                    </button>
                  ) : (
                    // Fixed price format - link to item with different gradient
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        triggerLightning(() => {
                          navigate(`${location.pathname}/item/${auctionItem?._id}/buy`);
                        });
                      }}
                      className='w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold py-4 px-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:animate-pulse block text-center'
                    >
                      <Zap className='inline w-5 h-5 mr-2' />
                      {`Instant Buy for $${auctionItem?.buyNowPrice?.toLocaleString()}`}
                    </button>
                  )}
                </>
              )}

              <p className='text-white/50 text-xs mt-2 text-center'>
                + ${auctionItem?.shippingCosts ?? 0} shipping
              </p>

              <p className='text-xs text-red-300 opacity-75 text-center mt-4'>
                {auctionItem?.sellingFormat === 'auction' ? 'Bids' : 'All sales are final'} are
                final
              </p>
              {/* Recent bid notification */}
              {confirmBidModal && (
                <div className='mt-3 bg-green-500/20 border border-green-400 text-green-300 px-4 py-2 rounded-xl text-sm font-semibold animate-pulse'>
                  🎉 Your bid was placed successfully!
                </div>
              )}
            </>
          )}
        </div>
      </Link>
    </>
  );
};

export default AuctionItemCard;
