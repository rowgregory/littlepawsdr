import { Routes, Route } from 'react-router-dom';
import FosterApplication from './FosterApplication';
import VolunteerApplication from './VolunteerApplication';
import TransportApplication from './TransportApplication';

const VolunteerRoutes = () => {
  return (
    <div className='min-h-[calc(100vh-401px)] pb-60 mt-[65px]'>
      <Routes>
        <Route path='volunteer-application' element={<VolunteerApplication />} />
        <Route path='foster-application' element={<FosterApplication />} />
        <Route path='transport-application' element={<TransportApplication />} />
      </Routes>
    </div>
  );
};

export default VolunteerRoutes;
