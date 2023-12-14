import Donate from './Donate';
import ShopToHelp from '../../components/donate/ShopToHelp';
import { Navigate, Route, Routes } from 'react-router-dom';
import FeedAFoster from './FeedAFoster';
import DonateLayoutWithSideBar from '../../components/layouts/DonateLayoutWithSideBar';
import LongDog from './LongDog';
import SideBar from '../../components/donate/Sidebar';
import Venmo from './Venmo';
import Check from './Check';
import DonateHeroAndText from '../../components/donate/DonateHeroAndText';

const DonateRoutes = () => {
  return (
    <DonateLayoutWithSideBar
      jumbotron={<DonateHeroAndText />}
      sideBar={<SideBar />}
    >
      <Routes>
        <Route path='/' element={<Donate />} />
        <Route path='long-dog' element={<LongDog />} />
        <Route path='shop-to-help' element={<ShopToHelp />} />
        <Route path='venmo' element={<Venmo />} />
        <Route path='check' element={<Check />} />
        <Route path='feed-a-foster' element={<FeedAFoster />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </DonateLayoutWithSideBar>
  );
};

export default DonateRoutes;
