import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ContactUs from './ContactUs';
import Education from './Education';
import WhoWeAre from './TeamMembers';
import DachshundDetails from './DachshundDetails';
import styled from 'styled-components';
import {
  IntroText,
  Jumbo,
  JumboAndWaveContainer,
  Text,
  Title,
  TitleAndIntroTextContainer,
} from '../../components/styles/Styles';
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
      <JumboAndWaveContainer>
        <Jumbo>
          <TitleAndIntroTextContainer>
            <Title>About Us</Title>
            <IntroText className='mb-3'>
              We believe that dogs truly are man’s (and woman’s) best friend and
              that our beloved companions deserve the right to a soft bed,
              generous treats and unconditional love.
            </IntroText>
            <IntroText className='mb-3'>
              We believe in rescue. We believe in the power of cooperation and
              teamwork to make this happen. We believe in volunteers who can
              work together to help make a difference in the life of three puppy
              mill dogs who have spent their lives in cramped cages and now have
              a chance at a bright future thanks to the teamwork of Little Paws
              Dachshund Rescue and Carolina Loving Hound Rescue.
            </IntroText>
            <IntroText>
              We believe that two sweet puppies left behind at a veterinarian’s
              office deserve a life full of toys and fun and snuggles. We
              believe Little Paws Dachshund Rescue can help change the lives of
              these dogs, and many, many more in the future.
            </IntroText>
            <IntroText>
              Do you believe? Are you ready to help us achieve our mission? In
              the coming weeks we will be putting out calls for volunteers for
              many roles within our rescue. So many of you have reached out and
              asked how you can help! We are touched by everyone’s generosity.
            </IntroText>
            <IntroText>
              Right now, we are in need of monetary donations. Happy endings for
              our dachshunds in need can only happen with your support. Please
              allow us to continue to say “YES WE CAN” to those calls asking for
              assistance with a dachshund left behind at an animal shelter, or a
              dog who has been neglected and abused and deserves a warm bed and
              a kind hand to rub his or her tummy.
            </IntroText>
          </TitleAndIntroTextContainer>
        </Jumbo>
      </JumboAndWaveContainer>
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
