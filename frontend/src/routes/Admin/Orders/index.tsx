import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import OrdersLayout from './OrdersLayout';

const EventsRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<OrdersLayout />} />
    </Routes>
  );
};

export default EventsRoutes;
