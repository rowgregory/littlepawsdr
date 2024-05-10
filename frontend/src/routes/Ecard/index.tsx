import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Ecards from './Ecards';
import PersonalizeEcard from './PersonalizeEcard';
import EcardPreview from './EcardPreview';

const EventsRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Ecards />} />
      <Route path='/personalize/:id' element={<PersonalizeEcard />} />
      <Route path='/personalize/:id/preview' element={<EcardPreview />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default EventsRoutes;
