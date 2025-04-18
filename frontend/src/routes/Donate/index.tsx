import { Navigate, Route, Routes } from 'react-router-dom';
import Donate from './Donate';
import ShopToHelp from './ShopToHelp';
import FeedAFoster from './FeedAFoster';
import WelcomeWieners from './WelcomeWieners';
import WelcomeWienerDetails from './WelcomeWienerDetails';

const DonateRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Donate />} />
      <Route path='/welcome-wieners' element={<WelcomeWieners />} />
      <Route path='/welcome-wieners/:id' element={<WelcomeWienerDetails />} />
      <Route path='shop-to-help' element={<ShopToHelp />} />
      <Route path='feed-a-foster' element={<FeedAFoster />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default DonateRoutes;
