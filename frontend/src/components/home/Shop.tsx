import React from 'react';
import { Parallax } from 'react-parallax';
import {
  HomeLink,
  ParallaxContent,
  SectionContainer,
  SectionTitle,
} from '../../components/home/styles';
import SBG from '../../components/assets/collage-bg-3.png';

const Shop = () => {
  return (
    <SectionContainer>
      <SectionTitle to='/shop'>Featured Items</SectionTitle>
      <Parallax bgImage={SBG} strength={600}>
        <div style={{ height: 650 }}>
          <ParallaxContent>
            <div className='support'>
              SUPPORT
              <br /> TEAM
              <br /> DACHSHUND
            </div>
            <div className='browse'>Browse Our Products</div>
            <HomeLink to='/shop'>Shop</HomeLink>
          </ParallaxContent>
        </div>
      </Parallax>
    </SectionContainer>
  );
};

export default Shop;
