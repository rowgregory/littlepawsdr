import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MerchDetails from './MerchDetails';
import Merch from './Merch';

const ShopRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Merch />} />
      <Route path=':id' element={<MerchDetails />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default ShopRoutes;
