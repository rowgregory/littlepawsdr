import { FC, useEffect, useState } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  Link,
} from 'react-router-dom';
import GenericPageLayout from '../../components/GenericPageLayout';
import {
  IntroText,
  Jumbo,
  JumboAndWaveContainer,
  Title,
  TitleAndIntroTextContainer,
} from '../../components/styles/Styles';
import FosterApplication from './FosterApplication';
import VolunteerApplication from './VolunteerApplication';

const Navigation = () => (
  <JumboAndWaveContainer>
    <Jumbo>
      <TitleAndIntroTextContainer>
        <Title>What Can I Do?</Title>
        <IntroText style={{ fontSize: '1.5rem' }}>Get Involved!</IntroText>
        <IntroText>
          Would you like to donate to Little Paws?{' '}
          <Link to='/donate'>Go to our donation page!</Link> Or would you rather
          give to Little Paws as you do your daily online shopping?{' '}
          <Link to={{ pathname: '/donate', search: `?Shop to Help` }}>
            Visit our Shop to Help page to learn more.
          </Link>
        </IntroText>
        <IntroText style={{ fontSize: '1.5rem' }}>
          Join the Little Paws Family!
        </IntroText>
        <IntroText>
          We are always seeking new volunteers or fosters! Visit our{' '}
          <Link to='/volunteer/foster-application'>Foster Application</Link> or
          our{' '}
          <Link to='/volunteer/volunteer-application'>
            Volunteer Application
          </Link>{' '}
          page below.
        </IntroText>
        <IntroText>
          Are you crafty? We need your help! We are also looking for artists and
          crafters both for our{' '}
          <Link to='/events'>upcoming auctions and events</Link> along with our{' '}
          <Link to='/donate'>ETSY store</Link>.
        </IntroText>
      </TitleAndIntroTextContainer>
    </Jumbo>
  </JumboAndWaveContainer>
);

const VolunteerRoutes: FC = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const currentRoute = pathname.split('/')[2];
  const [tabCategory, setTabCategory] = useState('Volunteer Application');

  useEffect(() => {
    setTabCategory(currentRoute);
  }, [currentRoute, tabCategory]);

  return (
    <GenericPageLayout jumbotron={<Navigation />}>
      <Switch>
        <Route
          exact
          path={`${path}/volunteer-application`}
          component={VolunteerApplication}
        />
        <Route
          path={`${path}/foster-application`}
          component={FosterApplication}
        />
      </Switch>
    </GenericPageLayout>
  );
};

export default VolunteerRoutes;
