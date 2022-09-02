import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { Text } from '../../components/styles/Styles';

const VolunteerApplicationIFrame = styled.iframe`
  border: none;
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation: landscape) {
    min-height: 3800px;
  }
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation: portrait) {
    min-height: 3800px;
  }
  @media only screen and (min-width: 760px) {
    height: 3500px;
  }
  @media only screen and (max-width: 759px) {
    height: 3600px;
  }
  @media only screen and (max-width: 480px) {
    height: 3900px;
  }
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints[3]};
  width: 100%;
`;

const VolunteerApplication = () => {
  const theme = useTheme() as any;
  const isDay = theme.mode === 'day';
  return (
    <Container>
      <Text fontSize='2rem' marginBottom='1rem'>
        Volunteer Application
      </Text>
      <Text fontSize='1.5rem'>Get Involved!</Text>
      <Text marginBottom='1.5rem'>
        Would you like to donate to Little Paws?{' '}
        <Link to='/donate'>Go to our donation page!</Link> Or would you rather
        give to Little Paws as you do your daily online shopping?{' '}
        <Link to={{ pathname: '/donate', search: `?Shop to Help` }}>
          Visit our Shop to Help page to learn more.
        </Link>
      </Text>
      <Text fontSize='1.5rem'>Join the Little Paws Family!</Text>
      <Text>
        We are always seeking new volunteers or fosters! Visit our{' '}
        <Link to='/volunteer/foster-application'>Foster Application</Link> or
        our{' '}
        <Link to='/volunteer/volunteer-application'>Volunteer Application</Link>{' '}
        page below.
      </Text>
      <Text>
        Are you crafty? We need your help! We are also looking for artists and
        crafters both for our{' '}
        <Link to='/events'>upcoming auctions and events</Link> along with our{' '}
        <Link to='/donate'>ETSY store</Link>.
      </Text>
      <Text marginBottom='1rem'>
        Thank you for applying to volunteer with Little Paws Dachshund Rescue
        (LPDR)!
      </Text>
      <Text>This application will take 15 - 30 minutes to complete.</Text>
      <Text>
        We look forward to having you join our team. We rely on our volunteers
        to accomplish our mission of helping unwanted and abandoned animals find
        new homes, and we sincerely thank you for helping us to achieve that
        goal.
      </Text>
      <Text>Little Paws Dachshund Rescue Board of Directors</Text>

      {isDay ? (
        <VolunteerApplicationIFrame
          title='Volunteer-Application'
          width='100%'
          scrolling='no'
          src='https://toolkit.rescuegroups.org/of/f?c=FPGYBJHM'
        ></VolunteerApplicationIFrame>
      ) : (
        <VolunteerApplicationIFrame
          title='Volunteer-Application'
          width='100%'
          height='7000px'
          scrolling='no'
          src='https://toolkit.rescuegroups.org/of/f?c=WCVGSBQJ'
        ></VolunteerApplicationIFrame>
      )}
    </Container>
  );
};

export default VolunteerApplication;
