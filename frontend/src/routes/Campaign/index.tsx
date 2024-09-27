import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Campaigns from './Campaigns';
import Overview from './Overview';
import Auction from './Auction';
import AuctionItem from './AuctionItem';
import BuyAuctionItemNow from './BuyAuctionItemNow';
import CampaignHeader from '../../components/campaign/CampaignHeader';
import CampaignLayout from '../../components/layouts/CampaignLayout';

const CampaignRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Campaigns />} />
      <Route
        path=':customLinkId/*'
        element={
          <CampaignLayout navbar={<CampaignHeader />}>
            <Routes>
              <Route index element={<Overview />} />
              <Route
                path='auction/*'
                element={
                  <Routes>
                    <Route index element={<Auction />} />
                    <Route path='item/:auctionItemId/:bid?' element={<AuctionItem />} />
                    <Route path='item/:auctionItemId/buy/:paid?' element={<BuyAuctionItemNow />} />
                  </Routes>
                }
              />
            </Routes>
          </CampaignLayout>
        }
      />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default CampaignRoutes;
