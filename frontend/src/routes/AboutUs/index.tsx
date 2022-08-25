import { FC, useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import ContactUs from './ContactUs';
import Education from './Education';
import WhoWeAre from './TeamMembers';
import StatusDogDetails from './StatusDogDetails';
import styled from 'styled-components';
import {
  IntroText,
  Jumbo,
  JumboAndWaveContainer,
  Text,
  Title,
  TitleAndIntroTextContainer,
} from '../../components/styles/Styles';
import { PawPrint } from '../Available/DachshundScreen';
import RaffleWinners from './RaffleWinners';
import StatusDogList from './StatusDogList';
import Blog from './Blog';
import BlogDetails from './BlogDetails';

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints[3]};
  width: 100%;
  margin-inline: auto;
  margin-bottom: 5rem;
  padding: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-top: 5rem;
    padding: 0;
  }
`;

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
              <Text
                fontFamily={`'Duru Sans', sans-serif`}
                fontSize='0.75rem'
                marginLeft='0.5rem'
              >
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
  const { pathname } = useLocation();
  const currentRoute = pathname.split('/')[2];
  const [tabCategory, setTabCategory] = useState('What we believe');

  useEffect(() => {
    setTabCategory(currentRoute);
  }, [currentRoute, tabCategory]);

  return (
    <Container>
      <Switch>
        <Route exact path={path} component={WhatWeBelieve} />
        <Route path={`${path}/team-members`} component={WhoWeAre} />
        <Route path={`${path}/contact-us`} component={ContactUs} />
        <Route path={`${path}/education`} component={Education} />
        <Route
          exact
          path={`${path}/successful-adoptions`}
          render={() => <StatusDogList tab={tabCategory} />}
        />
        <Route
          exact
          path={`${path}/successful-adoptions/:id`}
          component={StatusDogDetails}
        />
        <Route
          exact
          path={`${path}/hold`}
          render={() => <StatusDogList tab={tabCategory} />}
        />
        <Route exact path={`${path}/hold/:id`} component={StatusDogDetails} />
        <Route
          exact
          path={`${path}/sanctuary`}
          render={() => <StatusDogList tab={tabCategory} />}
        />
        <Route
          exact
          path={`${path}/sanctuary/:id`}
          component={StatusDogDetails}
        />
        <Route
          exact
          path={`${path}/rainbow-bridge`}
          render={() => <StatusDogList tab={tabCategory} />}
        />
        <Route
          exact
          path={`${path}/rainbow-bridge/:id`}
          component={StatusDogDetails}
        />
        <Route path={`${path}/raffle-winners`} component={RaffleWinners} />
        <Route exact path={`${path}/blog`} component={Blog} />
        <Route path={`${path}/blog/:id`} component={BlogDetails} />
      </Switch>
    </Container>
  );
};

export default AboutUsRoutes;
