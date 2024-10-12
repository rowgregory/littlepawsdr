import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cart from './Cart';
import CustomerInfo from './CustomerInfo';
import CartCheckoutLayout from '../../components/layouts/CartCheckoutLayout';
import ShippingAddress from './ShippingAddress';
import Payment from './Payment';

const CartRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Cart />} />
      <Route
        path='checkout/*'
        element={
          <CartCheckoutLayout>
            <Routes>
              <Route path='customer-info' element={<CustomerInfo />} />
              <Route path='shipping-address' element={<ShippingAddress />} />
              <Route path='payment' element={<Payment />} />
            </Routes>
          </CartCheckoutLayout>
        }
      />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default CartRoutes;
