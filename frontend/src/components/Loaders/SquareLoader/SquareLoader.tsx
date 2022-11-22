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

const SquareLoader = () => {
  return (
    <Container>
      <div className='sk-cube-grid'>
        <div className='sk-cube sk-cube-1'></div>
        <div className='sk-cube sk-cube-2'></div>
        <div className='sk-cube sk-cube-3'></div>
        <div className='sk-cube sk-cube-4'></div>
        <div className='sk-cube sk-cube-5'></div>
        <div className='sk-cube sk-cube-6'></div>
        <div className='sk-cube sk-cube-7'></div>
        <div className='sk-cube sk-cube-8'></div>
        <div className='sk-cube sk-cube-9'></div>
      </div>
    </Container>
  );
};

export default SquareLoader;
