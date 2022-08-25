import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PageNotFound from '../../components/common/PageNotFound';
import {
  IntroText,
  Jumbo,
  JumboAndWaveContainer,
  Title,
  TitleAndIntroTextContainer,
} from '../../components/styles/Styles';
import AdoptionApplication from './AdoptionApplication';
import AdoptionFees from './AdoptionFees';
import AdoptionInformation from './AdoptionInformation';
import AdoptionFAQ from './AdoptionFAQ';
import GenericPageLayout from '../../components/GenericPageLayout';

const Navigation = () => (
  <JumboAndWaveContainer>
    <Jumbo>
      <TitleAndIntroTextContainer>
        <Title>Adopt</Title>
        <IntroText className='mb-3'>
          Adopting is a big decision. You are taking into your home a dog that
          is intelligent, loyal, fun loving, full of love, and more than likely
          very vocal. However, owning a dachshund will bring you so much
          enjoyment, fun and fulfillment. They have this fantastic way of
          bringing joy to their families every day!
        </IntroText>
        <IntroText className='mb-3'>
          We are committed to matching our dachshunds with good, responsible and
          loving new owners. We strive to make the best match we can, setting
          each dog and adopter up for success. Our number one concern is for our
          dachshunds.
        </IntroText>
        <IntroText>
          For more information visit our{' '}
          <span>
            <u>Adoption Information</u>
          </span>
          &nbsp;page. We currently adopt to the following states: Alabama,
          Connecticut, Delaware, DC, Florida, Georgia, Kentucky, Maine,
          Maryland, Massachusetts, New Hampshire, New Jersey, North Carolina,
          Ohio, Pennsylvania, Rhode Island, South Carolina, Tennessee, Vermont,
          Virginia, West Virginia.
        </IntroText>
      </TitleAndIntroTextContainer>
    </Jumbo>
  </JumboAndWaveContainer>
);

const AdoptRoutes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <GenericPageLayout jumbotron={<Navigation />}>
      <Switch>
        <Route exact path={path} component={AdoptionApplication} />
        <Route path={`${path}/application`} component={AdoptionApplication} />
        <Route path={`${path}/info`} component={AdoptionInformation} />
        <Route path={`${path}/fees`} component={AdoptionFees} />
        <Route path={`${path}/faq`} component={AdoptionFAQ} />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </GenericPageLayout>
  );
};

export default AdoptRoutes;
