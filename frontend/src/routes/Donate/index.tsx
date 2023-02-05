import React from 'react';
import DonationForm from './Donate';
import ShopToHelp from '../../components/donate/ShopToHelp';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import FeedAFoster from './FeedAFoster';
import PageNotFound from '../../components/common/PageNotFound';
import DonateLayoutWithSideBar from '../../components/layouts/DonateLayoutWithSideBar';
import LongDog from './LongDog';
import SideBar from '../../components/donate/Sidebar';
import Venmo from './Venmo';
import Check from './Check';
import Hero from '../../components/donate/Hero';

const DonateRoutes = ({ timerComponents, showFundraiser }: any) => {
  const { path } = useRouteMatch();

  return (
    <DonateLayoutWithSideBar jumbotron={<Hero />} sideBar={<SideBar />}>
      <Switch>
        <Route exact path={path} component={DonationForm} />
        <Route
          path={`${path}/long-dog`}
          render={() => (
            <LongDog
              timerComponents={timerComponents}
              showFundraiser={showFundraiser}
            />
          )}
        />
        <Route path={`${path}/shop-to-help`} component={ShopToHelp} />
        <Route path={`${path}/venmo`} component={Venmo} />
        <Route path={`${path}/check`} component={Check} />
        <Route path={`${path}/feed-a-foster`} component={FeedAFoster} />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </DonateLayoutWithSideBar>
  );
};

export default DonateRoutes;
