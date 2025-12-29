import { useState } from 'react';
import { useAuctionSelector, useUserSelector } from '../../redux/toolkitStore';
import { motion } from 'framer-motion';
import FloatingParticles from '../../components/auction/FloatingParticles';
import AuctionHeader from '../../components/auction/AuctionHeader';
import AuctionCountdownTimer from '../../components/auction/AuctionCountdownTimer';
import { LiveStats } from '../../components/auction/AuctionBadges';
import AuctionItemCard from '../../components/auction/AuctionItemCard';

const calculateIncrementalTotal = (bids: any) => {
  if (!bids || bids.length === 0) return 0;

  // Group bids by auction item
  const bidsByItem = bids.reduce((acc: any, bid: any) => {
    const itemId = bid?.auctionItem?._id?.toString();
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

const Auction = () => {
  const { auction } = useAuctionSelector();
  const { user } = useUserSelector();
  const [activeFilter, setActiveFilter] = useState('all');

  const totalFromInstantBuys = auction?.instantBuyers?.length
    ? auction?.instantBuyers.reduce((acc, item) => acc + (item.totalPrice || 0), 0)
    : 0;

  const moneySecured = calculateIncrementalTotal(auction?.bids) + totalFromInstantBuys;

  const auctionCount = auction?.items?.filter(
    (item: { sellingFormat: string }) => item.sellingFormat === 'auction'
  ).length;

  const fixedCount = auction?.items?.filter(
    (item: { sellingFormat: string }) => item.sellingFormat === 'fixed'
  ).length;

  const noBidsCount =
    auction?.items?.filter(
      (item: { bids: string | any[]; sellingFormat: string }) =>
        (item.bids?.length || 0) === 0 && item.sellingFormat === 'auction'
    ).length || 0;

  return (
    <div className='min-h-dvh pb-60 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden'>
      <FloatingParticles />

      <div className='relative z-10 container mx-auto px-4 pt-8 pb-40 max-w-screen-2xl'>
        <AuctionHeader user={user} customAuctionLink={auction?.customAuctionLink ?? ''} />
        <AuctionCountdownTimer
          startDate={auction?.startDate}
          endDate={auction?.endDate}
          title={auction?.title}
        />

        <LiveStats
          totalBidders={auction?.bidders?.length}
          moneySecured={moneySecured?.toString()}
          status={auction?.status || ''}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          auctionCount={auctionCount}
          instantCount={fixedCount}
          noBidsCounts={noBidsCount}
        />

        {/* Main auction grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mb-12'>
          {auction?.items
            ?.filter((item: any) => {
              if (activeFilter === 'all') return true;
              if (activeFilter === 'auction')
                return item.sellingFormat === 'auction' || !item.buyNowPrice;
              if (activeFilter === 'instant')
                return item.sellingFormat === 'fixed' || item.buyNowPrice;
              if (activeFilter === 'no-bids')
                return (
                  (item.sellingFormat === 'auction' || !item.buyNowPrice) &&
                  (!item.bids || item.bids.length === 0)
                );
              return true;
            })
            ?.map((item: any, index: number) => (
              <AuctionItemCard
                key={index}
                auctionItem={item}
                index={index}
                auction={auction}
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
              {Math.round(((moneySecured || 0) / (auction?.goal || 1)) * 100)}% of $
              {auction?.goal?.toLocaleString()} Goal
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auction;
