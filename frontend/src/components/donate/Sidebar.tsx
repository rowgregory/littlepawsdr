import React from 'react';
import SponsorGift from '../../components/svg/SponsorGift';
import styled from 'styled-components';
import { Text } from '../styles/Styles';
import { Link } from 'react-router-dom';

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
        {
          linkText: 'Long Dog',
          linkKey: '/donate/long-dog',
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

export default SideBar;
