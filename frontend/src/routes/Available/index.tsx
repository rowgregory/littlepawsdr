import { FC, ReactNode, useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import ListAvailableDogs from './ListAvailableDogs';
import DachshundScreen, { PawPrint } from './DachshundScreen';
import PageNotFound from '../../components/common/PageNotFound';
import SeniorDogs from './SeniorDogs';
import { PageLayout } from '../../components/styles/Styles';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import { TabContainer, Tab } from '../Adopt/Adoption';
import { Row, Col } from 'react-bootstrap';

interface AvailableLayoutWithTabsProps {
  tabs: ReactNode;
  children: ReactNode;
}

const Container = styled(Row)`
  margin: 0 48px;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 0.75fr;
  }
`;

const Main = styled.main`
  width: 100%;
`;

const Section = styled.section`
  display: flex;
`;

const HealthCheckListCard = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  margin-top: 1rem;
  padding: 1.25rem;
  margin-bottom: 3rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    margin-bottom: 2rem;
    margin-top: 0;
  }
`;

const AvailableLayoutWithTabs: FC<AvailableLayoutWithTabsProps> = ({
  tabs,
  children,
}) => {
  return (
    <PageLayout>
      <Section>{tabs}</Section>
      <Main>{children}</Main>
    </PageLayout>
  );
};

const Column = styled(Col)`
  padding: 0 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    padding: 0;
  }
`;

const Navigation: FC<{
  tabCategory: string;
  setTabCategory: (tabCategory: string) => void;
}> = ({ tabCategory, setTabCategory }) => {
  const history = useHistory();
  return (
    <div className='d-flex flex-column'>
      <Container>
        <Column>
          <Text
            fontFamily='Duru Sans'
            fontSize='1.15rem'
            marginBottom='1rem'
            textIndent='1rem'
          >
            We are excited that you are interested in adding a dachshund or
            dachshund-mix to your family! Here you can find a list of all dogs
            that are available for adoption. Some of our dogs are not posted to
            the website, so even if you do not find the dog you are looking for
            please feel free to submit an application and we can look for that
            perfect dog for you!
          </Text>
        </Column>
        <Column>
          <HealthCheckListCard>
            <Text
              fontSize='1.5rem'
              bold='bold'
              marginBottom='0.75rem'
              color='#fff'
            >
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
        </Column>
      </Container>
      <Container className='d-flex flex-column'>
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
      </Container>
    </div>
  );
};

const AvailableRoutes: FC = () => {
  const { path } = useRouteMatch();
  const [tabCategory, setTabCategory] = useState('Available Dachshunds');
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
