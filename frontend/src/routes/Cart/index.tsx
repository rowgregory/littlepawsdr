import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { PageLayout } from '../../components/styles/Styles';
import Cart from './Cart';
import PlaceOrder from './PlaceOrder';

const CartRoutes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <PageLayout>
      <Switch>
        <Route exact path={path} component={Cart} />
        <Route path={`${path}/place-order/:id?`} component={PlaceOrder} />
      </Switch>
    </PageLayout>
  );
};

export default CartRoutes;
