import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ListAvailableDogs from './ListAvailableDogs';
import DachshundScreen, { PawPrint } from './DachshundScreen';
import PageNotFound from '../../components/common/PageNotFound';
import SeniorDogs from './SeniorDogs';
import styled from 'styled-components';
import {
  IntroText,
  Jumbo,
  JumboAndWaveContainer,
  Text,
  Title,
  TitleAndIntroTextContainer,
} from '../../components/styles/Styles';
import GenericPageLayout from '../../components/GenericPageLayout';

const HealthCheckListCard = styled.div`
  background: ${({ theme }) => theme.colors.senary};
  padding: 1rem;
  border-radius: 0.75rem;
  font-family: 'Duru Sans';
  height: fit-content;
`;

const Wave1 = () => (
  <svg
    viewBox='0 0 1440 120'
    xmlns='http://www.w3.org/2000/svg'
    style={{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      zIndex: 20,
    }}
  >
    <defs>
      <linearGradient id='sw-gradient-0' x1='0' x2='0' y1='1' y2='0'>
        <stop stopColor='rgba(34, 194, 183, 1)' offset='0%' />
        <stop stopColor='rgba(34, 194, 183, 1)' offset='100%' />
      </linearGradient>
    </defs>
    <path
      fill='url(#sw-gradient-0)'
      fillOpacity='0.5'
      d='M0,96L17.1,94C34.3,92,69,88,103,74C137.1,60,171,36,206,40C240,44,274,76,309,88C342.9,100,377,92,411,84C445.7,76,480,68,514,70C548.6,72,583,84,617,92C651.4,100,686,104,720,92C754.3,80,789,52,823,50C857.1,48,891,72,926,84C960,96,994,96,1029,88C1062.9,80,1097,64,1131,48C1165.7,32,1200,16,1234,12C1268.6,8,1303,16,1337,24C1371.4,32,1406,40,1440,38C1474.3,36,1509,24,1543,20C1577.1,16,1611,20,1646,30C1680,40,1714,56,1749,54C1782.9,52,1817,32,1851,24C1885.7,16,1920,20,1954,30C1988.6,40,2023,56,2057,64C2091.4,72,2126,72,2160,62C2194.3,52,2229,32,2263,28C2297.1,24,2331,36,2366,48C2400,60,2434,72,2451,78L2468.6,84L2468.6,120L2451.4,120C2434.3,120,2400,120,2366,120C2331.4,120,2297,120,2263,120C2228.6,120,2194,120,2160,120C2125.7,120,2091,120,2057,120C2022.9,120,1989,120,1954,120C1920,120,1886,120,1851,120C1817.1,120,1783,120,1749,120C1714.3,120,1680,120,1646,120C1611.4,120,1577,120,1543,120C1508.6,120,1474,120,1440,120C1405.7,120,1371,120,1337,120C1302.9,120,1269,120,1234,120C1200,120,1166,120,1131,120C1097.1,120,1063,120,1029,120C994.3,120,960,120,926,120C891.4,120,857,120,823,120C788.6,120,754,120,720,120C685.7,120,651,120,617,120C582.9,120,549,120,514,120C480,120,446,120,411,120C377.1,120,343,120,309,120C274.3,120,240,120,206,120C171.4,120,137,120,103,120C68.6,120,34,120,17,120L0,120Z'
    />
  </svg>
);
const Wave2 = () => (
  <svg
    viewBox='0 0 1440 120'
    xmlns='http://www.w3.org/2000/svg'
    style={{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      zIndex: 20,
    }}
  >
    <defs>
      <linearGradient id='sw-gradient-1' x1='0' x2='0' y1='1' y2='0'>
        <stop stopColor='rgba(34, 194, 183, 1)' offset='0%' />
        <stop stopColor='rgba(34, 194, 183, 1)' offset='100%' />
      </linearGradient>
    </defs>
    <path
      fill='url(#sw-gradient-1)'
      fillOpacity='0.2'
      d='M0,96L17.1,82C34.3,68,69,40,103,40C137.1,40,171,68,206,82C240,96,274,96,309,92C342.9,88,377,80,411,66C445.7,52,480,32,514,34C548.6,36,583,60,617,58C651.4,56,686,28,720,32C754.3,36,789,72,823,80C857.1,88,891,68,926,56C960,44,994,40,1029,42C1062.9,44,1097,52,1131,58C1165.7,64,1200,68,1234,62C1268.6,56,1303,40,1337,28C1371.4,16,1406,8,1440,14C1474.3,20,1509,40,1543,46C1577.1,52,1611,44,1646,48C1680,52,1714,68,1749,68C1782.9,68,1817,52,1851,54C1885.7,56,1920,76,1954,74C1988.6,72,2023,48,2057,42C2091.4,36,2126,48,2160,52C2194.3,56,2229,52,2263,48C2297.1,44,2331,40,2366,50C2400,60,2434,84,2451,96L2468.6,108L2468.6,120L2451.4,120C2434.3,120,2400,120,2366,120C2331.4,120,2297,120,2263,120C2228.6,120,2194,120,2160,120C2125.7,120,2091,120,2057,120C2022.9,120,1989,120,1954,120C1920,120,1886,120,1851,120C1817.1,120,1783,120,1749,120C1714.3,120,1680,120,1646,120C1611.4,120,1577,120,1543,120C1508.6,120,1474,120,1440,120C1405.7,120,1371,120,1337,120C1302.9,120,1269,120,1234,120C1200,120,1166,120,1131,120C1097.1,120,1063,120,1029,120C994.3,120,960,120,926,120C891.4,120,857,120,823,120C788.6,120,754,120,720,120C685.7,120,651,120,617,120C582.9,120,549,120,514,120C480,120,446,120,411,120C377.1,120,343,120,309,120C274.3,120,240,120,206,120C171.4,120,137,120,103,120C68.6,120,34,120,17,120L0,120Z'
    />
  </svg>
);

const Navigation = () => {
  return (
    <div>
      <JumboAndWaveContainer>
        <Jumbo>
          <TitleAndIntroTextContainer>
            <Title>Adoptable Dachshunds</Title>
            <IntroText>
              We are excited that you are interested in adding a dachshund or
              dachshund-mix to your family! Here you can find a list of all dogs
              that are available for adoption. Some of our dogs are not posted
              to the website, so even if you do not find the dog you are looking
              for please feel free to submit an application and we can look for
              that perfect dog for you!
            </IntroText>
          </TitleAndIntroTextContainer>
          <HealthCheckListCard>
            <Text
              fontWeight='bold'
              marginBottom='0.7rem'
              color='#fff'
              fontFamily='Duru Sans'
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
                <Text fontFamily='Duru Sans' color='#fff' marginLeft='1rem'>
                  {text}
                </Text>
              </div>
            ))}
          </HealthCheckListCard>
        </Jumbo>
        <Wave1 />
        <Wave2 />
      </JumboAndWaveContainer>
    </div>
  );
};

const AvailableRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <GenericPageLayout jumbotron={<Navigation />}>
      <Switch>
        <Route exact path={`${path}/senior`} component={SeniorDogs} />
        <Route exact path={`${path}`} component={ListAvailableDogs} />
        <Route path={`${path}/dogs/:id`} component={DachshundScreen} />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </GenericPageLayout>
  );
};

export default AvailableRoutes;
