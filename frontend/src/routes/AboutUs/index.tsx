import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ContactUs from './ContactUs';
import Education from './Education';
import WhoWeAre from './TeamMembers';
import DachshundDetails from './DachshundDetails';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
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

const Path = styled.path<{ fill?: string }>`
  fill: ${({ theme, fill }) => (fill ? fill : theme.colors.secondary)};
  stroke: none;
`;

const PawPrint: FC<{ fill?: string }> = ({ fill }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='25px'
      height='25px'
      viewBox='0 0 595.276 841.89'
      fillRule='evenodd'
    >
      <g transform='translate(269.81467,-650.62904)'>
        <Path
          fill={fill}
          d='m -126.267,1038.85 c 22.737,50.44 15.792,102.75 -15.51,116.87 -31.303,14.12 -75.11,-15.31 -97.845,-65.74 -22.737,-50.43 -15.793,-102.745 15.51,-116.863 31.303,-14.114 75.108,15.317 97.845,65.733 z'
        />
        <Path
          fill={fill}
          d='m 183.155,1038.85 c -22.738,50.44 -15.793,102.75 15.512,116.87 31.303,14.12 75.106,-15.31 97.846,-65.74 22.734,-50.43 15.789,-102.745 -15.513,-116.863 -31.301,-14.114 -75.108,15.317 -97.845,65.733 z'
        />
        <Path
          fill={fill}
          d='m 6.7856,937.757 c 11.6548,54.069 -6.1108,103.763 -39.6787,111.003 -33.5654,7.23 -70.2249,-30.74 -81.8779,-84.804 -11.653,-54.068 6.112,-103.764 39.6792,-110.997 33.5669,-7.236 70.2246,30.729 81.8774,84.798 z'
        />
        <Path
          fill={fill}
          d='m 49.2676,937.803 c -11.6446,54.068 6.1084,103.767 39.6738,110.997 33.5676,7.24 70.2256,-30.73 81.8776,-84.797 11.654,-54.069 -6.109,-103.765 -39.678,-110.998 -33.5678,-7.234 -70.225,30.729 -81.8734,84.798 z'
        />
        <Path
          fill={fill}
          d='m -35.2275,1118.5 c -8.1924,14.15 -46.1563,60.99 -72.4145,76.97 -26.256,15.98 -58.792,39.38 -53.332,93.11 5.457,53.74 60.575,76.74 96.8597,74.7 36.2867,-2.03 104.6993,-8.71 153.543,-1.94 48.8413,6.77 110.4863,1.64 124.9223,-49.81 14.436,-51.45 -17.85,-84.23 -43.044,-102.83 -25.193,-18.59 -67.265,-74.2 -80.2269,-99.73 -12.96,-25.52 -78.9268,-72.26 -126.3076,9.53 z'
        />
      </g>
    </svg>
  );
};

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
      <Route exact path={`${path}/blog`} component={Blog} />
      <Route path={`${path}/blog/:id`} component={BlogDetails} />
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default AboutUsRoutes;
