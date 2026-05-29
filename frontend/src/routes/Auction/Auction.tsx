import { useState } from 'react';
import { useAuctionSelector, useUserSelector } from '../../redux/toolkitStore';
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'auction' | 'instant' | 'no-bids'>(
    'all',
  );

  const items = auction?.items ?? [];

  // Single source of truth for classifying an item, so counts and the
  // visible grid never disagree.
  const isAuctionItem = (item: any) => item.sellingFormat === 'auction' || !item.buyNowPrice;
  const isInstantItem = (item: any) => item.sellingFormat === 'fixed' || !!item.buyNowPrice;
  const hasNoBids = (item: any) => !item.bids || item.bids.length === 0;

  const totalFromInstantBuys =
    auction?.instantBuyers?.reduce((acc, item) => acc + (item.totalPrice || 0), 0) ?? 0;

  const moneySecured = calculateIncrementalTotal(auction?.bids) + totalFromInstantBuys;

  const auctionCount = items.filter(isAuctionItem).length;
  const instantCount = items.filter(isInstantItem).length;
  const noBidsCount = items.filter((i) => isAuctionItem(i) && hasNoBids(i)).length;

  const visibleItems = items.filter((item: any) => {
    switch (activeFilter) {
      case 'auction':
        return isAuctionItem(item);
      case 'instant':
        return isInstantItem(item);
      case 'no-bids':
        return isAuctionItem(item) && hasNoBids(item);
      default:
        return true;
    }
  });

  return (
    <div className='min-h-dvh pb-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden'>
      <FloatingParticles />

      {/* Full-bleed header — sits outside the padded container */}
      <AuctionHeader user={user} customAuctionLink={auction?.customAuctionLink ?? ''} />

      <div className='relative z-10 mx-auto w-full max-w-screen-2xl px-3 sm:px-4 pt-6 sm:pt-8'>
        <AuctionCountdownTimer
          startDate={auction?.startDate}
          endDate={auction?.endDate}
          title={auction?.title}
        />

        <LiveStats
          totalBidders={auction?.bidders?.length ?? 0}
          moneySecured={moneySecured?.toString()}
          status={auction?.status || ''}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          auctionCount={auctionCount}
          instantCount={instantCount}
          noBidsCounts={noBidsCount}
        />

        {/* Main auction grid */}
        {visibleItems.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 mb-12'>
            {visibleItems.map((item: any) => (
              <AuctionItemCard
                key={item._id ?? item.id}
                auctionItem={item}
                index={0}
                auction={auction}
                user={user}
              />
            ))}
          </div>
        ) : (
          <p className='text-center text-white/70 text-sm py-16' role='status'>
            No items match this filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default Auction;
