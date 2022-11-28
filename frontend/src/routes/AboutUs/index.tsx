import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ContactUs from './ContactUs';
import Education from './Education';
import WhoWeAre from './TeamMembers';
import DachshundDetails from './DachshundDetails';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import { PawPrint } from '../Available/AvailableDog';
import RaffleWinners from './RaffleWinners';
import Blog from './Blog';
import BlogDetails from './BlogDetails';
import PageNotFound from '../../components/common/PageNotFound';
import SponsorSanctuary from './SponsorSanctuary';
import SuccessfulAdoptions from './SuccessfulAdoptions';
import RainbowBridge from './RainbowBridge';
import DogsOnHold from './DogsOnHold';

const WhatWeBelieveContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;

const WhatWeBelieve = () => {
  return (
    <WhatWeBelieveContainer>
      <div style={{ flex: 1 }} className='p-3'>
        <h5 className='mb-4'>Where we Rescue</h5>
        {[
          'Alabama',
          'Connecticut',
          'Delaware',
          'Florida',
          'Georgia',
          'Kentucky',
          'Maine',
          'Maryland',
          'Massachusetts',
          'New Hampshire',
          'New Jersey',
          'New York',
          'North Carolina',
          'Ohio',
          'Pennsylvania',
          'Rhode Island',
          'South Carolina',
          'Tennessee',
          'Vermont',
          'Virginia',
          'West Virginia',
        ].map((state, i) => (
          <div key={i}>
            <div className='mb-2 d-flex align-items-center'>
              <PawPrint />
              <Text fontSize='0.75rem' marginLeft='0.5rem'>
                {state}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </WhatWeBelieveContainer>
  );
};

const AboutUsRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={WhatWeBelieve} />
      <Route path={`${path}/team-members`} component={WhoWeAre} />
      <Route path={`${path}/contact-us`} component={ContactUs} />
      <Route path={`${path}/education`} component={Education} />
      <Route path={`${path}/hold`} component={DogsOnHold} />
      <Route path={`${path}/sanctuary`} component={SponsorSanctuary} />
      <Route path={`${path}/rainbow-bridge`} component={RainbowBridge} />
      <Route
        path={`${path}/successful-adoptions`}
        component={SuccessfulAdoptions}
      />
      <Route path={`${path}/dachshund`} component={DachshundDetails} />
      <Route path={`${path}/raffle-winners`} component={RaffleWinners} />
      <Route exact path={`${path}/blog`} component={Blog} />
      <Route path={`${path}/blog/:id`} component={BlogDetails} />
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default AboutUsRoutes;
