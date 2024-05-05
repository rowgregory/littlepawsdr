import { Route, Routes } from 'react-router-dom';
import { ReactNode } from 'react';
import Orders from './Orders';

const OrdersLayout = ({ children }: { children: ReactNode }) => (
  <div className='bg-gray-50 min-h-screen pt-10 sm:pt-12 md:pt-20 px-[10px] sm:px-[16px] md:px-8 pb-3'>
    <div className='max-w-screen-lg w-full mx-auto'>
      <main>{children}</main>
    </div>
  </div>
);

const OrderRoutes = () => {
  return (
    <OrdersLayout>
      <Routes>
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </OrdersLayout>
  );
};

export default OrderRoutes;
