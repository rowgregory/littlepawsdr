import { Routes, Route, Navigate } from 'react-router-dom';
import AdoptionApplicationTermsAndPayment from './AdoptionApplicationTermsAndPayment';
import AdoptionFees from './AdoptionFees';
import AdoptionInformation from './AdoptionInformation';
import AdoptionFAQ from './AdoptionFAQ';
import TransportApplication from './TransportApplication';
import SeniorDogs from './SeniorDogs';
import AdoptionApplication from './AdoptionApplication';

const AdoptRoutes = () => {
  return (
    <div className='min-h-[calc(100vh-540px)] pb-60 mt-[65px]'>
      <Routes>
        <Route path='/' element={<AdoptionApplicationTermsAndPayment />} />
        <Route path='application/verified/:token' element={<AdoptionApplication />} />
        <Route path='info' element={<AdoptionInformation />} />
        <Route path='fees' element={<AdoptionFees />} />
        <Route path='faq' element={<AdoptionFAQ />} />
        <Route path='transport-application' element={<TransportApplication />} />
        <Route path='senior' element={<SeniorDogs />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </div>
  );
};

export default AdoptRoutes;
