import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Event from './Event';
import Events from './Events';

const EventsRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Events />} />
      <Route path=':id' element={<Event />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default EventsRoutes;
