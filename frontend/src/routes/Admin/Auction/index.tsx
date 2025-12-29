import { Routes, Route } from 'react-router-dom';
import Auctions from './Auctions';
import Overview from './Overview';
import AuctionItems from './AuctionItems';
import WinningBids from './WinningBids';
import Participants from './Participants';
import AdminAuctionLayout from './AdminAuctionLayout';

const AdminAuctionRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Auctions />} />
      <Route path='/:id/*' element={<AdminAuctionLayout />}>
        <Route path='overview' element={<Overview />} />
        <Route path='items/*' element={<AuctionItems />} />
        <Route path='participants' element={<Participants />} />
        <Route path='winning-bids' element={<WinningBids />} />
      </Route>
    </Routes>
  );
};

export default AdminAuctionRoutes;
