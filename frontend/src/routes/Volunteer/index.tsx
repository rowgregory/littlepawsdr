import { FC, useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import FosterApplication from './FosterApplication';
import VolunteerApplication from './VolunteerApplication';

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints[3]};
  width: 100%;
  margin-inline: auto;
  margin-bottom: 5rem;
  padding: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    margin-top: 5rem;
    padding: 0;
  }
`;

const VolunteerRoutes: FC = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const currentRoute = pathname.split('/')[2];
  const [tabCategory, setTabCategory] = useState('Volunteer Application');

  useEffect(() => {
    setTabCategory(currentRoute);
  }, [currentRoute, tabCategory]);

  return (
    <Container>
      <Switch>
        <Route
          exact
          path={`${path}/volunteer-application`}
          component={VolunteerApplication}
        />
        <Route
          path={`${path}/foster-application`}
          component={FosterApplication}
        />
      </Switch>
    </Container>
  );
};

export default VolunteerRoutes;
