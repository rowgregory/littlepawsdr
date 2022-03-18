import React from 'react';
import styled from 'styled-components';
import { Text } from '../components/styles/Styles';

const Strength = styled.div`
  display: flex;
  height: 20px;
  width: 100%;

  .bar {
    margin-right: 5px;
    height: 100%;
    width: 25%;
    transition: box-shadow 500ms;
    box-shadow: ${({ theme }) => `inset 0px 20px ${theme.card.bg}`};
  }
  .bar-show {
    box-shadow: none;
  }
  .bar-1 {
    background: linear-gradient(to right, red, orangered);
  }
  .bar-2 {
    background: linear-gradient(to right, orangered, yellow);
  }
  .bar-3 {
    background: linear-gradient(to right, yellow, yellowgreen);
  }
  .bar-4 {
    background: linear-gradient(to right, yellowgreen, green);
  }
  .bar:last-child {
    margin-right: 0;
  }
`;

const PasswordMeter = ({ validations, strength }: any) => {
  return (
    <>
      <Strength>
        <span
          className={strength > 0 ? 'bar bar-1 bar-show' : 'bar bar-1 bar'}
        ></span>
        <span
          className={strength > 1 ? 'bar bar-2 bar-show' : 'bar bar-2 bar'}
        ></span>
        <span
          className={strength > 2 ? 'bar bar-3 bar-show' : 'bar bar-3 bar'}
        ></span>
        <span
          className={strength > 3 ? 'bar bar-4 bar-show' : 'bar bar-4 bar'}
        ></span>
      </Strength>
      <div className='my-3'>
        <Text>
          {validations[0] ? (
            <i className='fas fa-check' style={{ color: 'green' }}></i>
          ) : (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
          )}
          &nbsp; must be at least 5 characters
        </Text>
        <Text>
          {' '}
          {validations[1] ? (
            <i className='fas fa-check' style={{ color: 'green' }}></i>
          ) : (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
          )}
          &nbsp; must contain a capital letter
        </Text>
        <Text>
          {' '}
          {validations[2] ? (
            <i className='fas fa-check' style={{ color: 'green' }}></i>
          ) : (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
          )}
          &nbsp; must contain a number
        </Text>
        <Text>
          {' '}
          {validations[3] ? (
            <i className='fas fa-check' style={{ color: 'green' }}></i>
          ) : (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
          )}
          &nbsp; must contain one of $&+,:;=?@#
        </Text>
      </div>
    </>
  );
};

export default PasswordMeter;
