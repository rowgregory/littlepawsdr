import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cart from './Cart';
import PlaceOrder from './PlaceOrder';

const CartRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Cart />} />
      <Route path='place-order' element={<PlaceOrder />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default CartRoutes;
