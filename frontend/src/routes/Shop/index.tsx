import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import Shop from './Shop';

const ShopRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={() => <Shop />} />
      <Route path={`${path}/product/:id`} component={ProductDetails} />
    </Switch>
  );
};

export default ShopRoutes;
