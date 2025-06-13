import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Campaigns from './Campaigns';
import Auction from './Auction';
import AuctionItem from './AuctionItem';
import InstantBuyPurchase from './InstantBuyPurchase';
import CampaignLayout from '../../components/layouts/CampaignLayout';

const CampaignRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Campaigns />} />

      <Route path=':customLinkId' element={<CampaignLayout />}>
        <Route path='auction' element={<Auction />} />
        <Route path='auction/item/:auctionItemId/:bid?' element={<AuctionItem />} />
        <Route path='auction/item/:auctionItemId/buy/:paid?' element={<InstantBuyPurchase />} />
      </Route>

      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default CampaignRoutes;
