import { FC, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import FosterApplication from './FosterApplication';
import VolunteerApplication from './VolunteerApplication';

const Container = styled.div`
  width: 100%;
  margin-inline: auto;
`;

const VolunteerRoutes: FC = () => {
  const { pathname } = useLocation();
  const currentRoute = pathname.split('/')[2];
  const [tabCategory, setTabCategory] = useState('Volunteer Application');

  useEffect(() => {
    setTabCategory(currentRoute);
  }, [currentRoute, tabCategory]);

  return (
    <Container>
      <Routes>
        <Route
          path='volunteer-application'
          element={<VolunteerApplication />}
        />
        <Route path='foster-application' element={<FosterApplication />} />
      </Routes>
    </Container>
  );
};

export default VolunteerRoutes;
