import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ListAvailableDogs from './ListAvailableDogs';
import PageNotFound from '../../components/common/PageNotFound';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin-inline: auto;
`;

const AvailableRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Container>
      <Switch>
        <Route exact path={`${path}`} component={ListAvailableDogs} />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Container>
  );
};

export default AvailableRoutes;
