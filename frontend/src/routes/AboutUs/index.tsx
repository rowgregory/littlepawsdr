import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ContactUs from './ContactUs';
import Education from './Education';
import WhoWeAre from './TeamMembers';
import DachshundDetails from './DachshundDetails';
import Blog from './Blog';
import BlogDetails from './BlogDetails';
import PageNotFound from '../../components/common/PageNotFound';
import SponsorSanctuary from './SponsorSanctuary';
import SuccessfulAdoptions from './SuccessfulAdoptions';
import RainbowBridge from './RainbowBridge';
import DogsOnHold from './DogsOnHold';

const AboutUsRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/team-members`} component={WhoWeAre} />
      <Route path={`${path}/contact-us`} component={ContactUs} />
      <Route path={`${path}/education`} component={Education} />
      <Route path={`${path}/hold`} component={DogsOnHold} />
      <Route path={`${path}/type/:id`} component={DachshundDetails} />
      <Route path={`${path}/sanctuary`} component={SponsorSanctuary} />
      <Route path={`${path}/rainbow-bridge`} component={RainbowBridge} />
      <Route
        path={`${path}/successful-adoptions`}
        component={SuccessfulAdoptions}
      />
      <Route exact path={`${path}/blog`} component={Blog} />
      <Route path={`${path}/blog/:id`} component={BlogDetails} />
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default AboutUsRoutes;
