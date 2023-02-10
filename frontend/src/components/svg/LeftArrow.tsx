import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../styles/Styles';

const StyledLink = styled(Link)`
  cursor: pointer;
  display: flex;
  font-size: 13px;
  font-family: 'Roboto';
  color: #7f8282;
  :hover {
    text-decoration: none;
    svg {
      path {
        fill: ${({ theme }) => theme.colors.quinary} !important;
      }
    }
  }
`;

const LeftArrow = ({ text, url, text2, url2 }: any) => {
  return (
    <div className='d-flex'>
      <StyledLink
        to={{
          pathname: url,
          state: {
            scrollTo: url === '/available' ? 'dachshunds' : '',
            backTo:
              text === 'Back To Ecard Orders'
                ? 'ecards'
                : text === 'Back To Orders' && 'products',
          },
        }}
      >
        <svg
          width='20px'
          height='20px'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
          className='d-flex'
        >
          <g id='layer1'>
            <path
              fill='#7f8282'
              d='M 2.5 8 L 0 10.5 L 2.5 13 L 4 13 L 2 11 L 19 11 L 19 10 L 2 10 L 4 8 L 2.5 8 z '
            />
          </g>
        </svg>
        <Text marginLeft='10px'>{text}</Text>{' '}
      </StyledLink>
      {text2 && (
        <Text marginLeft='3px' marginRight='3px'>
          /
        </Text>
      )}
      {text2 && (
        <StyledLink to={url2}>
          <Text>{text2}</Text>
        </StyledLink>
      )}
    </div>
  );
};

export default LeftArrow;
