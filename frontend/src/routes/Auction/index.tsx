import { Routes, Route, Navigate } from 'react-router-dom';
import Auctions from './Auctions';
import Auction from './Auction';
import AuctionItem from './AuctionItem';
import InstantBuyPurchase from './InstantBuyPurchase';
import PublicAuctionLayout from './layout';
import QuickBidModal from '../../components/modals/QuickBidModal';
import BidModal from '../../components/modals/BidModal';
import BidConfirmationModal from '../../components/modals/BidConfirmationModal';
import ConfettiPop from '../../components/ConfettiPop';
import LiveActivity from '../../components/auction/LiveActivity';

const AuctionRoutes = () => {
  return (
    <>
      <BidModal />
      <BidConfirmationModal />
      <QuickBidModal />
      <ConfettiPop />
      <LiveActivity />
      <Routes>
        <Route path='/' element={<Auctions />} />
        <Route path=':customAuctionLink' element={<PublicAuctionLayout />}>
          <Route index element={<Auction />} />
          <Route path='item/:auctionItemId/:bid?' element={<AuctionItem />} />
          <Route path='item/:auctionItemId/buy/:paid?' element={<InstantBuyPurchase />} />
        </Route>
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </>
  );
};

export default AuctionRoutes;
