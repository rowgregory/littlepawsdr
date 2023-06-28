import { ComponentType, FC, lazy } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import PageNotFound from '../../components/common/PageNotFound';
import { DashboardLayoutWithSideBar } from '../../components/layouts/DashboardLayoutWithSideBar';
import SideBar from '../../components/dashboard/sidebar/SideBar';
import Dashboard from './Dashboard';
import ECardEdit from './ECardEdit';
import ECardList from './ECardList';
import EventEdit from './EventEdit';
import EventList from './EventList';
import NewsletterEmailList from './NewsletterEmailList';
import ProductEdit from './ProductEdit';
import ProductList from './ProductList';
import UserEdit from './UserEdit';
import UserList from './UserList';
import RaffleWinnerList from './RaffleWinnerList';
import RaffleWinnerEdit from './RaffleWinnerEdit';
import BlogList from './BlogList';
import BlogEdit from './BlogEdit';
import EducationTipList from './EducationTipList';
import EducationTipEdit from './EducationTipEdit';
import Private from '../../components/common/PrivateRoute';
import ManuallyAddedUserList from './ManuallyAddedUserList';
import ManuallyAddedUserEdit from './ManuallyAddedUserEdit';
import EcardOrderList from './Orders/EcardOrderList';
import OrderEdit from './OrderEdit';
import WelcomeWienerProductList from './WelcomeWienerProductList';
import WelcomeWienerProductCreate from './WelcomeWienerProductCreate';
import WelcomeWienerProductEdit from './WelcomeWienerProductEdit';
import WelcomeWienerDachshundList from './WelcomeWienerDachshundList';
import WelcomeWienerDachshundCreate from './WelcomeWienerDachshundCreate';
import WelcomeWienerDachshundEdit from './WelcomeWienerDachshundEdit';
import WelcomeWienerOrderList from './Orders/WelcomeWienerOrderList';
import ProductOrderList from './Orders/ProductOrderList';
import ProductCreate from './ProductCreate';

type LazyModulePromise<T = {}> = Promise<{ default: ComponentType<T> }>;
const Orders = lazy((): LazyModulePromise => import('./Orders'));

const AdminRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <DashboardLayoutWithSideBar sideBar={<SideBar />}>
      <Switch>
        <Private exact={true} path={path} component={Dashboard} />
        <Private path={`${path}/userList`} component={UserList} />
        <Private path={`${path}/user/:id/edit`} component={UserEdit} />
        <Private path={`${path}/eventList`} component={EventList} />
        <Private path={`${path}/event/:id/edit`} component={EventEdit} />
        <Private path={`${path}/product/list`} component={ProductList} />
        <Private path={`${path}/product/create`} component={ProductCreate} />
        <Private path={`${path}/product/:id/edit`} component={ProductEdit} />
        <Private exact path={`${path}/orders`} component={Orders} />
        <Private exact path={`${path}/order/:id`} component={OrderEdit} />
        <Private path={`${path}/eCardOrderList`} component={EcardOrderList} />
        <Private
          path={`${path}/newsletterEmailList`}
          component={NewsletterEmailList}
        />
        <Private path={`${path}/eCardList`} component={ECardList} />
        <Private path={`${path}/eCard/:id/edit`} component={ECardEdit} />
        <Private
          path={`${path}/raffleWinnerList`}
          component={RaffleWinnerList}
        />
        <Private
          path={`${path}/raffleWinner/:id/edit`}
          component={RaffleWinnerEdit}
        />
        <Private path={`${path}/blogs`} component={BlogList} />
        <Private path={`${path}/blog/:id/edit`} component={BlogEdit} />
        <Private path={`${path}/education-tips`} component={EducationTipList} />
        <Private
          path={`${path}/education-tip/:id/edit`}
          component={EducationTipEdit}
        />
        <Private
          path={`${path}/manuallyAddedUser/:id/edit`}
          component={ManuallyAddedUserEdit}
        />
        <Private
          path={`${path}/manuallyAddedUserList`}
          component={ManuallyAddedUserList}
        />
        <Private
          path={`${path}/welcome-wiener/product/list`}
          component={WelcomeWienerProductList}
        />
        <Private
          path={`${path}/welcome-wiener/product/create`}
          component={WelcomeWienerProductCreate}
        />
        <Private
          path={`${path}/welcome-wiener/product/:id/edit`}
          component={WelcomeWienerProductEdit}
        />
        <Private
          path={`${path}/welcome-wiener/dachshund/list`}
          component={WelcomeWienerDachshundList}
        />
        <Private
          path={`${path}/welcome-wiener/dachshund/create`}
          component={WelcomeWienerDachshundCreate}
        />
        <Private
          path={`${path}/welcome-wiener/dachshund/:id/edit`}
          component={WelcomeWienerDachshundEdit}
        />
        <Private
          path={`${path}/welcome-wiener/order/list`}
          component={WelcomeWienerOrderList}
        />
        <Private
          path={`${path}/product/order/list`}
          component={ProductOrderList}
        />
        <Route path='/404' component={PageNotFound} />
        <Redirect to='/404' />
      </Switch>
    </DashboardLayoutWithSideBar>
  );
};

export default AdminRoutes;
