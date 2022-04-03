import { FC, ReactNode, useEffect, useState } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import ListAvailableDogs from './ListAvailableDogs';
import DachshundScreen, { PawPrint } from './DachshundScreen';
import PageNotFound from '../../components/common/PageNotFound';
import SeniorDogs from './SeniorDogs';
import { LayoutWrapper, PageLayout } from '../../components/styles/Styles';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import { TabContainer, Tab } from '../Adopt/Adoption';
import { Row, Col } from 'react-bootstrap';

interface AvailableLayoutWithTabsProps {
  tabs: ReactNode;
  children: ReactNode;
}

const RowContainer = styled(Row)`
  margin: 0;
`;

const Main = styled.main`
  width: 100%;
`;

const Section = styled.section``;

const HealthCheckListCard = styled.div`
  background: ${({ theme }) => theme.colors.senary};
  padding: 0.5rem;

  div {
    font-size: 0.8rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-top: 0;
    padding: 1.25rem;
    div {
      font-size: 1.15rem;
    }
  }
`;

const AvailableLayoutWithTabs: FC<AvailableLayoutWithTabsProps> = ({
  tabs,
  children,
}) => {
  return (
    <PageLayout>
      <LayoutWrapper>
        <Section>{tabs}</Section>
        <Main>{children}</Main>
      </LayoutWrapper>
    </PageLayout>
  );
};

const IntroText = styled.div`
  margin: 1.25rem 0 1rem 0;
  font-family: 'Duru Sans';
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    font-size: 1rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 1.15rem;
    padding-right: 1rem;
  }
`;

const Navigation: FC<{
  tabCategory: string;
  setTabCategory: (tabCategory: string) => void;
}> = ({ tabCategory, setTabCategory }) => {
  const history = useHistory();
  return (
    <div>
      <RowContainer>
        <Col lg={8} className='px-0'>
          <IntroText>
            We are excited that you are interested in adding a dachshund or
            dachshund-mix to your family! Here you can find a list of all dogs
            that are available for adoption. Some of our dogs are not posted to
            the website, so even if you do not find the dog you are looking for
            please feel free to submit an application and we can look for that
            perfect dog for you!
          </IntroText>
        </Col>
        <Col lg={4} className='px-0'>
          <HealthCheckListCard>
            <Text bold='bold' marginBottom='0.75rem' color='#fff'>
              When you adopt from LPDR, you are getting a dachshund who:
            </Text>
            {[
              `Has been spayed or neutered`,
              `Had a full veterinary health check and vaccinations`,
              `Has been Heartworm tested and treated if necessary`,
              `Has been microchipped`,
            ].map((text, i) => (
              <div key={i} className='d-flex align-items-end mb-1'>
                <PawPrint fill='#fff' />
                <Text fontFamily={`Duru Sans`} color='#fff' marginLeft='1rem'>
                  {text}
                </Text>
              </div>
            ))}
          </HealthCheckListCard>
        </Col>
      </RowContainer>
      <TabContainer>
        {[
          { linkText: 'Available Dachshunds', linkKey: '/available' },
          { linkText: 'Adopt A Senior', linkKey: '/available/senior' },
        ].map((tab: { linkText: string; linkKey: string }, i: number) => (
          <Tab
            key={i}
            onClick={() => {
              history.push(tab.linkKey);
              setTabCategory(tab.linkText);
            }}
            active={tab.linkText === tabCategory}
          >
            {tab.linkText}
          </Tab>
        ))}
      </TabContainer>
    </div>
  );
};

const AvailableRoutes: FC = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const [tabCategory, setTabCategory] = useState('Available Dachshunds');

  useEffect(() => {
    if (pathname === '/available/senior') {
      setTabCategory('Adopt A Senior');
    }
  }, [pathname]);
  return (
    <AvailableLayoutWithTabs
      tabs={
        <Navigation tabCategory={tabCategory} setTabCategory={setTabCategory} />
      }
    >
      <Switch>
        <Route exact path={`${path}/senior`} component={SeniorDogs} />
        <Route exact path={`${path}`} component={ListAvailableDogs} />
        <Route path={`${path}/dogs/:id`} component={DachshundScreen} />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </AvailableLayoutWithTabs>
  );
};

export default AvailableRoutes;
