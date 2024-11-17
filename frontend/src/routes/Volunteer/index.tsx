import { Routes, Route, Navigate } from 'react-router-dom';
import FosterApplication from './FosterApplication';
import VolunteerApplication from './VolunteerApplication';
import TransportApplication from './TransportApplication';

const VolunteerRoutes = () => {
  return (
    <Routes>
      <Route path='volunteer-application' element={<VolunteerApplication />} />
      <Route path='foster-application' element={<FosterApplication />} />
      <Route path='transport-application' element={<TransportApplication />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default VolunteerRoutes;
