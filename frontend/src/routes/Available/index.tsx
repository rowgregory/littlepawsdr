import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ListAvailableDogs from './ListAvailableDogs';
import DachshundScreen from './DachshundScreen';
import PageNotFound from '../../components/common/PageNotFound';
import SeniorDogs from './SeniorDogs';
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

const AvailableRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Container>
      <Switch>
        <Route exact path={`${path}/senior`} component={SeniorDogs} />
        <Route exact path={`${path}`} component={ListAvailableDogs} />
        <Route path={`${path}/dogs/:id`} component={DachshundScreen} />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Container>
  );
};

export default AvailableRoutes;
