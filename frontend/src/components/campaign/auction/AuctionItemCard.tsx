import { useState } from 'react';
import { usePlaceBidMutation } from '../../../redux/services/campaignApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Crown, Eye, Flame, Gavel, MapPin, Package2, Star, Sunrise, Trophy, UserPlus, Users, Zap } from 'lucide-react';
import AuctionTiming from './AuctionTiming';
import ConfirmBidModal from '../../modals/bid/ConfirmBidModal';
import { useLightningTransition } from '../../transitions/LightningTransition';

const AuctionItemCard = ({ item, index, settings, customCampaignLink, status, user }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justBid, setJustBid] = useState(false);
  const [placeBid, { isLoading: loadingPlacingBid }] = usePlaceBidMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const [toggleConfirmBidModal, setToggleConfirmBidModal] = useState(false);
  const { triggerLightning, LightningComponent } = useLightningTransition();

  const handlePlaceBid = async () => {
    try {
      await placeBid({
        auctionItemId: item?._id,
        auctionId: item?.auction,
        bidAmount: item?.currentBid + 10,
        customCampaignLink,
      }).unwrap();

      setToggleConfirmBidModal(false);
      setJustBid(true);
      setTimeout(() => setJustBid(false), 4000);
    } catch {}
  };

  const gradients = ['from-emerald-500 to-teal-600', 'from-pink-500 to-rose-600', 'from-amber-500 to-orange-600', 'from-purple-500 to-indigo-600'];
  // Check auction states
  const isAuctionClosed = status === 'CLOSED';
  const isAuctionUpcoming = status === 'UPCOMING';
  const isAuctionActive = !isAuctionClosed && !isAuctionUpcoming;

  // Get the winning bid info
  const winningBidAmount = item?.soldPrice || item?.currentBid;
  const topBidderName = item?.topBidder;

  return (
    <>
      <ConfirmBidModal
        isOpen={toggleConfirmBidModal}
        onClose={() => setToggleConfirmBidModal(false)}
        onConfirm={handlePlaceBid}
        item={item}
        isLoading={loadingPlacingBid}
        bidAmount={item?.currentBid + 10}
      />
      <LightningComponent />
      <Link
        to={`/campaigns/${customCampaignLink}/auction/item/${item?._id}`}
        className={`group relative backdrop-blur-xl border rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:shadow-2xl ${
          isAuctionClosed
            ? 'bg-gray-800/40 border-gray-500/30 hover:shadow-gray-500/25'
            : isAuctionUpcoming
            ? 'bg-blue-900/40 border-blue-500/30 hover:shadow-blue-500/25'
            : 'bg-white/10 border-white/20 hover:shadow-purple-500/25'
        } ${justBid ? 'animate-bounce' : ''}`}
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Status badge */}
        <div
          className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold ${
            isAuctionClosed
              ? 'bg-gray-600 text-gray-200 border border-gray-400'
              : isAuctionUpcoming
              ? 'bg-blue-600 text-blue-100 border border-blue-400 animate-pulse'
              : item?.bids?.length > 5
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-sky-500 text-white'
          }`}
        >
          {isAuctionClosed ? (
            <>
              <Trophy className='inline w-3 h-3 mr-1' />
              {item?.status === 'Sold' ? 'SOLD' : 'CLOSED'}
            </>
          ) : isAuctionUpcoming ? (
            <>
              <Clock className='inline w-3 h-3 mr-1' />
              UPCOMING
            </>
          ) : item?.bids?.length > 5 ? (
            <>
              <Flame className='inline w-3 h-3 mr-1' />
              HOT
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
            } flex items-center justify-center text-6xl transition-transform duration-500 ${isHovered ? 'scale-110' : ''} ${
              isAuctionClosed ? 'grayscale-[0.3]' : isAuctionUpcoming ? 'brightness-75 saturate-150' : ''
            }`}
          >
            <img
              src={item?.photos?.[0]?.url}
              alt={item?.name || 'Auction Item'}
              className={`rounded-3xl w-auto aspect-square h-44 object-cover ${
                isAuctionClosed ? 'opacity-75' : isAuctionUpcoming ? 'opacity-85' : ''
              }`}
            />
          </div>

          {/* Upcoming auction overlay */}
          {isAuctionUpcoming && (
            <div className='absolute inset-0 bg-blue-900/60 backdrop-blur-sm flex items-center justify-center'>
              <div className='text-center text-white'>
                <Calendar className='w-12 h-12 mx-auto mb-3 text-blue-300 animate-pulse' />
                <p className='font-bold text-lg mb-1'>COMING SOON</p>
              </div>
            </div>
          )}

          {/* Closed auction overlay */}
          {isAuctionClosed && (
            <div className='absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center'>
              <div className='text-center text-white'>
                <Crown className='w-12 h-12 mx-auto mb-3 text-yellow-400 animate-pulse' />
                <p className='font-bold text-lg mb-1'>AUCTION ENDED</p>
                <p className='text-sm opacity-80'>{item?.status === 'Sold' ? 'Item Sold' : 'No Winner'}</p>
              </div>
            </div>
          )}

          {/* Regular hover overlay for active auctions */}
          {isAuctionActive && (
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
              isAuctionClosed ? 'bg-gray-700/80 text-gray-200' : isAuctionUpcoming ? 'bg-blue-700/80 text-blue-200' : 'bg-black/70 text-white'
            }`}
          >
            {isAuctionUpcoming ? (
              <>
                <Calendar className='inline w-3 h-3 mr-1' />
                Preview
              </>
            ) : item.sellingFormat === 'auction' ? (
              <>
                <Users className='inline w-3 h-3 mr-1' />
                {item?.totalBids || 0} {item?.totalBids === 1 ? 'bid' : 'bids'}
              </>
            ) : (
              <>
                <Package2 className='inline w-3 h-3 mr-1' />
                Qty: {item.totalQuantity}
              </>
            )}
          </div>
        </div>

        {/* Content section */}
        <div className='p-6'>
          <h3 className={`text-xl font-bold mb-3 truncate ${isAuctionClosed ? 'text-gray-300' : isAuctionUpcoming ? 'text-blue-200' : 'text-white'}`}>
            {item?.name}
          </h3>

          {/* Auction timing */}
          <AuctionTiming startDate={settings?.startDate} endDate={settings?.endDate} />

          {isAuctionUpcoming ? (
            // UPCOMING AUCTION DISPLAY
            <div className='space-y-4'>
              {/* Countdown to start */}
              <div className='bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-4 text-center'>
                <div className='flex items-center justify-center gap-2 mb-2'>
                  <Clock className='w-5 h-5 text-blue-400' />
                  <p className='text-blue-400 font-bold text-sm uppercase tracking-wide'>Auction Starts</p>
                </div>
                <p className='text-white font-bold text-lg'>
                  {new Date(settings?.startDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className='text-blue-300 text-sm'>
                  {new Date(settings?.startDate).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    timeZoneName: 'short',
                  })}
                </p>
              </div>

              {/* Starting price preview */}
              <div className='text-center'>
                <p className='text-blue-300 text-sm mb-1'>{item?.isFixed ? 'Buy Now Price' : 'Starting Bid'}</p>
                <p className='text-3xl font-black text-blue-400'>
                  ${item?.isFixed ? item?.buyNowPrice?.toLocaleString() : item?.startingPrice?.toLocaleString()}
                </p>
              </div>
            </div>
          ) : isAuctionClosed ? (
            // CLOSED AUCTION DISPLAY
            <div className='space-y-4'>
              {/* Winner announcement - only if item was sold */}
              {item?.status === 'Sold' && topBidderName && (
                <div className='bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border border-yellow-500/30 rounded-2xl p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Trophy className='w-5 h-5 text-yellow-400' />
                    <p className='text-yellow-400 font-bold text-sm uppercase tracking-wide'>Winner</p>
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

              {/* Final result */}
              <div className='text-center'>
                {item?.status === 'Sold' ? (
                  <>
                    <p className='text-gray-400 text-sm mb-1'>Final Winning Bid</p>
                    <p className='text-4xl font-black text-yellow-400'>${winningBidAmount?.toLocaleString()}</p>
                  </>
                ) : (
                  <>
                    <p className='text-gray-400 text-sm mb-1'>Auction Ended</p>
                    <p className='text-2xl font-black text-gray-400'>No Sale</p>
                    <p className='text-sm text-gray-500 mt-1'>Starting price: ${item?.startingPrice?.toLocaleString()}</p>
                  </>
                )}
                <p className='text-gray-400 text-xs mt-2'>Auction closed {new Date(settings?.endDate).toLocaleDateString()}</p>
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
                  <p className='text-white/70 text-sm'>{item?.sellingFormat === 'auction' ? 'Current Bid' : 'Buy Now Price'}</p>
                </div>
                <p className={`text-3xl font-black ${justBid ? 'text-green-400 animate-pulse' : 'text-yellow-400'}`}>
                  ${item?.isFixed ? item?.buyNowPrice?.toLocaleString() : item?.currentBid?.toLocaleString()}
                </p>
                {item?.isAuction ? (
                  // For auction items
                  item?.totalBids === 0 || item?.bids?.length === 0 ? (
                    // No bids yet - show starting bid
                    <p className='text-orange-400 text-xs mt-1'>Starting bid: ${item?.startingPrice?.toLocaleString()}</p>
                  ) : (
                    // Has bids - show minimum bid
                    <p className='text-orange-400 text-xs mt-1'>Minimum bid: ${item?.minimumBid?.toLocaleString()}</p>
                  )
                ) : (
                  // For non-auction items - show quantity
                  <p className='text-orange-400 text-xs mt-1'>Items remaining: {item?.totalQuantity?.toLocaleString()}</p>
                )}
              </div>

              {/* Bid button */}
              {!user?._id ? (
                // No user logged in - show join now button
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate(`/auth/register?customCampaignLink=${customCampaignLink}&conversionSource=auction_item_card`);
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
                    navigate(`/settings/profile`);
                  }}
                  className='w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:animate-pulse'
                >
                  <MapPin className='inline w-5 h-5 mr-2' />
                  Enter Address to Buy & Bid
                </button>
              ) : (
                // User has address - show place bid or instant buy buttons
                <>
                  {item?.sellingFormat === 'auction' ? (
                    // Auction format - button with handlePlaceBid
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setToggleConfirmBidModal(true);
                      }}
                      disabled={loadingPlacingBid}
                      className='w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:animate-pulse'
                    >
                      <Gavel className='inline w-5 h-5 mr-2' />
                      {loadingPlacingBid ? 'Placing Bid...' : `Place $${(item?.currentBid + 10)?.toLocaleString()} Quick Bid`}
                    </button>
                  ) : (
                    // Fixed price format - link to item with different gradient
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        triggerLightning(() => {
                          navigate(`${location.pathname}/item/${item?._id}/buy`);
                        });
                      }}
                      className='w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold py-4 px-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:animate-pulse block text-center'
                    >
                      <Zap className='inline w-5 h-5 mr-2' />
                      {`Instant Buy for $${item?.buyNowPrice?.toLocaleString()}`}
                    </button>
                  )}
                </>
              )}

              <p className='text-white/50 text-xs mt-2 text-center'>+ ${item.shippingCosts ?? 0} shipping</p>

              <p className='text-xs text-red-300 opacity-75 text-center mt-4'>
                {item.sellingFormat === 'auction' ? 'Bids' : 'All sales are final'} are final
              </p>
              {/* Recent bid notification */}
              {justBid && (
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
