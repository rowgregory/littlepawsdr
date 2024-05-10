import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomeWieners from './WelcomeWieners';
import WelcomeWienerDetails from './WelcomeWienerDetails';

const WelcomeWienerRoutes = () => {
  return (
    <div className='min-h-[calc(100vh-555px)] pb-60 mt-[65px]'>
      <Routes>
        <Route path='/' element={<WelcomeWieners />} />
        <Route path='/:id' element={<WelcomeWienerDetails />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </div>
  );
};

export default WelcomeWienerRoutes;
