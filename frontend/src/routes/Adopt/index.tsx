import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PageNotFound from '../../components/common/PageNotFound';
import AdoptionApplication from './AdoptionApplication';
import AdoptionFees from './AdoptionFees';
import AdoptionInformation from './AdoptionInformation';
import AdoptionFAQ from './AdoptionFAQ';
import styled from 'styled-components';
import TransportApplication from './TransportApplication';
import SeniorDogs from './SeniorDogs';

const Container = styled.div`
  width: 100%;
  margin-inline: auto;
`;

const AdoptRoutes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <Container>
      <Switch>
        <Route exact path={path} component={AdoptionApplication} />
        <Route path={`${path}/application`} component={AdoptionApplication} />
        <Route path={`${path}/info`} component={AdoptionInformation} />
        <Route path={`${path}/fees`} component={AdoptionFees} />
        <Route path={`${path}/faq`} component={AdoptionFAQ} />
        <Route
          path={`${path}/transport-application`}
          component={TransportApplication}
        />
        <Route path={`${path}/senior`} component={SeniorDogs} />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Container>
  );
};

export default AdoptRoutes;
