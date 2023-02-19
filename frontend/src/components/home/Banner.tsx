import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../components/styles/Styles';
import ReactPlayer from 'react-player/lazy';
import Video from '../../components/videos/landing-high.mp4';
import {
  Container,
  QuickOptionContainerDesktop,
  QuickOptionContainerMobile,
  Wave,
} from './styles';

const quickOptionArrData = () => [
  {
    linkKey: '/available',

    mb: '0.4rem',
    fontSize_1: '0.75rem',
    fontWeight: 'bold',
    textKey_1: 'CHECK OUT OUR LATEST PUPS',
    fontSize_2: '2rem',
    textKey_2: 'Dachshunds',
  },
  {
    linkKey: '/about/sanctuary',

    mb: '0.4rem',
    fontSize_1: '0.75rem',
    fontWeight: 'bold',
    textKey_1: 'GIVE HELP TO THOSE IN NEED',
    fontSize_2: '2rem',
    textKey_2: 'Sanctuary',
  },
  {
    linkKey: '/volunteer/volunteer-application',

    mb: '0.4rem',
    fontSize_1: '0.75rem',
    fontWeight: 'bold',
    textKey_1: 'BECOME PART OF LITTLE PAWS',
    fontSize_2: '2rem',
    textKey_2: 'Volunteer',
  },
];

const Banner = () => {
  return (
    <>
      <Container>
        <ReactPlayer
          style={{ position: 'absolute', top: 0, left: 0 }}
          url={Video}
          playsinline
          controls={false}
          playing={true}
          volume={5}
          muted={true}
          loop={true}
          width='100%'
          height='100%'
          config={{
            file: {
              attributes: {
                style: { width: '100%', height: '100%', objectFit: 'cover' },
              },
            },
          }}
        />
        <QuickOptionContainerDesktop>
          {quickOptionArrData().map((obj: any, i: number) => (
            <Link to={obj.linkKey} key={i}>
              <Text
                marginBottom={obj.mb}
                fontSize={obj.fontSize_1}
                fontWeight={obj.fontWeight}
              >
                {obj.textKey_1}
              </Text>
              <Text color={obj.color} fontSize={obj.fontSize_2}>
                {obj.textKey_2}
              </Text>
            </Link>
          ))}
        </QuickOptionContainerDesktop>
      </Container>
      <QuickOptionContainerMobile>
        {quickOptionArrData().map((obj: any, i: number) => (
          <Link to={obj.linkKey} key={i}>
            <Text
              marginBottom={obj.mb}
              fontSize={obj.fontSize_1}
              fontWeight={obj.fontWeight}
            >
              {obj.textKey_1}
            </Text>
            <Text color={obj.color} fontSize={obj.fontSize_2}>
              {obj.textKey_2}
            </Text>
          </Link>
        ))}
      </QuickOptionContainerMobile>
      <Wave
        xmlns='http://www.w3.org/2000/svg'
        width='390'
        height='35'
        viewBox='0 0 390 35'
      >
        <path
          fill='none'
          stroke='#fff'
          strokeWidth='3'
          d='M365 23c-10.094 0-13.036 10-26.071 10-13.036 0-13.036-10-26.072-10s-13.036 10-26.071 10c-13.036 0-13.036-10-26.072-10-13.035 0-13.035 10-26.071 10-13.036 0-13.036-10-26.072-10-13.035 0-13.035 10-26.071 10-13.036 0-13.036-10-26.071-10-13.036 0-13.036 10-26.072 10s-13.036-10-26.071-10C91.25 23 91.25 33 78.214 33 65.18 33 65.18 23 52.143 23 39.107 23 39.107 33 26.07 33 13.036 33 10 23 0 23M390 3c-10.094 0-13.036 10-26.071 10-13.036 0-13.036-10-26.072-10s-13.036 10-26.071 10C298.75 13 298.75 3 285.714 3c-13.035 0-13.035 10-26.071 10-13.036 0-13.036-10-26.072-10-13.035 0-13.035 10-26.071 10-13.036 0-13.036-10-26.071-10-13.036 0-13.036 10-26.072 10S142.321 3 129.286 3c-13.036 0-13.036 10-26.072 10C90.18 13 90.18 3 77.143 3 64.107 3 64.107 13 51.07 13 38.036 13 35 3 25 3'
        />
      </Wave>
    </>
  );
};

export default Banner;
