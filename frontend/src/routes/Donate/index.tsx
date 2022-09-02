import React from 'react';
import { Text } from '../../components/styles/Styles';
import DonationForm from './DonationForm';
import ECardForm from './ECardForm';
import ShopToHelp from '../../components/donate/ShopToHelp';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import FeedAFoster from '../../components/donate/FeedAFoster';
import PageNotFound from '../../components/common/PageNotFound';
import DonateLayoutWithSideBar from '../../components/layouts/DonateLayoutWithSideBar';
import styled from 'styled-components';

const DonateLink = styled(Link)`
  font-family: Oswald !important;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
`;
const SideBarContainer = styled.div`
  padding: 1rem;
`;

const Navigation = () => (
  <>
    <Text fontSize='2rem' marginBottom='1rem'>
      Interested in supporting Little Paws Dachshund Rescue?
    </Text>
    <Text className='mb-3'>
      Right now, we are in need of monetary donations. Happy endings for our
      dachshunds in need can only happen with your support. Please allow us to
      continue to say “YES WE CAN” to those calls asking for assistance with a
      dachshund left behind at an animal shelter, or a dog who has been
      neglected and abused and deserves a warm bed and a kind hand to rub his or
      her tummy.
    </Text>
    <Text className='mb-3'>
      There are two easy ways to give monetary donations, electronically or
      check*:
    </Text>
    <Text className='mb-3'>
      *Little Paws Dachshund Rescue is federal tax exemption 501(c)(3) public
      charity.
    </Text>
  </>
);

const SideBar = () => {
  return (
    <SideBarContainer className='d-flex flex-column'>
      {[
        {
          linkText: 'Donate One-Time/Monthly',
          linkKey: '/donate',
        },
        {
          linkText: 'E-Card',
          linkKey: '/donate/e-card',
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
        <DonateLink to={obj.linkKey} key={i} className='mb-3'>
          {obj.linkText}
        </DonateLink>
      ))}
    </SideBarContainer>
  );
};

const Venmo = () => <Text fontSize='2rem'>Venmo @littlepawsdr</Text>;
const Check = () => (
  <Text fontSize='2rem'>
    Little Paws Dachshund Rescue
    <br />
    P.O. Box 232
    <br />
    College Park, MD 20741
    <br />
  </Text>
);

const DonateRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <DonateLayoutWithSideBar jumbotron={<Navigation />} sideBar={<SideBar />}>
      <Switch>
        <Route exact path={path} component={DonationForm} />
        <Route path={`${path}/e-card`} component={ECardForm} />
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
