import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdoptionApplicationTermsAndPayment from './AdoptionApplicationTermsAndPayment';
import AdoptionFees from './AdoptionFees';
import AdoptionInformation from './AdoptionInformation';
import AdoptionFAQ from './AdoptionFAQ';
import styled from 'styled-components';
import TransportApplication from './TransportApplication';
import SeniorDogs from './SeniorDogs';
import AdoptionApplication from './AdoptionApplication';

const Container = styled.div`
  width: 100%;
  margin-inline: auto;
`;

const AdoptRoutes: FC = () => {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<AdoptionApplicationTermsAndPayment />} />
        <Route path='application/verified/:token' element={<AdoptionApplication />} />
        <Route path='info' element={<AdoptionInformation />} />
        <Route path='fees' element={<AdoptionFees />} />
        <Route path='faq' element={<AdoptionFAQ />} />
        <Route
          path='transport-application'
          element={<TransportApplication />}
        />
        <Route path='senior' element={<SeniorDogs />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </Container>
  );
};

export default AdoptRoutes;
