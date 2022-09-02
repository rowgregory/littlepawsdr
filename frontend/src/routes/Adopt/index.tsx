import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PageNotFound from '../../components/common/PageNotFound';
import AdoptionApplication from './AdoptionApplication';
import AdoptionFees from './AdoptionFees';
import AdoptionInformation from './AdoptionInformation';
import AdoptionFAQ from './AdoptionFAQ';
import styled from 'styled-components';

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
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Container>
  );
};

export default AdoptRoutes;
