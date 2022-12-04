import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ListAvailableDogs from './ListAvailableDogs';
import AvailableDog from './AvailableDog';
import PageNotFound from '../../components/common/PageNotFound';
import SeniorDogs from './SeniorDogs';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 75px;
  width: 100%;
  margin-inline: auto;
`;

const AvailableRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Container>
      <Switch>
        <Route exact path={`${path}/senior`} component={SeniorDogs} />
        <Route exact path={`${path}`} component={ListAvailableDogs} />
        <Route path={`${path}/dogs/:id`} component={AvailableDog} />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Container>
  );
};

export default AvailableRoutes;
