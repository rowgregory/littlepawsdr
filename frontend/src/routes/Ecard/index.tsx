import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Ecards from './Ecards';
import FilteredEcards from './FilteredEcards';
import PersonalizeEcard from './PersonalizeEcard';

const EventsRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Ecards />} />
      <Route path='/:category' element={<FilteredEcards />} />
      <Route path='/personalize/:id' element={<PersonalizeEcard />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default EventsRoutes;
