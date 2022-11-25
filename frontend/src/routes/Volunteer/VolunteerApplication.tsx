import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { Text } from '../../components/styles/Styles';
import VolunteerDog from '../../components/assets/volunteer_app_dog02.jpeg';
import RightArrow from '../../components/svg/RightArrow';
import LeftArrow from '../../components/svg/LeftArrow';

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

const VolunteerApplication = () => {
  const theme = useTheme() as any;
  const isDay = theme.mode === 'day';
  return (
    <>
      <div style={{ position: 'relative' }}>
        <Image
          src={VolunteerDog}
          width='100%'
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Text
          fontWeight={500}
          fontSize='48px'
          color='#fff'
          style={{
            position: 'absolute',
            top: '200px',
            left: '50px',
            zIndex: 2,
          }}
        >
          Volunteer Application
        </Text>
        <Text
          onClick={() =>
            window.open(
              'https://unsplash.com/@just_another_photographa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
              '_blank'
            )
          }
          fontWeight={500}
          fontSize='10px'
          color='#fff'
          cursor='pointer'
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 2,
          }}
        >
          Photo by James Watson
        </Text>
      </div>
      <div
        style={{
          maxWidth: '980px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '96px',
          paddingInline: '16px',
        }}
      >
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='To Home'
            url='/'
            text2='Adoption FAQ'
            url2='/adopt/faq'
          />
          <RightArrow
            text='To Foster Application'
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
        <Text marginBottom='18px' fontSize='16px'>
          Would you like to donate to Little Paws?{' '}
          <Link to='/donate'>Go to our donation page!</Link>
        </Text>
        <Text marginBottom='28px' fontSize='16px'>
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
        <Text marginBottom='18px' fontSize='16px'>
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
        <Text marginBottom='18px' fontSize='16px'>
          We need your help! We are also looking for artists and crafters both
          for our <Link to='/events'>upcoming auctions and events</Link> along
          with our <Link to='/donate'>ETSY store</Link>.
        </Text>
        <Text marginBottom='18px' fontSize='16px'>
          Thank you for applying to volunteer with Little Paws Dachshund Rescue
          (LPDR)!
        </Text>
        <Text marginBottom='18px' fontSize='16px'>
          This application will take 15 - 30 minutes to complete.
        </Text>
        <Text marginBottom='18px' fontSize='16px'>
          We look forward to having you join our team. We rely on our volunteers
          to accomplish our mission of helping unwanted and abandoned animals
          find new homes, and we sincerely thank you for helping us to achieve
          that goal.
        </Text>
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
      </div>
    </>
  );
};

export default VolunteerApplication;
