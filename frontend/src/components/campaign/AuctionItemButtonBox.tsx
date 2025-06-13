import { useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuctionItem, Campaign } from '../../types/campaign-types';
import { Gavel } from 'lucide-react';

interface IAuctionItemButtonBox {
  ifCampaignIsOver: boolean;
  auctionItem: AuctionItem | undefined;
  campaign: { campaign: Campaign };
  customCampaignLink: string;
  setOpenBidModal: (open: boolean) => void;
  user: any;
  triggerLightning: any;
}

interface SparkleData {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

// Magical sparkle component for buttons
const ButtonSparkle: FC<{ isActive: boolean }> = ({ isActive }) => {
  const [sparkles, setSparkles] = useState<SparkleData[]>([]);

  useEffect(() => {
    if (isActive) {
      const generateSparkles = () => {
        const newSparkles: SparkleData[] = Array.from({ length: 8 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 1,
        }));
        setSparkles(newSparkles);
      };

      generateSparkles();
      const interval = setInterval(generateSparkles, 2000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <div className='absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-20'>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className='absolute animate-ping'
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          <div
            className='bg-yellow-300 rounded-full opacity-80'
            style={{
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

const AuctionItemButtonBox: FC<IAuctionItemButtonBox> = ({
  ifCampaignIsOver,
  auctionItem,
  campaign,
  customCampaignLink,
  setOpenBidModal,
  user,
  triggerLightning,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const params = new URLSearchParams();
  if (customCampaignLink) {
    params.set('customCampaignLink', customCampaignLink);
  }
  if (auctionItem) {
    params.set('auctionItemId', auctionItem?._id);
  }

  params.set('conversionSource', 'auction_item');

  const to = `/auth/register?${params.toString()}`;

  // Winner display for completed auctions
  if (ifCampaignIsOver && auctionItem?.sellingFormat === 'auction' && auctionItem?.totalBids > 0) {
    return (
      <div className='relative bg-gradient-to-br from-yellow-50 via-white to-yellow-50 border-4 border-yellow-400/50 rounded-2xl p-8 mb-6 overflow-hidden shadow-2xl'>
        {/* Magical winner glow */}
        <div className='absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 animate-pulse'></div>
        <div className='absolute inset-0 bg-gradient-to-l from-transparent via-yellow-300/10 to-transparent animate-ping'></div>

        {/* Floating celebration elements */}
        <div className='absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-75'></div>
        <div className='absolute top-8 left-6 w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-150'></div>
        <div className='absolute bottom-6 right-8 w-4 h-4 bg-yellow-500 rounded-full animate-bounce delay-300'></div>

        {/* Trophy icon */}
        <div className='h-20 w-20 rounded-full flex items-center justify-center absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 shadow-2xl shadow-yellow-500/50 animate-pulse'>
          <i className='fa-solid fa-trophy fa-3x text-white drop-shadow-lg'></i>
        </div>

        <div className='relative z-10 text-center pt-8'>
          <div className='bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent text-4xl font-bold mb-2 animate-pulse'>
            🏆 {auctionItem?.topBidder} 🏆
          </div>
          <p className='text-xl font-semibold text-gray-700'>
            Won this item for{' '}
            <span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold text-2xl'>
              💰 ${auctionItem?.soldPrice}
            </span>
          </p>
        </div>
      </div>
    );
  }

  // Guest user registration prompt
  if (!user?.user?._id && !ifCampaignIsOver) {
    return (
      <div className='relative mb-6'>
        <ButtonSparkle isActive={isHovered} />
        <Link to={to} className='block hover:no-underline' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <div className='relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-2xl rounded-2xl py-6 px-8 text-center transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 border-2 border-purple-400/50 overflow-hidden'>
            {/* Magical background effects */}
            <div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse'></div>
            <div className='absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-transparent animate-ping'></div>

            <div className='relative z-10 flex items-center justify-center gap-3'>
              <i className='fa-solid fa-user-plus text-3xl animate-pulse'></i>
              <span>✨ Register to {auctionItem?.sellingFormat === 'auction' ? 'Bid' : 'Buy Now'} ✨</span>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Guest user registration prompt
  if (user?.user?._id && !user?.user?.hasAddress) {
    return (
      <div className='relative mb-6'>
        <ButtonSparkle isActive={isHovered} />
        <Link
          to='/settings/profile?initialLogin=true'
          className='block hover:no-underline'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className='relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-2xl rounded-2xl py-6 px-8 text-center transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 border-2 border-purple-400/50 overflow-hidden'>
            {/* Magical background effects */}
            <div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse'></div>
            <div className='absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-transparent animate-ping'></div>

            <div className='relative z-10 flex items-center justify-center gap-3'>
              <i className='fa-solid fa-user-plus text-3xl animate-pulse'></i>
              <span>✨ Enter address ✨</span>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Buy Now button for fixed price items
  if (auctionItem?.sellingFormat === 'fixed') {
    const isDisabled: boolean = !campaign?.campaign?.auction?.settings?.hasBegun || ifCampaignIsOver || auctionItem?.totalQuantity === 0;

    return (
      <div className='relative mb-6'>
        <ButtonSparkle isActive={isHovered && !isDisabled} />
        <button
          disabled={isDisabled}
          className={`relative w-full py-6 px-8 rounded-2xl font-bold text-2xl transition-all duration-300 border-2 overflow-hidden ${
            isDisabled
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed border-gray-400'
              : 'bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-500 hover:via-green-500 hover:to-teal-500 text-white cursor-pointer transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-green-500/50 border-green-400/50'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onClick={() => {
            triggerLightning(() => {
              navigate(`/campaigns/${customCampaignLink}/auction/item/${auctionItem?._id}/buy`);
            });
          }}
        >
          {/* Magical background effects for enabled state */}
          {!isDisabled && (
            <>
              <div className='absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 animate-pulse'></div>
              <div className='absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-transparent animate-ping'></div>
            </>
          )}

          <div className={`relative z-10 flex items-center justify-center gap-3 ${isPressed ? 'scale-95' : ''} transition-transform duration-150`}>
            <i className='fa-solid fa-shopping-cart text-3xl animate-pulse'></i>
            <span>💰 Buy Now ${auctionItem?.buyNowPrice} 🛒</span>
          </div>
        </button>
      </div>
    );
  }

  // Place Bid button for auction items
  if (!ifCampaignIsOver) {
    const isDisabled: boolean = !campaign?.campaign?.auction?.settings?.hasBegun || ifCampaignIsOver;

    return (
      <div className='relative mb-6'>
        <ButtonSparkle isActive={isHovered && !isDisabled} />
        <button
          disabled={isDisabled}
          onClick={() => setOpenBidModal(true)}
          className={`relative w-full py-6 px-8 rounded-2xl font-bold text-2xl transition-all duration-300 border-2 overflow-hidden ${
            isDisabled
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed border-gray-400'
              : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 text-white cursor-pointer transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-purple-500/50 border-purple-400/50'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
        >
          {/* Magical background effects for enabled state */}
          {!isDisabled && (
            <>
              <div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 animate-pulse'></div>
              <div className='absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-transparent animate-ping'></div>
            </>
          )}

          <div className={`relative z-10 flex items-center justify-center gap-3 ${isPressed ? 'scale-95' : ''} transition-transform duration-150`}>
            <Gavel className='w-8 h-8 animate-pulse' />
            <span>Place a Bid </span>
          </div>
        </button>
      </div>
    );
  }

  return null;
};

export default AuctionItemButtonBox;
