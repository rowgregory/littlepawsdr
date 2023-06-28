import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import OrdersLayout from './OrdersLayout';

const EventsRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={OrdersLayout} />
    </Switch>
  );
};

export default EventsRoutes;
