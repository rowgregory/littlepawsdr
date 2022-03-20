import React from 'react';
import Mission from '../components/home/Mission';
import Banner from '../components/home/Banner';
import OurLovablePals from '../components/home/OurLovablePals';
import Shop from '../components/home/Shop';
import Events from '../components/home/Events';
import Blog from '../components/home/Blog';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 1836px;
  margin: 84px auto;
  width: 100%;
`;

const Home = () => {
  return (
    <>
      <Banner />
      <HomeContainer>
        <OurLovablePals />
        <Blog />
        <Mission />
        <Events />
        <Shop />
      </HomeContainer>
    </>
  );
};

export default Home;
