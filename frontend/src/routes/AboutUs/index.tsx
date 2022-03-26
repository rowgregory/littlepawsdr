import { FC, useEffect, useState } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import SuccessfulAdoptionDetails from './SuccessfulAdoptionDetails';
import SuccessfulAdoptions from './SuccessfulAdoptions';
import ContactUs from './ContactUs';
import Education from './Education';
import WhoWeAre from './TeamMembers';
import StatusDogDetails from './StatusDogDetails';
import styled from 'styled-components';
import PageLayoutWithTabs from '../../components/layouts/PageLayoutWithTabs';
import { Text } from '../../components/styles/Styles';
import { Tab, TabContainer } from '../Adopt/Adoption';
import { Col, Row } from 'react-bootstrap';
import { PawPrint } from '../Available/DachshundScreen';
import RaffleWinners from './RaffleWinners';
import StatusDogList from './StatusDogList';
import Blog from './Blog';
import BlogDetails from './BlogDetails';

const Container = styled.div`
  margin: 0 12px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 0 48px;
  }
`;

const Navigation: FC<{
  tabCategory: string;
  setTabCategory: (tabCategory: string) => void;
}> = ({ tabCategory, setTabCategory }) => {
  const history = useHistory();
  const { pathname: path } = useLocation();
  return (
    <Container>
      <TabContainer>
        {[
          { linkText: 'What We Believe', linkKey: '/about' },
          {
            linkText: 'Team Members',
            linkKey: '/about/team-members',
          },
          {
            linkText: 'Contact Us',
            linkKey: '/about/contact-us',
          },
          {
            linkText: 'Education',
            linkKey: '/about/education',
          },
          {
            linkText: 'Sanctuary',
            linkKey: '/about/sanctuary',
          },
          {
            linkText: 'Dogs On Hold',
            linkKey: '/about/hold',
          },
          {
            linkText: 'Successful Adoptions',
            linkKey: '/about/successful-adoptions',
          },
          {
            linkText: 'Rainbow Bridge',
            linkKey: '/about/rainbow-bridge',
          },
          {
            linkText: 'Raffle Winners',
            linkKey: '/about/raffle-winners',
          },
          {
            linkText: 'Blog',
            linkKey: '/about/blog',
          },
        ].map((tab: { linkText: string; linkKey: string }, i: number) => (
          <Tab
            key={i}
            onClick={() => {
              history.push(tab.linkKey);
              setTabCategory(tab.linkText);
            }}
            active={tab.linkText === tabCategory || tab.linkKey === path}
          >
            {tab.linkText}
          </Tab>
        ))}
      </TabContainer>
    </Container>
  );
};

const WhatWeBelieve = () => {
  return (
    <Row>
      <Col md={9} className='mb-5 px-0'>
        <Text fontFamily={`Duru Sans`} fontSize='1.15rem' marginBottom='1rem'>
          We believe that dogs truly are man’s (and woman’s) best friend and
          that our beloved companions deserve the right to a soft bed, generous
          treats and unconditional love.
        </Text>
        <Text fontFamily={`Duru Sans`} fontSize='1.15rem' marginBottom='1rem'>
          We believe in rescue. We believe in the power of cooperation and
          teamwork to make this happen. We believe in volunteers who can work
          together to help make a difference in the life of three puppy mill
          dogs who have spent their lives in cramped cages and now have a chance
          at a bright future thanks to the teamwork of Little Paws Dachshund
          Rescue and Carolina Loving Hound Rescue.
        </Text>
        <Text fontFamily={`Duru Sans`} fontSize='1.15rem' marginBottom='1rem'>
          We believe that two sweet puppies left behind at a veterinarian’s
          office deserve a life full of toys and fun and snuggles. We believe
          Little Paws Dachshund Rescue can help change the lives of these dogs,
          and many, many more in the future.
        </Text>
        <Text fontFamily={`Duru Sans`} fontSize='1.15rem' marginBottom='1rem'>
          Do you believe? Are you ready to help us achieve our mission? In the
          coming weeks we will be putting out calls for volunteers for many
          roles within our rescue. So many of you have reached out and asked how
          you can help! We are touched by everyone’s generosity.
        </Text>
        <Text fontFamily={`Duru Sans`} fontSize='1.15rem' marginBottom='1rem'>
          Right now, we are in need of monetary donations. Happy endings for our
          dachshunds in need can only happen with your support. Please allow us
          to continue to say “YES WE CAN” to those calls asking for assistance
          with a dachshund left behind at an animal shelter, or a dog who has
          been neglected and abused and deserves a warm bed and a kind hand to
          rub his or her tummy.
        </Text>
      </Col>
      <Col md={3} className='d-flex flex-column px-0'>
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
      </Col>
    </Row>
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
    <PageLayoutWithTabs
      tabs={
        <Navigation tabCategory={tabCategory} setTabCategory={setTabCategory} />
      }
    >
      <Container>
        <Switch>
          <Route exact path={path} component={WhatWeBelieve} />
          <Route path={`${path}/team-members`} component={WhoWeAre} />
          <Route path={`${path}/contact-us`} component={ContactUs} />
          <Route path={`${path}/education`} component={Education} />
          <Route
            path={`${path}/successful-adoptions`}
            component={SuccessfulAdoptions}
          />
          <Route
            exact
            path={`${path}/successful-adoption/:id`}
            component={SuccessfulAdoptionDetails}
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
    </PageLayoutWithTabs>
  );
};

export default AboutUsRoutes;
