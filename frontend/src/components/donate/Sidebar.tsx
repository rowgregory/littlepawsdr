import React from 'react';
import SponsorGift from '../../components/svg/SponsorGift';
import styled from 'styled-components';
import { Text } from '../styles/Styles';
import { Link } from 'react-router-dom';
import AquaTile from '../../components/assets/aqua_tile.jpg';

const DonateLink = styled(Link)`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 16px;
  transition: 300ms;
  color: ${({ theme }) => theme.colors.secondary};
  :hover {
    text-decoration: none;
    background: url(${AquaTile});
    background-repeat: repeat;
    color: #fff;
  }
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
          linkText: 'Donate',
          linkKey: '/donate',
        },
        {
          linkText: 'Ecards',
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
        {
          linkText: 'Feed A Foster',
          linkKey: '/donate/feed-a-foster',
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
