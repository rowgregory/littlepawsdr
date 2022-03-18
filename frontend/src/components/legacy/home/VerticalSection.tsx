import React, { FC } from 'react';
import styled from 'styled-components';

const VContainer = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    position: relative;
    display: flex;
  }
`;
const VTitle = styled.div<{ title: string }>`
  transform: rotate(270deg);
  position: absolute;
  font-size: 2.5rem;
  color: #fff;
  font-family: 'Ubuntu', sans-serif;
  left: ${({ title }) =>
    title === 'DACHSHUNDS'
      ? '-48px'
      : title === 'THE LATEST'
      ? '-27px'
      : title === 'SHOP'
      ? '31px'
      : title === 'EVENTS'
      ? '10px'
      : ''};
  top: ${({ title }) =>
    title === 'DACHSHUNDS'
      ? '50px'
      : title === 'THE LATEST'
      ? '35px'
      : title === 'SHOP'
      ? '-27px'
      : ''};
  width: ${({ title }) => (title === 'THE LATEST' ? '219px' : '')};
`;

const VLine = styled.div`
  width: 300px;
  height: 3px;
  background: #fff;
  transform: rotate(270deg);
  position: absolute;
  top: -216px;
  left: -69px;
`;

export const VerticalSection: FC<{ title: string }> = ({ title }) => {
  return (
    <VContainer>
      <VTitle title={title}>{title}</VTitle>
      <VLine></VLine>
    </VContainer>
  );
};
