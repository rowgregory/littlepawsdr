import { FC, ReactNode, useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PageLayout } from '../../components/styles/Styles';
import FosterApplication from './FosterApplication';
import Volunteer from './Volunteer';
import VolunteerApplication from './VolunteerApplication';

interface VolunteerLayoutWithTabsProps {
  tabs: ReactNode;
  children: ReactNode;
}

const Main = styled.main`
  width: 100%;
`;

const Section = styled.section`
  display: flex;
`;

const VolunteerLayoutWithTabs: FC<VolunteerLayoutWithTabsProps> = ({
  tabs,
  children,
}) => {
  return (
    <PageLayout>
      <Section>{tabs}</Section>
      <Main>{children}</Main>
    </PageLayout>
  );
};

const VolunteerRoutes: FC = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const currentRoute = pathname.split('/')[2];
  const [tabCategory, setTabCategory] = useState('Volunteer Application');

  useEffect(() => {
    setTabCategory(currentRoute);
  }, [currentRoute, tabCategory]);

  return (
    <VolunteerLayoutWithTabs
      tabs={
        <Volunteer tabCategory={tabCategory} setTabCategory={setTabCategory} />
      }
    >
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
    </VolunteerLayoutWithTabs>
  );
};

export default VolunteerRoutes;
