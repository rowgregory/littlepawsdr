import { Routes, Route, Navigate } from 'react-router-dom';
import AdoptionApplicationTermsAndPayment from './AdoptionApplicationTermsAndPayment';
import AdoptionFees from './AdoptionFees';
import AdoptionInformation from './AdoptionInformation';
import AdoptionFAQ from './AdoptionFAQ';
import AdoptASenior from './AdoptASenior';
import AdoptionApplication from './AdoptionApplication';

const AdoptRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<AdoptionApplicationTermsAndPayment />} />
      <Route path='application/verified/:id' element={<AdoptionApplication />} />
      <Route path='info' element={<AdoptionInformation />} />
      <Route path='fees' element={<AdoptionFees />} />
      <Route path='senior' element={<AdoptASenior />} />
      <Route path='faq' element={<AdoptionFAQ />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default AdoptRoutes;
