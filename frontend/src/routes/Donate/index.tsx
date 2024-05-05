import { Navigate, Route, Routes } from 'react-router-dom';
import Donate from './Donate';
import ShopToHelp from './ShopToHelp'
import FeedAFoster from './FeedAFoster';

const DonateRoutes = () => {
  return (
    <div className='min-h-[calc(100vh-540px)] mt-[65px]'>
      <Routes>
        <Route path='/' element={<Donate />} />
        <Route path='shop-to-help' element={<ShopToHelp />} />
        <Route path='feed-a-foster' element={<FeedAFoster />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </div>
  );
};

export default DonateRoutes;
