import React from 'react';
import styled from 'styled-components';
import {
  HomeLink,
  ParallaxContent,
  SectionContainer,
  SectionTitle,
} from '../../components/home/styles';

const ContentContainer = styled.div`
  background: ${({ theme }) =>
    theme.mode === 'day'
      ? 'radial-gradient(circle, hsla(40, 76%, 84%, 1) 0%, hsla(143, 29%, 65%, 1) 100%)'
      : 'radial-gradient(circle, hsla(183, 81%, 35%, 1) 0%, hsla(40, 100%, 67%, 1) 100%)'};
  position: relative;
  height: 300px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    height: 500px;
  }
`;

const Shop = () => {
  return (
    <SectionContainer>
      <SectionTitle to='/shop'>Featured Items</SectionTitle>
      <ContentContainer>
        <ParallaxContent>
          <div className='support'>
            SUPPORT
            <br /> TEAM
            <br /> DACHSHUND
          </div>
          <div className='browse'>Browse Our Products</div>
          <HomeLink to='/shop'>Shop</HomeLink>
        </ParallaxContent>
      </ContentContainer>
    </SectionContainer>
  );
};

export default Shop;
