import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import LiveActivity from '../../components/campaign/auction/LiveActivity';
import AuctionItemCard from '../../components/campaign/auction/AuctionItemCard';
import FloatingParticles from '../../components/campaign/auction/FloatingParticles';
import AuctionHeader from '../../components/campaign/auction/AuctionHeader';
import { LiveStats } from '../../components/campaign/auction/AuctionBadges';
import AuctionCountdownTimer from '../../components/campaign/auction/AuctionCountdownTimer';
import { motion } from 'framer-motion';
import ConfettiPop from '../../components/ConfettiPop';
import { resetPlaceBidSuccess } from '../../redux/features/campaign/campaignSlice';

const Auction = () => {
  const dispatch = useAppDispatch();
  const campaignState = useAppSelector((state: RootState) => state.campaign);
  const campaign = campaignState?.campaign;
  const auction = campaign?.auction;
  const customCampaignLink = campaign?.customCampaignLink;
  const { user } = useAppSelector((state: RootState) => state.user);
  const [popTrigger, setPopTrigger] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');

  const latestBids = campaign?.auction?.bids;

  const calculateIncrementalTotal = (bids: any) => {
    if (!bids || bids.length === 0) return 0;

    // Group bids by auction item
    const bidsByItem = bids.reduce((acc: any, bid: any) => {
      const itemId = bid.auctionItem._id.toString();
      if (!acc[itemId]) {
        acc[itemId] = [];
      }
      acc[itemId].push(bid);
      return acc;
    }, {});

    let grandTotal = 0;
    // Process each item separately
    Object.values(bidsByItem).forEach((itemBids: any) => {
      // Sort bids for this item by bidAmount (lowest to highest)
      const sortedBids = [...itemBids].sort((a, b) => a.bidAmount - b.bidAmount);

      let itemTotal = 0;

      for (let i = 0; i < sortedBids.length; i++) {
        if (i === 0) {
          // First bid for this item is the full amount
          itemTotal += sortedBids[i].bidAmount;
        } else {
          // Add only the difference from the previous bid for this item
          const increment = sortedBids[i].bidAmount - sortedBids[i - 1].bidAmount;
          itemTotal += increment;
        }
      }

      // Add this item's total to the grand total
      grandTotal += itemTotal;
    });

    return grandTotal;
  };
  const moneySecured = calculateIncrementalTotal(latestBids);

  const status = campaign?.auction?.settings?.status;

  const triggerPop = () => {
    setPopTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    if (campaignState?.placeBidSuccess) {
      triggerPop();
      setTimeout(() => {
        dispatch(resetPlaceBidSuccess());
      }, 3000);
    }
  }, [latestBids, campaignState?.placeBidSuccess, dispatch]);

  const auctionCount = campaign?.auction?.items?.filter((item) => item.sellingFormat === 'auction').length;
  const fixedCount = campaign?.auction?.items?.filter((item) => item.sellingFormat === 'fixed').length;

  return (
    <div className='min-h-dvh pb-60 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden'>
      <ConfettiPop trigger={popTrigger} particleCount={150} duration={3000} />
      <FloatingParticles />

      <div className='relative z-10 container mx-auto px-4 pt-8 pb-40 max-w-screen-2xl'>
        <AuctionHeader user={user} customCampaignLink={campaign?.customCampaignLink} />
        <AuctionCountdownTimer startDate={auction?.settings?.startDate} endDate={auction?.settings?.endDate} title={campaign?.title} />

        <LiveStats
          totalBidders={auction?.bidders?.length}
          moneySecured={moneySecured?.toString()}
          status={status}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          auctionCount={auctionCount}
          instantCount={fixedCount}
        />

        {/* Main auction grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mb-12'>
          {auction?.items
            ?.filter((item: any) => {
              if (activeFilter === 'all') return true;
              if (activeFilter === 'auction') return item.sellingFormat === 'auction' || !item.instantBuyPrice;
              if (activeFilter === 'instant') return item.sellingFormat === 'fixed' || item.instantBuyPrice;
              return true;
            })
            ?.map((item: any, index: number) => (
              <AuctionItemCard
                key={index}
                item={item}
                index={index}
                settings={auction?.settings}
                customCampaignLink={customCampaignLink}
                status={status}
                user={user}
              />
            ))}
        </div>

        {/* Call to action */}
        <div className='flex justify-center mt-40'>
          <motion.div
            className='bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 text-white font-semibold text-base px-6 py-2 rounded-md inline-flex items-center gap-2 shadow-sm border border-teal-300/30'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <motion.div
              className='w-2 h-2 bg-white rounded-full'
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            ></motion.div>
            <span>
              {Math.round(((moneySecured || 0) / (campaign?.goal || 1)) * 100)}% of ${campaign?.goal?.toLocaleString()} Goal
            </span>
          </motion.div>
        </div>
      </div>

      <LiveActivity latestBids={latestBids} status={status} customCampaignLink={customCampaignLink} />
    </div>
  );
};

export default Auction;
