import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Text } from '../components/styles/Styles';
import { DonateLayoutWithNav } from '../components/donate/DonateLayoutWithNav';
import { TabContainer, Tab } from './Adopt/Adoption';
import DonationForm from '../components/donate/DonationForm';
import ECardForm from '../components/donate/ECardForm';
import ShopToHelp from '../components/donate/ShopToHelp';
import { useLocation } from 'react-router-dom';
import FeedAFoster from '../components/donate/FeedAFoster';

const Container = styled.div`
  margin: 0 48px;
`;

const Navigation: FC<{
  tabCategory: string;
  setTabCategory: (tabCategory: string) => void;
}> = ({ tabCategory, setTabCategory }) => (
  <Container className='d-flex flex-column'>
    <Text
      fontFamily={`Ubuntu, sans-serif`}
      fontWeight='bold'
      marginBottom='0.5rem'
      fontSize='1.5rem'
    >
      Interested in supporting Little Paws Dachshund Rescue?
    </Text>
    <Text fontFamily={`Ubuntu, sans-serif`} marginBottom='1rem'>
      Right now, we are in need of monetary donations. Happy endings for our
      dachshunds in need can only happen with your support. Please allow us to
      continue to say “YES WE CAN” to those calls asking for assistance with a
      dachshund left behind at an animal shelter, or a dog who has been
      neglected and abused and deserves a warm bed and a kind hand to rub his or
      her tummy.
    </Text>
    <Text fontFamily={`Ubuntu, sans-serif`} marginBottom='1rem'>
      There are two easy ways to give monetary donations, electronically or
      check*:
    </Text>
    <Text fontFamily={`Ubuntu, sans-serif`} marginBottom='1rem'>
      *Little Paws Dachshund Rescue is federal tax exemption 501(c)(3) public
      charity.
    </Text>
    <TabContainer>
      {[
        'Feed A Foster',
        'Recurring',
        'One-Time',
        'E-Card',
        'By Check',
        'Venmo',
        'Shop to Help',
      ].map((tab: string, i: number) => (
        <Tab
          key={i}
          onClick={() => setTabCategory(tab)}
          active={tab === tabCategory}
        >
          {tab}
        </Tab>
      ))}
    </TabContainer>
  </Container>
);

const Donate = () => {
  const { search } = useLocation() as any;
  const searchQuery = search.split('?')[1];
  const [tabCategory, setTabCategory] = useState(searchQuery ?? 'Recurring');

  return (
    <DonateLayoutWithNav
      nav={
        <Navigation tabCategory={tabCategory} setTabCategory={setTabCategory} />
      }
    >
      <Container>
        {['Recurring', 'One-Time'].includes(tabCategory) && (
          <DonationForm tab={tabCategory} />
        )}
        {tabCategory === 'E-Card' && <ECardForm />}
        {tabCategory === 'Feed A Foster' && <FeedAFoster />}
        {tabCategory === 'By Check' && (
          <Text fontFamily={`Ubunutu, sans-serif`}>
            Little Paws Dachshund Rescue
            <br />
            P.O. Box 232
            <br />
            College Park, MD 20741
            <br />
          </Text>
        )}
        {tabCategory === 'Venmo' && (
          <Text fontFamily={`Ubuntu, sans-serif`} fontSize='2.5rem'>
            Venmo @littlepawsdr
          </Text>
        )}
        {tabCategory === 'Shop to Help' && <ShopToHelp />}
      </Container>
    </DonateLayoutWithNav>
  );
};

export default Donate;
