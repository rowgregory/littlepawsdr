import React from 'react';
import styled from 'styled-components';
import './styles.css';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
  background: rgb(0 0 0/0.25);
`;

const LoadingOrder = () => {
  return (
    <Container>
      <div className='preloader'>
        <div className='box'>
          <div className='box__inner'>
            <div className='box__back-flap'></div>
            <div className='box__right-flap'></div>
            <div className='box__front-flap'></div>
            <div className='box__left-flap'></div>
            <div className='box__front'></div>
          </div>
        </div>
        <div className='box'>
          <div className='box__inner'>
            <div className='box__back-flap'></div>
            <div className='box__right-flap'></div>
            <div className='box__front-flap'></div>
            <div className='box__left-flap'></div>
            <div className='box__front'></div>
          </div>
        </div>
        <div className='line'>
          <div className='line__inner'></div>
        </div>
        <div className='line'>
          <div className='line__inner'></div>
        </div>
        <div className='line'>
          <div className='line__inner'></div>
        </div>
        <div className='line'>
          <div className='line__inner'></div>
        </div>
        <div className='line'>
          <div className='line__inner'></div>
        </div>
        <div className='line'>
          <div className='line__inner'></div>
        </div>
        <div className='line'>
          <div className='line__inner'></div>
        </div>
      </div>
    </Container>
  );
};

export default LoadingOrder;
