import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cart from './Cart';
import Checkout from './Checkout';

const CartRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Cart />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default CartRoutes;
