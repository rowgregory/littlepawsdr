import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import MerchDetails from './MerchDetails';
import Merch from './Merch';

const ShopRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={() => <Merch />} />
      <Route exact path={`${path}/:id`} component={MerchDetails} />
    </Switch>
  );
};

export default ShopRoutes;
