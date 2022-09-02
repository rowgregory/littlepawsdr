import { FC } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import PageNotFound from '../../components/common/PageNotFound';
import { DashboardLayoutWithSideBar } from '../../components/layouts/DashboardLayoutWithSideBar';
import SideBar from '../../components/dashboard/SideBar';
import Dashboard from './Dashboard';
import DonationEdit from './DonationEdit';
import DonationList from './DonationList';
import ECardEdit from './ECardEdit';
import ECardList from './ECardList';
import EventEdit from './EventEdit';
import EventList from './EventList';
import NewsletterEmailList from './NewsletterEmailList';
import OrderList from './OrderList';
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
import { useSelector } from 'react-redux';
import ManuallyAddedUserList from './ManuallyAddedUserList';
import ManuallyAddedUserEdit from './ManuallyAddedUserEdit';

const AdminRoutes: FC = () => {
  const { path } = useRouteMatch();
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <DashboardLayoutWithSideBar sideBar={<SideBar />} userInfo={userInfo}>
      <Switch>
        <Private exact={true} path={path} component={Dashboard} />
        <Private path={`${path}/userList`} component={UserList} />
        <Private path={`${path}/user/:id/edit`} component={UserEdit} />
        <Private path={`${path}/eventList`} component={EventList} />
        <Private path={`${path}/event/:id/edit`} component={EventEdit} />
        <Private path={`${path}/donationList`} component={DonationList} />
        <Private path={`${path}/donation/:id/edit`} component={DonationEdit} />
        <Private path={`${path}/productList`} component={ProductList} />
        <Private path={`${path}/product/:id/edit`} component={ProductEdit} />
        <Private path={`${path}/orderList`} component={OrderList} />
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
        <Route path='/404' component={PageNotFound} />
        <Redirect to='/404' />
      </Switch>
    </DashboardLayoutWithSideBar>
  );
};

export default AdminRoutes;
