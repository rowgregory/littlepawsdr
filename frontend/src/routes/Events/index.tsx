import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Event from './Event';
import Events from './Events';

const EventsRoutes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Events} />
      <Route path={`${path}/:id`} component={Event} />
    </Switch>
  );
};

export default EventsRoutes;
