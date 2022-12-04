import React from 'react';
import { Text } from '../../components/styles/Styles';
import DonationForm from './DonationForm';
import ShopToHelp from '../../components/donate/ShopToHelp';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import FeedAFoster from '../../components/donate/FeedAFoster';
import PageNotFound from '../../components/common/PageNotFound';
import DonateLayoutWithSideBar from '../../components/layouts/DonateLayoutWithSideBar';
import styled from 'styled-components';
import DonateDog from '../../components/assets/donate_dog02.jpeg';
import { Image } from 'react-bootstrap';
import SponsorGift from '../../components/svg/SponsorGift';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';

const DonateLink = styled(Link)`
  font-size: 16px;
  text-align: center;
`;
const SideBarContainer = styled.div`
  padding: 16px;
`;

const SideBar = () => {
  return (
    <SideBarContainer className='d-flex flex-column'>
      <SponsorGift />
      <Text
        fontSize='32px'
        fontWeight={400}
        marginTop='32px'
        marginBottom='48px'
      >
        Other ways to donate
      </Text>
      {[
        {
          linkText: 'Donate One-Time/Monthly',
          linkKey: '/donate',
        },
        {
          linkText: 'E-Card',
          linkKey: '/e-cards',
        },
        {
          linkText: 'Venmo',
          linkKey: '/donate/venmo',
        },
        {
          linkText: 'Check',
          linkKey: '/donate/check',
        },
        {
          linkText: 'Shop To Help',
          linkKey: '/donate/shop-to-help',
        },
      ].map((obj: any, i: number) => (
        <DonateLink
          to={obj.linkKey}
          key={i}
          className='mb-3'
          onClick={() => window.scrollTo(0, 600)}
        >
          {obj.linkText}
        </DonateLink>
      ))}
    </SideBarContainer>
  );
};

const Venmo = () => (
  <Text p='96px 0' fontSize='48px' fontWeight={400} textAlign='center'>
    Venmo @littlepawsdr
  </Text>
);
const Check = () => (
  <Text p='96px 0' fontSize='48px' fontWeight={400} textAlign='center'>
    Little Paws Dachshund Rescue
    <br />
    P.O. Box 232
    <br />
    College Park, MD 20741
    <br />
  </Text>
);

const DonateRoutes = ({ location }: any) => {
  const { path } = useRouteMatch();
  return (
    <DonateLayoutWithSideBar
      jumbotron={
        <>
          <div style={{ position: 'relative', marginTop: '75px' }}>
            <Image
              src={DonateDog}
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
              Donate
            </Text>
            <Text
              onClick={() =>
                window.open(
                  'https://unsplash.com/@alonsoreyes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
                  '_blank'
                )
              }
              fontWeight={500}
              fontSize='10px'
              color='#fff'
              cursor='pointer'
              style={{
                mixBlendMode: 'difference',
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                zIndex: 2,
              }}
            >
              Photo by Alonso Reyes
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
                text2={
                  location?.pathname === '/donate/shop-to-help'
                    ? 'Ecards'
                    : location?.pathname === '/donate/venmo'
                    ? 'Shop To Help'
                    : location?.pathname === '/donate/check'
                    ? 'Venmo'
                    : 'Rainbow Bridge'
                }
                url2={
                  location?.pathname === '/donate/shop-to-help'
                    ? '/e-cards'
                    : location?.pathname === '/donate/venmo'
                    ? '/donate/shop-to-help'
                    : location?.pathname === '/donate/check'
                    ? '/donate/venmo'
                    : '/about/rainbow-bridge'
                }
              />
              <RightArrow
                text={
                  location?.pathname === '/donate/shop-to-help'
                    ? 'Venmo'
                    : location?.pathname === '/donate/venmo'
                    ? 'Check'
                    : location?.pathname === '/donate/check'
                    ? 'Adoption Application'
                    : 'Ecards'
                }
                url={
                  location?.pathname === '/donate/shop-to-help'
                    ? '/donate/venmo'
                    : location?.pathname === '/donate/venmo'
                    ? '/donate/check'
                    : location?.pathname === '/donate/check'
                    ? '/adopt/application'
                    : '/e-cards'
                }
              />
            </div>
            <Text
              fontSize='32px'
              marginTop='56px'
              fontWeight={400}
              className='d-flex justify-content-center'
            >
              Interested in supporting Little Paws Dachshund Rescue?
            </Text>
            <Text
              maxWidth='680px'
              className='mb-3 mt-4 mx-auto'
              fontSize='18px'
            >
              Right now, we are in need of monetary donations. Happy endings for
              our dachshunds in need can only happen with your support. Please
              allow us to continue to say “YES WE CAN” to those calls asking for
              assistance with a dachshund left behind at an animal shelter, or a
              dog who has been neglected and abused and deserves a warm bed and
              a kind hand to rub his or her tummy.
            </Text>
            <Text
              maxWidth='680px'
              className='mb-3 mt-4 mx-auto'
              fontSize='18px'
            >
              There are two easy ways to give monetary donations, electronically
              or check*:
            </Text>
            <Text
              maxWidth='680px'
              className='mb-3 mt-4 mx-auto'
              fontSize='18px'
            >
              *Little Paws Dachshund Rescue is federal tax exemption 501(c)(3)
              public charity.
            </Text>
          </div>
        </>
      }
      sideBar={<SideBar />}
    >
      <Switch>
        <Route exact path={path} component={DonationForm} />
        <Route path={`${path}/feed-a-foster`} component={FeedAFoster} />
        <Route path={`${path}/shop-to-help`} component={ShopToHelp} />
        <Route path={`${path}/venmo`} component={Venmo} />
        <Route path={`${path}/check`} component={Check} />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </DonateLayoutWithSideBar>
  );
};

export default DonateRoutes;
