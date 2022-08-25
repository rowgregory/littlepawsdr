import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AnimatedBtn = styled(Link)`
  background: none;
  border: 2px solid;
  font: inherit;
  line-height: 1;
  padding: 1em 2em;
  color: ${({ theme }) => theme.colors.primary};
  transition: 0.25s;
  width: fit-content;
  font-family: Duru Sans;
  font-size: 1rem;
  text-decoration: none;
  :hover,
  :active {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: inset 0 -3.25em 0 0 ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`;

const FillUpBtn = ({
  linkKey,
  textKey,
}: {
  linkKey: string;
  textKey: string;
}) => (
  <AnimatedBtn to={linkKey} className='pulse'>
    {textKey}
  </AnimatedBtn>
);

export default FillUpBtn;
