import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import VolunteerAppHigh from '../../components/assets/volunteer-app-high.jpeg';
import VolunteerAppLow from '../../components/assets/volunteer-app-low.jpg';
import RightArrow from '../../components/svg/RightArrow';
import LeftArrow from '../../components/svg/LeftArrow';
import Hero from '../../components/Hero';
import { Container } from '../../components/styles/GridDogStyles';

const VolunteerApplicationIFrame = styled.iframe`
  border: none;
  height: 4000px;
`;

const VolunteerApplication = () => {
  return (
    <>
      <Hero
        low={VolunteerAppLow}
        high={VolunteerAppHigh}
        title='Volunteer Application'
        link='https://unsplash.com/@just_another_photographa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='James Watson'
      />
      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2='Transport Application'
            url2='/adopt/transport-application'
          />
          <RightArrow
            text='Foster Application'
            url='/volunteer/foster-application'
          />
        </div>
        <Text
          fontSize='32px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          Get Involved!
        </Text>
        <Text maxWidth='680px' className='mb-4 mx-auto' fontSize='16px'>
          Would you like to donate to Little Paws?{' '}
          <Link to='/donate'>Go to our donation page!</Link>
        </Text>
        <Text maxWidth='680px' className='mb-4 mx-auto' fontSize='16px'>
          Or would you rather give to Little Paws as you do your daily online
          shopping? Visit our{' '}
          <Link to={{ pathname: '/donate/shop-to-help' }}>Shop to Help </Link>
          page to learn more.
        </Text>
        <Text
          fontSize='32px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          Join the Little Paws Family!
        </Text>
        <Text maxWidth='680px' className='mb-4 mx-auto' fontSize='16px'>
          We are always seeking new volunteers or fosters! Visit our{' '}
          <Link to='/volunteer/foster-application'>Foster Application</Link> or
          our{' '}
          <Link to='/volunteer/volunteer-application'>
            Volunteer Application
          </Link>{' '}
          page below.
        </Text>
        <Text
          fontSize='32px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          Are you crafty?
        </Text>
        <Text maxWidth='680px' className='mb-4 mx-auto' fontSize='16px'>
          We need your help! We are also looking for artists and crafters for
          our <Link to='/events'>upcoming auctions and events</Link>.
        </Text>
        <Text maxWidth='680px' className='mb-4 mx-auto' fontSize='16px'>
          Thank you for applying to volunteer with Little Paws Dachshund Rescue
          (LPDR)!
        </Text>
        <Text maxWidth='680px' className='mb-4 mx-auto' fontSize='16px'>
          This application will take 15 - 30 minutes to complete.
        </Text>
        <Text maxWidth='680px' className='mb-4 mx-auto' fontSize='16px'>
          We look forward to having you join our team. We rely on our volunteers
          to accomplish our mission of helping unwanted and abandoned animals
          find new homes, and we sincerely thank you for helping us to achieve
          that goal.
        </Text>
        <Text maxWidth='680px' className='mx-auto'>
          <VolunteerApplicationIFrame
            title='Volunteer-Application'
            width='100%'
            src='https://toolkit.rescuegroups.org/of/f?c=FPGYBJHM'
          ></VolunteerApplicationIFrame>
        </Text>
      </Container>
    </>
  );
};

export default VolunteerApplication;
