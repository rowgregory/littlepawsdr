import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Cart from './Cart';
import PlaceOrder from './PlaceOrder';

const CartRoutes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Cart} />
      <Route path={`${path}/place-order`} component={PlaceOrder} />
    </Switch>
  );
};

export default CartRoutes;
